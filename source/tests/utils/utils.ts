import { resolve } from "path";

class HelperUtils {
    //mountebankRequests: IMBRequest[], searchItemKey: string, searchItemValue: string | number
    findMatchRequest = (mountebankRequests: any, searchItemKey: string, searchItemValue: string | number) => {
        let value = null;
        for (const request of mountebankRequests) {
            const requestOfInterest = this.isRequestMatchFound(JSON.parse(request.body), searchItemKey, searchItemValue);
            if (requestOfInterest) {
                value = request;
                break;
            }
        }
        if (!value) throw new Error(`Matching Request for the ${searchItemKey}: ${searchItemValue} not found in mountebank`);
        return value;
    };


    //payload: ICreateCapSecurityRequest | IUpdateCapSecurityRequest, searchItemKey: string, searchItemValue: string | number
    private isRequestMatchFound(payload: any, searchItemKey: string, searchItemValue: string | number) {
        if (typeof payload !== 'object' || payload === null) return null;

        if (Array.isArray(payload)) {
            for (const element of payload) {
                const result = this.isRequestMatchFound(element, searchItemKey, searchItemValue);
                if (result) return true;
            }
        }
        else {
            if (payload[searchItemKey] === searchItemValue) {
                return true;
            }
            for (const key of Object.keys(payload)) {
                if (Object.prototype.hasOwnProperty.call(payload, key)) {
                    const result = this.isRequestMatchFound(payload[key], searchItemKey, searchItemValue);
                    if (result) return true;
                }
            }
        }
        return false;
    }

    findMatchResponseBySpanId(stubResponse: any, spanId: string): any {
        if (typeof stubResponse === 'object' && stubResponse !== null) {
            if (Object.prototype.hasOwnProperty.call(stubResponse, 'request')
                && Object.prototype.hasOwnProperty.call(stubResponse.request, 'headers')
                && Object.prototype.hasOwnProperty.call(stubResponse.request.headers, 'X-B3-Spanid')
                && stubResponse.request.headers['X-B3-Spanid'] === spanId
            ) {
                return stubResponse;
            }

            for (const key in stubResponse) {
                const result = this.findMatchResponseBySpanId(stubResponse[key], spanId);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    }

    waitForResponse = async (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms * 1000));
    }

    private getRandomDate(start: Date, end: Date): string {
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const year = randomDate.getFullYear();
        const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
        const day = randomDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    dateGenerator(dateType:
        'Today' |
        'Past' |
        'Future' |
        'AfterOneYear' |
        'Yesterday' |
        'Tomorrow' |
        'AfterTwoDays' |
        'AfterThirtyYears'
    ): string {

        const today = new Date();
        const oneDayInMilliSeconds = 24 * 60 * 60 * 1000;

        switch (dateType) {
            case 'Today': { return this.getRandomDate(today, today) }
            case 'Past': {
                const pastStart = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
                return this.getRandomDate(pastStart, today);
            }
            case 'Future': {
                const futureEnd = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
                return this.getRandomDate(today, futureEnd);
            }
            case 'AfterOneYear': {
                const oneYearStart = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
                const oneYearEnd = new Date(today.getFullYear() + 1, 11, 31);
                return this.getRandomDate(oneYearStart, oneYearEnd);
            }
            case 'Yesterday': {
                const yesterday = new Date(today.getTime() - oneDayInMilliSeconds);
                return this.getRandomDate(yesterday, yesterday);
            }
            case 'Tomorrow': {
                const tomorrow = new Date(today.getTime() + oneDayInMilliSeconds);
                return this.getRandomDate(tomorrow, tomorrow);
            }
            case 'AfterTwoDays': {
                const afterTwoDays = new Date(today.getTime() + 2 * oneDayInMilliSeconds);
                const afterTwoDaysEnd = new Date(today.getTime() + 3 * oneDayInMilliSeconds);
                return this.getRandomDate(afterTwoDays, afterTwoDaysEnd);
            }
            case 'AfterThirtyYears': {
                const thirtyYearsStart = new Date(today.getFullYear() + 30, 0, 1);
                const thirtyYearsEnd = new Date(today.getFullYear() + 30, 11, 31);
                return this.getRandomDate(thirtyYearsStart, thirtyYearsEnd);
            }
            default: throw new Error('Invalid dateType provided');
        }
    }

    private generateRandom = (characters: string, num: number) => {
        const characterLength = characters.length;
        let randomString = '';
        for (let i = 0; i < num; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characterLength));
        }
        return randomString;
    }
    generateRandomNumericData = (num: number) => {
        const character = '1234567890';
        return this.generateRandom(character, num);
    }
    generateRandomAlphaNumericData = (num: number) => {
        const character = '1234567890abcdefghijklmnopqrstuvwxyz';
        return this.generateRandom(character, num);
    }
};
