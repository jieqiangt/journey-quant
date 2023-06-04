import { AllDBInterface } from "@/models/db.model";
import { ResponseInterface } from "@/models/base.model";
import { connect, Config, Connection } from "@planetscale/database";
import fs from "fs";
import { NextResponse } from "next/server";
import { AppError } from "./errorUtils";


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

export const executeQuery = async (conn: Connection, query: string, method: "insert" | "query" | "update", params: AllDBInterface | undefined | { [colName: string]: string } = undefined) => {
  const result = params
    ? await conn.execute(query, params)
    : await conn.execute(query);

  const response: Partial<ResponseInterface> = {}

  if (['insert', 'update'].includes(method)) {
    if (!(result.rowsAffected >= 1)) {
      response.title = "Database Insertion/Update Error"
      response.err = "Rows affected is 0. Please check Database!"
      response.status = 500
      response.notification = "The server is currently unavailable. Please try again later."
      response.className = "error"
      throw new AppError(response as ResponseInterface)
    }

    response.title = "Record inserted/updated successfully!"
    response.status = 200
  }

  if (method === "query") {
    if (!(result.rows)) {
      response.title = "Database Query Error"
      response.err = "Please check Database!"
      response.status = 500
      response.notification = "The server is currently unavailable. Please try again later."
      response.className = "error"
      throw new AppError(response as ResponseInterface)
    }

    response.title = "Queried data successfully!"
    response.status = 200
    response.rows = result.rows
  }

  return NextResponse.json(response as ResponseInterface);
};