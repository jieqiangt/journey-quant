import { connectDb, executeQuery, readSQLScript } from "./dbUtils.js";
import fs from "fs";
const main = async () => {
    const conn = await connectDb();
    const filePath = "./sql/db_initialization/";
    const fileNames = fs.readdirSync(filePath);
    for (let file of fileNames) {
        try {
            const query = readSQLScript(`${filePath}/${file}`);
            await executeQuery(conn, query);
            console.log(`${filePath}/${file} ran without errors!`);
        }
        catch (err) {
            console.log(`Error in : ${file}`);
            console.log(err);
        }
    }
};
main();
