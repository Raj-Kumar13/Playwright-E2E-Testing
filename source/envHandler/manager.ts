import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.cwd(), '.env') });

export const LOCAL_ENV = {
    UI: {
        USERNAME: process.env.FULL_ROLE_USER as string,
        PASSWORD: process.env.FULL_ROLE_PASSWORD as string,
        CONFIGURABLE_USER: process.env.CONFIGURABLE_USER_UI as string,
        CONFIGURABLE_PASSWORD: process.env.CONFIGURABLE_PASSWORD_UI as string
    },
    API: {
        USERNAME: process.env.API_ROLE_USER as string,
        PASSWORD: process.env.API_ROLE_PASSWORD as string,
        CONFIGURABLE_USER: process.env.CONFIGURABLE_USER_API as string,
        CONFIGURABLE_PASSWORD: process.env.CONFIGURABLE_PASSWORD_API as string
    },
    CLIENT_ID: process.env.CLIENT_ID as string,
    CLIENT_SECRETE: process.env.CLIENT_SECRETE as string,
}
config({ path: join(process.cwd(), 'source', 'envHandler', `${process.env.Environment}.env`) });

export const ENV_MANAGER = {
    UI: {
        APP_URL: process.env.WEB_BASE_URL as string,
    },
    API: {
        APP_URL: process.env.API_BASE_URI as string,
        GRAPHQL_APP_URL: process.env.API_GRAPHQL_URI as string,
        IDENTITY_FED_URL: process.env.IDENTITY_FED_URL as string,
        REDIRECT_URI: process.env.REDIRECT_URI as string,
        ACCESS_TOKEN_URL: process.env.ACCESS_TOKEN_URL as string,
    },
    MOCK: {
        MOUNTEBANK_URL: process.env.MOUNTEBANK_URL as string,
    }
}

// const environmentFilePath = join(process.cwd(), 'source', 'envHandler', `${process.env.Environment}.env`);
// config({ path: environmentFilePath });
// export const BASE_ENVIRONMENT = {
//     ApplicationURL: process.env.URL as string
// };


