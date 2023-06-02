import { connect } from "@planetscale/database";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const DATABASE_CONFIG = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
};
export const connectDb = async () => {
    const conn = await connect(DATABASE_CONFIG);
    return conn;
};
export const readSQLScript = (filePath) => {
    const query = fs.readFileSync(filePath).toString();
    const updatedQuery = query.replace(/(\r\n|\n|\r|\t)/gm, "");
    return updatedQuery;
};
export const executeQuery = async (conn, query, params = undefined) => {
    const results = params
        ? await conn.execute(query, params)
        : await conn.execute(query);
    return results;
};
