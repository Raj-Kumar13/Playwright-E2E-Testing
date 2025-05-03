import { endpoint } from 'enums/endpoint';
import { URIs } from "environments/manager";
import supertest from 'supertest';
import { getEntities } from 'types/types';

export const makePUTCall = async (endpoint: endpoint, token: string, payload: object | string, headers?: object) => {

    const request = supertest(URIs.BASEURL)
    const response = await request.put(endpoint)
        .set(headers ? headers : {})
        .set('Authorization', token)
        .send(payload)
        .disableTLSCerts();
    console.log('Response:' + JSON.stringify(response.body));
    return response;
}

export const makeGETcall = async (endpoint: endpoint | string, entity: getEntities, value: String | Number, token: string, entitiesEndPath?: {
    linkEntity?: getEntities, subEntity?: getEntities
}, queryParams?: {}, headers?: object) => {
    let URI;

    if (entitiesEndPath?.hasOwnProperty('linkEntity'))
        URI = (endpoint + entity + value + '/links' + entitiesEndPath.linkEntity)
    else if (entitiesEndPath?.hasOwnProperty('subEntity'))
        URI = (endpoint + entity + value + entitiesEndPath.subEntity)
    else
        URI = (endpoint + entity + value)

    const request = supertest(URIs.BASEURL)
    const response = await request.get(URI)
        .set(headers ? headers : {})
        .set('Authorization', token)
        .query(queryParams ? queryParams : {})
        .disableTLSCerts();
    console.log('Response:' + JSON.stringify(response.body));
    return response;
}

export const makeGETall = async (baseURI: string, endpoint: endpoint | string, token: string, headers?: object, queryParams?: {}) => {
    const request = supertest(baseURI)
    const response = await request.get(endpoint)
        .set(headers ? headers : {})
        .set('Authorization', token)
        .query(queryParams ? queryParams : {})
        .disableTLSCerts();
    console.log('Response:' + JSON.stringify(response.body));
    return response;
}

export const makeTokenGETCall = async (baseurl: string, endpoint: endpoint | string, headers: object, queryParams?: {}) => {
    const request = supertest(baseurl);
    const response = await request
        .get(endpoint)
        .set(headers ? headers : {})
        .query(queryParams ? queryParams : {})
        .disableTLSCerts();
    return response;
}

export const makePOSTFormCall = async (baseurl: string, endpoint: endpoint | string, payload: {}) => {
    const request = supertest(baseurl);
    return request.post(endpoint).type('form').send(payload).disableTLSCerts();
}

export const getSplunkSearchResult = async (baseurl: string, namespace: string, podname: string, uuid: string, errorcode: ErrorCode) => {
    const request = supertest(baseurl);

    const payload = {
        search: `search index=au_k8s_bobl_app openshift_namespace="${namespace}" openshift_pod_name="${podname}" sourcetype="openshift_logs"  "${uuid}" "${errorcode}"`,
        search_mode: 'normal',
        indexedRealtimeOffset: '100',
        earliest_time: '-2h',
        output_mode: 'json'
    };

    const response = await request.post('/servicesNS/nobody/search/search/v2/jobs/export')
        .auth(process.env.username as string, process.env.password as string, { type: 'basic' })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(payload)
        .disableTLSCerts();

    expect(response.status).to.equal(200);
    if (!(response.body.result)) throw new Error(`Error code :: ${errorcode} with UUID :: ${uuid} No record match found at splunk ..!!`);

    return response;
};