import { request } from '@playwright/test';
import { ENV_MANAGER } from '../../envHandler/manager';
import { CustomError } from './customError';
//import { ENV_MANAGER } from '@env/manager';
//import { endpoints } from '@APIHelper/endpoints';
//import { CustomError } from './customError';

export const getHttpTokenCall = async (url: string, queryParams?: Record<string, string> | null, header?: Record<string, string> | null) => {
    const apiContext = await request.newContext();
    const response = await apiContext.get(url, {
        ignoreHTTPSErrors: true,
        headers: header ? header : {},
        params: queryParams ? queryParams : {}
    });
    return response;
};

export const getHttpCall = async (token: string, endpoint: string) => {
    const apiContext = await request.newContext();
    const response = await apiContext.get(ENV_MANAGER.API.APP_URL.concat(endpoint), {
        ignoreHTTPSErrors: true,
        headers: { Authorization: token }
    });
    return response;
};

export const putHttpCall = async (token: string, payload: object | string) => {
    try {
        const serviceUrl = ENV_MANAGER.API.APP_URL.concat(endpoints.CompositeAPI);
        const apiContext = await request.newContext();
        const response = await apiContext.put(serviceUrl, {
            ignoreHTTPSErrors: true,
            headers: { Authorization: token },
            data: payload
        });
        if (response.status() !== 200) {
            throw await CustomError.create({
                statusCode: response.status(),
                payload: payload,
                response: response,
                endPoint: serviceUrl
            });
        }
        return response;
    }
    catch (error) {
        console.error(error);
    }
};

export const graphQLQueryCall = async (token: string, queryObject: object | string) => {
    const apiContext = await request.newContext();
    const response = await apiContext.post(ENV_MANAGER.API.GRAPHQL_APP_URL.concat(endpoints.graphQL), {
        ignoreHTTPSErrors: true,
        headers: {
            Authorization: token
        },
        data: {
            query: queryObject
        }

    });
    return response;
};

export const postHttpFormCall = async (url: string, payload: Record<string, string>) => {
    const apiContext = await request.newContext();
    const response = await apiContext.post(url, { ignoreHTTPSErrors: true, form: payload });
    return response;
};

export const patchHttpCall = async (token: string, payload: object | string) => {
    try {
        const serviceUrl = ENV_MANAGER.API.APP_URL.concat(endpoints.CompositeAPI);
        const apiContext = await request.newContext();
        const response = await apiContext.patch(serviceUrl, {
            ignoreHTTPSErrors: true,
            headers: { Authorization: token },
            data: payload
        });
        if (response.status() !== 200) {
            throw await CustomError.create({
                statusCode: response.status(),
                payload: payload,
                response: response,
                endPoint: serviceUrl
            });
        }
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const deleteMountebankSavedRequests = async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.delete(ENV_MANAGER.MOCK.MOUNTEBANK_URL.concat(endpoints.mounteBankSavedRequests), {
        ignoreHTTPSErrors: true
    });
    return response;
};

export const getImposter = async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get(ENV_MANAGER.MOCK.MOUNTEBANK_URL, {
        ignoreHTTPSErrors: true
    });
    return response;
};