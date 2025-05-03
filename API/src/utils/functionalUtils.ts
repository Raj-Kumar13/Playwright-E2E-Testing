import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';

export const verifyUDFfields = (actualData: any, expectedtData: any) => {
    let count = 0

    for (let i = 0; i < expectedtData.length; i++) {
        for (let j = 0; j < actualData.length; j++) {
            if (actualData[j].fieldResourceKey == expectedtData[i].key) {
                // console.log('exp ' + expectedtData[i].key + ' ACT ' + actualData[j].fieldResourceKey);
                if (expectedtData[i].hasOwnProperty("value")) {
                    if (actualData[j].fieldDataTyp == "Boolean") {
                        if (expectedtData[i].value == true) {
                            expect(actualData[j].fieldValue).eq("1")
                            count += 1;
                            break;
                        }
                        else {
                            expect(actualData[j].fieldValue).eq("0")
                            count += 1;
                            break;
                        }
                    }
                    else {
                        expect(actualData[j].fieldValue).eq(expectedtData[i].value)
                        count += 1;
                        break;
                    }
                }
                else {
                    expect(actualData[j].fieldValue).eq(null)
                    count += 1;
                    break;
                }

            }
        }
    }
    expect(count).eq(actualData.length)
}

export const removeAttribute = (data: any, attribute1: any, attribute2?: any, attribute3?: any) => {

    let newId1 = uuidv4();

    let testdata = JSON.parse(JSON.stringify(data));
    testdata.requestId = newId1;

    if (attribute2 == null) {
        delete testdata[attribute1];
    }
    else if (attribute3 == null) {
        delete testdata[attribute1][0][attribute2];
    }
    else {
        delete testdata[attribute1][0][attribute2][0][attribute3];
    }
    return testdata;
}

export const addObjectToArray = (attribute1: any, attribute2: any) => {

    let testdata = JSON.parse(JSON.stringify(attribute1));
    let testdata1 = JSON.parse(JSON.stringify(attribute2));

    testdata.push(testdata1);

    return testdata;
}

export const getResponseBodyCreation = (actual: any, expected: any) => {

    let actual_response = JSON.parse(JSON.stringify(actual));
    let expected_response = JSON.parse(JSON.stringify(expected));

    expected_response.id = actual_response.id;
    expected_response.key = actual_response.key;

    if (expected_response.refs[0].source == "CLT") {
        expected_response.refs[0].value = actual_response.refs[0].value;
    }
    else {
        for (let i = 0; i < expected_response.refs.length; i++) {
            for (let j = 0; j < actual_response.refs.length; j++) {
                if (expected_response.refs[i].source == actual_response.refs[j].source) {
                    expected_response.refs[i].value = actual_response.refs[j].value;
                    break;
                }
            }
        }
        for (let i = 0; i < expected_response.refs.length; i++) {
            for (let j = 0; j < actual_response.refs.length; j++) {
                if ((expected_response.refs[i].source == actual_response.refs[j].source) && (i != j)) {
                    let x = expected_response.refs[i]
                    expected_response.refs[i] = expected_response.refs[j];
                    expected_response.refs[j] = x;
                    break;
                }
            }
        }
    }
    expected_response.creationTimestamp = actual_response.creationTimestamp;
    expected_response.lastUpdateTimestamp = actual_response.lastUpdateTimestamp;
    expected_response.lastUpdateByUser = actual_response.lastUpdateByUser;
    expected_response.digest = actual_response.digest;

    return expected_response;
}

export const globalReplace = (regExpressionFormat: string) => {
    return new RegExp(regExpressionFormat, 'g')
}

export const getLinkResponseBodyPreparation = (actual: any, expected: any) => {

    let actualResponse = JSON.parse(JSON.stringify(actual));
    let expectedResponse = JSON.parse(JSON.stringify(expected));

    for (let entity in expectedResponse) {

        if (!(Array.isArray(expectedResponse[entity]))) {
            console.log('legalE-1 ------------>')
            entityBodyPreparation(actualResponse, expectedResponse, entity)
        }
        else {
            const entityKeys = ['id', 'key', 'creationTimestamp', 'lastUpdateTimestamp', 'lastUpdateByUser', 'digest'];

            expectedResponse[entity].forEach((expectedRespEntity: any, index: number) => {
                if (typeof (expectedRespEntity) == 'object') {
                    entityKeys.forEach((entityKey) => {
                        expectedRespEntity[entityKey] = actualResponse[entity][index][entityKey];
                    })
                }

                let linkedEntity = Object.keys(expectedResponse[entity][index])[Object.keys(expectedResponse[entity][index]).length - 2]
                console.log('linkedEntity-1 ------------>' + linkedEntity)
                entityBodyPreparation(actualResponse[entity][index], expectedResponse[entity][index], linkedEntity);
            })
        }
    }

    return expectedResponse;
}

function entityBodyPreparation(actualResponse: any, expectedResponse: any, entity: any) {
    console.log('inside entityBody Prep ------------>' + JSON.stringify(actualResponse))
    console.log('inside entityBody Prep ------------>' + JSON.stringify(expectedResponse))
    expectedResponse[entity].id = actualResponse[entity].id;
    expectedResponse[entity].key = actualResponse[entity].key;

    if (expectedResponse[entity].refs[0].source == "CLT") {
        expectedResponse[entity].refs[0].value = actualResponse[entity].refs[0].value;
    }
    else {
        expectedResponse[entity].refs.forEach((expectedRespRef: { source: any, value: string; }) => {

            actualResponse[entity].refs.forEach((actualRespRef: { source: any, value: string; }) => {
                console.log('inside else Prep exp ------------>' + JSON.stringify(expectedRespRef))
                console.log('inside else Prep act------------>' + JSON.stringify(actualRespRef))
                if (expectedRespRef.source == actualRespRef.source)
                    Object.assign(expectedRespRef, actualRespRef);
            });
        });

        for (let i = 0; i < expectedResponse[entity].refs.length; i++) {
            for (let j = 0; j < actualResponse[entity].refs.length; j++) {
                if ((expectedResponse[entity].refs[i].source == actualResponse[entity].refs[j].source) && (i != j)) {
                    let x = expectedResponse[entity].refs[i]
                    expectedResponse[entity].refs[i] = expectedResponse[entity].refs[j];
                    expectedResponse[entity].refs[j] = x;
                    break;
                }
            }
        }
    }

    const coreEntityDynamicKeys = ['creationTimestamp', 'lastUpdateTimestamp', 'lastUpdateByUser', 'digest'];

    coreEntityDynamicKeys.forEach((dynamicEntity: string) => {
        expectedResponse[entity][dynamicEntity] = actualResponse[entity][dynamicEntity];
    });
    console.log('final payload ------------>')
    console.log(JSON.stringify(expectedResponse, null, 4))
    return expectedResponse;
}

export const waitForResponse = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

export const getSubEntityResponseBodyCreation = (actual: any, expected: any, ownerEntityFields: string[]) => {

    let actual_response = JSON.parse(JSON.stringify(actual));
    let expected_response = JSON.parse(JSON.stringify(expected));

    for (let i = 0; i < expected_response.length; i++) {

        expected_response[i].id = actual_response[i].id;
        expected_response[i].key = actual_response[i].key;
        expected_response[i].creationTimestamp = actual_response[i].creationTimestamp;
        expected_response[i].lastUpdateTimestamp = actual_response[i].lastUpdateTimestamp;
        expected_response[i].lastUpdateByUser = actual_response[i].lastUpdateByUser;
        expected_response[i].digest = actual_response[i].digest;

        for (let keys = 0; keys < ownerEntityFields.length; keys++) {

            if ((expected_response[i].hasOwnProperty(ownerEntityFields[keys]))) {
                expected_response[i][ownerEntityFields[keys]] = actual_response[i][ownerEntityFields[keys]]

            }
        }
    }
    return expected_response;
}

export const dataBaseUserDefinedFieldsVerification = (actualData: any, expectedData: any) => {

    for (let i = 0; i < (JSON.parse(actualData)).userDefinedFields.length; i++) {

        expect((JSON.parse(actualData)).userDefinedFields[i].fieldValue)
            .eq(!(expectedData.userDefinedFields[i]).hasOwnProperty("value")
                ? null
                : expectedData.userDefinedFields[i].value === "true"
                    ? '1'
                    : expectedData.userDefinedFields[i].value === "false"
                        ? '0'
                        : expectedData.userDefinedFields[i].value

            )
    }
}