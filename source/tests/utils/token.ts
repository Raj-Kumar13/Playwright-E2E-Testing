import { APIResponse, expect } from "@playwright/test";
import { ENV_MANAGER, LOCAL_ENV } from "../../envHandler/manager";
import { getHttpTokenCall, postHttpFormCall } from "./httpCalls";

const fetchCookieFromResponse = (response: APIResponse) => {
    const headers = response.headers();
    if (!headers['set-cookie']) throw new Error('No set-cookie header in api token response');

    const pfCookie = headers['set-cookie'].match(/PF=[^;]*/) as string[];
    if (!pfCookie[0].startsWith('PF=')) throw new Error('No PF cookie found in set-cookie header of api token');
    return pfCookie[0];
};

const extractUrlData = (response: APIResponse, splitString: string): string => {
    const url = response.url();
    if (!url) {
        throw new Error('No location URL in API token response');
    }

    const parts = url.split(splitString);
    if (parts.length < 2) {
        throw new Error(`API URL location does not contain '${splitString}'`);
    }

    return parts[1];
};

export const tokenGenerate = async (username: string, password: string) => {
    const REDIRECT_URI = ENV_MANAGER.API.REDIRECT_URI;
    const oauthQueryParameters = {
        response_type: 'code',
        client_id: LOCAL_ENV.CLIENT_ID,
        scope: 'openid',
        redirect_uri: REDIRECT_URI
    };

    const responseFromInitialCall = await getHttpTokenCall(ENV_MANAGER.API.IDENTITY_FED_URL, oauthQueryParameters);
    const cookieFromInitialCall = fetchCookieFromResponse(responseFromInitialCall);

    const responseFromIntermediateCall = await getHttpTokenCall(responseFromInitialCall.url(), null, { 'Cookie': cookieFromInitialCall });
    const cookieFromIntermediateCall = fetchCookieFromResponse(responseFromIntermediateCall);

    const responseFromFinalCall = await getHttpTokenCall(responseFromIntermediateCall.url(), null, { 'Cookie': cookieFromIntermediateCall });
    const cookieFromThirdCall = fetchCookieFromResponse(responseFromFinalCall);

    const pfUserObject = {
        'pf.username': username,
        'pf.pass': password,
        'pf.ok': 'clicked',
        'pf.adapterId': 'HTMLFormADGroupPDProfile'
    };

    const responseOfUserAuthForm = await getHttpTokenCall(responseFromFinalCall.url(), pfUserObject, { 'Cookie': cookieFromThirdCall });
    const codeValue = extractUrlData(responseOfUserAuthForm, '?code=');

    const FINAL_CALL_PAYLOAD = {
        grant_type: 'authorization_code',
        code: codeValue,
        redirect_uri: REDIRECT_URI,
        client_id: LOCAL_ENV.CLIENT_ID,
        client_secret: LOCAL_ENV.CLIENT_SECRETE
    };

    const response = await postHttpFormCall(ENV_MANAGER.API.ACCESS_TOKEN_URL, FINAL_CALL_PAYLOAD);
    expect(response.status()).toBe(200);
    return 'Bearer '.concat((await response.json()).access_token);
};