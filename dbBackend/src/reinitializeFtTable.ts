import fs from "fs";
import { connectDb, executeQuery, readSQLScript } from "./dbUtils.js";

const main = async () => {
    const conn = await connectDb()
    const insertFtTablesFilePath = './sql/ft_tables'
    const createFtTablesFilePath = './sql/db_initialization'

    const fileNames = fs.readdirSync(insertFtTablesFilePath);

    for (const file of fileNames) {

        const tblName = file.split(/[.]/)[0]

        const dropQuery = `DROP TABLE IF EXISTS ${tblName}`
        const dropResults = await executeQuery(conn, dropQuery)
        console.log({ dropResults })

        const createQuery = readSQLScript(`${createFtTablesFilePath}/${tblName}.sql`)
        const createResults = await executeQuery(conn, createQuery)
        console.log({ createResults })

        const insertQuery = readSQLScript(`${insertFtTablesFilePath}/${tblName}.sql`)
        const insertResults = await executeQuery(conn, insertQuery)
        console.log({ insertResults })
    }
}

main()