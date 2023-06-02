import { connectDb, executeQuery } from "./dist/dbUtils.js";

const conn = await connectDb();

const query = "DELETE FROM trs_expenses WHERE exp_date >= '2023-05-22'";

const results = await executeQuery(conn, query);
console.log(results);
