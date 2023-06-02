import fs from "fs";
import csv from "csv-parser";
import { connectDb, executeQuery, readSQLScript } from "./dbUtils.js";


type InputParamsType = { [colName: string]: string | boolean }
type RecordType = { [colName: string]: string }

const filePath = './backup'
const fileNames = fs.readdirSync(filePath);

const conn = await connectDb()

const correctRecord = (record: RecordType) => {

  delete record.id;

  const booleanKeys = ["discretionary", "recurring", "auth_2fa", "is_active"]
  const correctedRecord: Partial<InputParamsType> = { ...record };

  for (const key of booleanKeys) {
    if (record[key]) {
      const booleanValue = record[key].toLowerCase() === "true" ? true : false;
      correctedRecord[key] = booleanValue;
    }
  }

  for (let key in correctedRecord) {
    if (correctedRecord[key] === "") {
      correctedRecord[key] = undefined;
    }
  }

  return correctedRecord as InputParamsType;
}

const main = async () => {

  for (const file of fileNames) {

    const tblName = file.split(/[.]/)[0]

    const results: RecordType[] = [];

    fs.createReadStream(`${filePath}/${file}`)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {

        const query = readSQLScript(`./sql/insert/${tblName}.sql`)

        console.log(`Seeding ${tblName}..`)
        for (const record of results) {
          const correctedRecord = correctRecord(record)
          const results = await executeQuery(conn, query, correctedRecord)

          if (results.rowsAffected >= 1) {
            // console.log(`Inserted ${results.rowsAffected} sucessfully!`)
          }
        }
        console.log(`Seeding ${tblName} completed without errors..`)
      });

  }
}

main()

