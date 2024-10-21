import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.cwd(), 'source', 'evnHandler', '${process.env.ENV}.env') });

export const BASE_ENVIRONMENT = {
    ApplicationURL: process.env.URL as string
};
