import { APIRequest, APIResponse } from "@playwright/test";

export type RequestType = 'CREATE' | 'UPDATE' | 'DELETE';
interface ConfigBase {
    token: string;
    expectedCountOfRequest?: number;
    reportingCOde?: String;
    entities?: string;
}

interface ICreateConfig extends ConfigBase {
    typeOfRequestFormation?: 'CREATE'
}

interface IUpdateConfig extends ConfigBase {
    typeOfRequestFormation?: 'UPDATE';
    accountNumber: String
}

interface IDeleteConfig extends ConfigBase {
    typeOfRequestFormation?: 'DELETE';
    accountNumber: String
}

export type ConfigType<T extends RequestType | undefined> =
    T extends 'UPDATE' ? IUpdateConfig :
    T extends 'CREATE' ? ICreateConfig :
    T extends 'DELETE' ? IDeleteConfig :
    never;

export interface ICustomError {
    statusCode: number;
    payload: object | string;
    response: APIResponse;
    endPoint: string;
}    