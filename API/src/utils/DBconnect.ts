import { TestUsers } from "config/users";
import oracledb from 'oracledb';
import { join } from 'path';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

if (process.platform == 'linux') {
    oracledb.initOracleClient({ libDir: join(process.cwd(), 'instantclient_19_6') });
}
else {
    oracledb.initOracleClient({ libDir: join(process.cwd(), 'instantclient_19_8') });
}

const mypw = TestUsers.DB_PASSWORD;  // set mypw to the hr schema password add your password on your local
const dbConnectionID = TestUsers.DB_CONNECTION;
export const DBconnection = async (query: string) => {

    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "LSMCO_USER",
            password: mypw,
            connectString: dbConnectionID
        });

        const result = await connection.execute(
            query,
        );
        return result.rows;

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}