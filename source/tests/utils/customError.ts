import { ICustomError } from "../types/types";


export class CustomError extends Error {
    errorData: ICustomError;

    constructor(errorData: ICustomError) {
        super(`Error making request to: ${errorData.endPoint}`);
        this.errorData = errorData;
        Object.setPrototypeOf(this, CustomError.prototype); // <- important when extending built-ins
    }

    private async printError(): Promise<void> {
        console.error('🚨 Request failed 🚨');
        console.error('Status Code:', this.errorData.statusCode);
        console.error('Endpoint:', this.errorData.endPoint);
        console.error('Payload:', JSON.stringify(this.errorData.payload, null, 2));

        if (this.errorData.response && typeof this.errorData.response === 'object') {
            try {
                const jsonResponse = await this.errorData.response.json();
                console.error('Response:', JSON.stringify(jsonResponse, null, 2));
            } catch {
                const textResponse = await this.errorData.response.text();
                console.error('Response:', textResponse);
            }
        } else {
            console.error('Response:', this.errorData.response);
        }
    }

    static async create(errorData: ICustomError): Promise<CustomError> {
        const error = new CustomError(errorData);
        await error.printError();
        return error;
    }
}
