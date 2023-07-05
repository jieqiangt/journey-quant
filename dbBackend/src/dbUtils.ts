import { connect, Config, Connection } from "@planetscale/database";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_CONFIG: Config = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
};

export const connectDb = async () => {
    const conn = await connect(DATABASE_CONFIG);
    return conn;
};

export const readSQLScript = (filePath: string) => {
    const query = fs.readFileSync(filePath).toString();
    const updatedQuery = query.replace(/(\r\n|\n|\r|\t)/gm, "");
    return updatedQuery;
};

export const executeQuery = async (conn: Connection, query: string, params: { [param: string]: string | boolean | Number | null} | undefined = undefined) => {
    const results = params
        ? await conn.execute(query, params)
        : await conn.execute(query);
    return results;
};
