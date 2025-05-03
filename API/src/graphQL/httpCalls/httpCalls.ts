import supertest from 'supertest';
import { envConfig } from '../env/manager';
import { print, ASTNode } from 'graphql';

export const sendCompositeRequest = async (token: string, payload: object | string) => {
    try {
        const request = supertest(envConfig.COMPOSITE_URL);
        const response = await request.put('/rest/save')
            .auth(token, { type: 'bearer' })
            .send(payload)
            .disableTLSCerts();
        return response;
    } catch (error) {
        console.error('Error occurred while sending composite request request');
        throw error;
    }
};

export const makeTokenGETCall = async (baseurl: string, service: string, headers: Record<string, string>, queryParams?: object) => {
    try {
        const request = supertest(baseurl);
        const response = await request
            .get(service)
            .set(headers ? headers : {})
            .query(queryParams ? queryParams : {})
            .disableTLSCerts();
        return response;
    } catch (error) {
        console.error('Error occurred while sending token request');
        throw error;
    }
};

export const makePOSTFormCall = async (baseurl: string, endpoint: string, payload: object) => {
    try {
        const request = supertest(baseurl);
        return await request.post(endpoint).type('form').send(payload).disableTLSCerts();
    } catch (error) {
        console.error('Error occurred while sending token form post call');
        throw error;
    }
};

export const sendGraphQLQuery = async (token: string, graphqlQuery: ASTNode, variable?: object) => {
    try {
        const request = supertest(envConfig.BASE_URI);
        const response = await request
            .post('/graphql')
            .auth(token, { type: 'bearer' })
            .send({ query: print(graphqlQuery), variables: variable })
            .disableTLSCerts();
        return response;
    } catch (error) {
        console.error(`Error occurred while sending GraphQL query: ${graphqlQuery}`);
        throw error;
    }
};