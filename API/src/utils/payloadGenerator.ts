import { entities } from 'types/types';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomData } from './generator';

export const createEntity = (entity: entities, data: any, field?: any) => {
    let newId1 = uuidv4();
    let newId2 = uuidv4();
    let newId3 = uuidv4();
    let testdata = JSON.parse(JSON.stringify(data));

    testdata.requestId = newId1;
    if (entity != 'valuations' && entity != 'addresses' && entity != 'folders' && entity != 'documents' && entity != 'notes' && entity != 'tasks') {
        testdata.accessControlGrants[0].ownerEntityId = newId2;
        testdata.accessControlGrants[0].id = newId3;
    }

    if (entity != 'accessControlGrants') {
        testdata['' + entity][0].id = newId2;
    }

    if (entity != 'accessControlGrants' && entity != 'valuations' && entity != 'addresses' && entity != 'folders' && entity != 'documents' && entity != 'tasks') {
        if (testdata['' + entity][0].refs) {
            for (let i = 0; i < (testdata['' + entity][0].refs).length; i++) {
                testdata['' + entity][0].refs[i].value = generateRandomData(7);
            }
            // testdata['' + entity][0].refs[0].value = generateRandomData(6);
        }

    }
    if (field) {
        for (let key in field) {
            testdata['' + entity][0]['' + key] = field[key];
        }
    }
    return testdata;
}

export const updateBodyCreationMultipleAttributes = (entity: entities, data: any, requestData?: any) => {

    let newId1 = uuidv4();
    let testdata = JSON.parse(JSON.stringify(data));

    testdata.requestId = newId1;
    if (testdata.hasOwnProperty('accessControlGrants')) {
        testdata.accessControlGrants[0].ownerEntityId = requestData.accessControlGrants[0].ownerEntityId;
    }
    testdata['' + entity][0].id = requestData['' + entity][0].id;
    if (testdata['' + entity][0]['refs']) {
        testdata['' + entity][0].refs[0].value = requestData['' + entity][0].refs[0].value;
    }
    return testdata;
}

export const updateBodyCreation = (entity: entities, data: any, field?: any) => {

    let newId1 = uuidv4();

    let testdata = JSON.parse(JSON.stringify(data));
    testdata.requestId = newId1;

    for (let key in field) {
        testdata['' + entity][0]['' + key] = field[key];
    }
    return testdata;
}

export const createLinksEntity = (entity: entities, data: any, entity1: String, ID1: String, entity2?: String, ID2?: String, field?: any) => {
    let newId1 = uuidv4();
    let newId2 = uuidv4();
    let testdata = JSON.parse(JSON.stringify(data));

    testdata.requestId = newId1;
    testdata['' + entity][0].id = newId2;
    testdata['' + entity][0]['' + entity1] = ID1;
    if (!((entity2 == null) || (entity2 == ''))) {
        testdata['' + entity][0]['' + entity2] = ID2;
    }
    if (field) {
        for (let key in field) {
            testdata['' + entity][0]['' + key] = field[key];
        }
    }
    return testdata;
}

export const updateLinksEntity = (entity: entities, data: any, field?: any) => {
    let newId1 = uuidv4();
    let testdata = JSON.parse(JSON.stringify(data));

    testdata.requestId = newId1;
    if (field) {
        for (let key in field) {
            testdata['' + entity][0]['' + key] = field[key];
        }
    }
    return testdata;
}


export const updateMultipleLinksEntity = (entity: entities, data: any, body: any, entity1: String, ID1: String, entity2: String, ID2: String, field?: any) => {
    let newId1 = uuidv4();
    let testdata = JSON.parse(JSON.stringify(data));
    let link = JSON.parse(JSON.stringify(body));

    testdata.requestId = newId1;
    testdata['' + entity] = link;
    testdata['' + entity][0]['' + entity1] = ID1;
    testdata['' + entity][1]['' + entity2] = ID2;
    testdata['' + entity][2]['' + entity1] = ID1;
    testdata['' + entity][2]['' + entity2] = ID2;
    if (field) {
        for (let key in field) {
            testdata['' + entity][0]['' + key] = field[key];
        }
    }
    return testdata;
}

export const responseBodyCreation = (response: any, data: any, requestID?: any, results?: any) => {

    let responseData = JSON.parse(JSON.stringify(data));

    if (requestID) {
        responseData.requestId = requestID;
    }
    responseData.responseId = response.responseId;
    if (results) {
        if (responseData.results[0].hasOwnProperty("id")) {
            responseData.results[0].id = results.id;
        }
        if (responseData.results[0].hasOwnProperty("key")) {
            responseData.results[0].key = results.key;
        }
    }

    return responseData;
}

export const responseBodyCreationWithRequestData = (response: any, data: any, requestID?: any, results?: any, requestBody?: any) => {

    let responseData = JSON.parse(JSON.stringify(data));

    if (requestID) {
        responseData.requestId = requestID;
    }
    responseData.responseId = response.responseId;
    if (results) {
        if (responseData.results[0].hasOwnProperty("id")) {
            responseData.results[0].id = results.id;
        }
        if (responseData.results[0].hasOwnProperty("key")) {
            responseData.results[0].key = results.key;
        }
    }
    if (responseData.results[0].hasOwnProperty("errorResourceBody")) {
        removeNullValuesFromObject(requestBody)
        responseData.results[0].errorResourceBody = requestBody;
    }

    return responseData;
}

export const removeNullValuesFromObject = (requestBody: any) => {
    for (const key in requestBody) {
        if (requestBody[key] === null) {
            delete requestBody[key];
        }
        else if (typeof requestBody[key] === 'object') {
            removeNullValuesFromObject(requestBody[key]);
        }
    }
}