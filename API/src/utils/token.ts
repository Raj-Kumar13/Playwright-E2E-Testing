import { TestUsers } from "config/users";
import { endpoint } from "enums/endpoint";
import { URIs } from "environments/manager";
import { makePOSTFormCall, makeTokenGETCall } from "./apicalls";

const fetchCookieFromResponse = (response: any) => {
    let cookie1 = response.headers['set-cookie'] + '';
    let parts = cookie1.split(";Path=");
    let actualCookie1 = parts[0];
    parts = actualCookie1.split("PF=");
    return 'PF=' + parts[1];
}

const extractDataFromLocation = (response: any, splitString: string) => {
    let authUrl = response.headers['location'] + '';
    let parts = authUrl.split(splitString);
    return parts[1];
}

export const tokenGenerate = async () => {
    let IDENTITY_FED_URL = URIs.IDENTITY_FED_URL;
    let AUTHORIZATION_SERVICE = endpoint.authorizationOauth;

    let REDIRECT_URI = URIs.REDIRECT_URI;
    let TOKEN_SERVICE = endpoint.tokenOauth;

    let USERNAME = TestUsers.FULLROLE_USER;
    let PASSWORD = TestUsers.PASSWORD;

    let GET_QUERY_OBJECT = { redirect_uri: REDIRECT_URI, response_type: 'code', client_id: 'Collate', scope: 'openid' }

    const response1 = await makeTokenGETCall(IDENTITY_FED_URL, AUTHORIZATION_SERVICE, { connection: "Keep-Alive" }, GET_QUERY_OBJECT)

    let authUrlservice = extractDataFromLocation(response1, IDENTITY_FED_URL);
    let actualCookie1 = fetchCookieFromResponse(response1);

    //second request
    const response2 = await makeTokenGETCall(IDENTITY_FED_URL, authUrlservice, { connection: "Keep-Alive", "Cookie": actualCookie1 });

    let COOKIE_HEADERS = { connection: "Keep-Alive", "Cookie": fetchCookieFromResponse(response2) };
    let UI_QUERY_OBJECT = { 'pf.username': USERNAME, 'pf.pass': PASSWORD, 'pf.ok': 'clicked', 'pf.adapterId': 'HTMLFormADGroupPDProfile' }

    //request (providing username and password via api call)
    await makeTokenGETCall(IDENTITY_FED_URL, authUrlservice, COOKIE_HEADERS, UI_QUERY_OBJECT);
    const response3 = await makeTokenGETCall(IDENTITY_FED_URL, authUrlservice, COOKIE_HEADERS, UI_QUERY_OBJECT);

    let codeValue = extractDataFromLocation(response3, "?code=");

    let FINAL_CALL_PAYLOAD = {
        grant_type: "authorization_code",
        code: codeValue,
        redirect_uri: REDIRECT_URI,
        client_id: TestUsers.CLIENT_ID,
        client_secret: TestUsers.CLIENT_SECRET
    }

    const response = await makePOSTFormCall(IDENTITY_FED_URL, TOKEN_SERVICE, FINAL_CALL_PAYLOAD)
    return "Bearer " + response.body.access_token;
}