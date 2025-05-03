/* eslint-disable @typescript-eslint/no-explicit-any */
class helperUtils {

    findMatchResponses = (mountebankResponseBody: any, traceId: string) => {
        const listOfExtractedRequests = [];
        const listOfMatchedResponses = [];
        let spanId: string;

        for (let i = 0; i < mountebankResponseBody.body.requests.length; i++) {
            const isRequestMatched = this.findObjectByTraceId(mountebankResponseBody.body.requests[i], traceId);
            if (isRequestMatched)
                listOfExtractedRequests.push(mountebankResponseBody.body.requests[i]);
        }

        for (let i = 0; i < listOfExtractedRequests.length; i++) {

            spanId = listOfExtractedRequests[i].headers['X-B3-Spanid'];
            const matchedStubsResponse = this.findObjectBySpanId(mountebankResponseBody.body.stubs, spanId);
            listOfMatchedResponses.push(matchedStubsResponse);
        }

        return listOfMatchedResponses;
    };


    private findObjectBySpanId(stubResponse: any, spanId: string): any {
        if (typeof stubResponse === 'object' && stubResponse !== null) {
            if (Object.prototype.hasOwnProperty.call(stubResponse, 'request')
                && Object.prototype.hasOwnProperty.call(stubResponse.request, 'headers')
                && Object.prototype.hasOwnProperty.call(stubResponse.request.headers, 'X-B3-Spanid')
                && stubResponse.request.headers['X-B3-Spanid'] === spanId
            ) {
                return stubResponse;
            }

            for (const key in stubResponse) {
                const result = this.findObjectBySpanId(stubResponse[key], spanId);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    }


    private findObjectByTraceId(requests: any, traceId: string): any {
        if (typeof requests === 'object' && requests !== null) {
            if (Object.prototype.hasOwnProperty.call(requests, 'headers')
                && Object.prototype.hasOwnProperty.call(requests.headers, 'X-B3-Traceid')
                && requests.headers['X-B3-Traceid'] === traceId
            ) {
                return requests;
            }
            for (const key in requests) {
                const result = this.findObjectByTraceId(requests[key], traceId);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    }

    generateRandom32BitTraceId = () => {

        const hexChars = '0123456789abcdef';

        let traceId = '';

        for (let i = 0; i < 32; i++) {

            const randomIndex = Math.floor(Math.random() * 16);

            traceId += hexChars.charAt(randomIndex);

        }

        return traceId;

    };

    waitForResponse = async (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms * 1000));
    };

    generatePartitionNumber = () => {
        return Math.floor(Math.random() * 5) + 1;
    };
}

export default new helperUtils();