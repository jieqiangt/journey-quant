import { connectDb, executeQuery, readSQLScript } from "./dbUtils.js";

const convertDatetoStr = (date: Date) => {
    const yearStr = date.toLocaleString("default", { year: "numeric" });
    const monthStr = date.toLocaleString("default", { month: "2-digit" });
    const dayStr = date.toLocaleString("default", { day: "2-digit" });

    return `${yearStr}-${monthStr}-${dayStr}`;
};

const getDatesInRange = (startDate: Date, endDate: Date) => {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
        const currentDate = new Date(date);
        dates.push({
            date: convertDatetoStr(currentDate),
            day: currentDate.getDate(),
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
        });
        date.setDate(date.getDate() + 1);
    }

    return dates;
};

const createfilePath = "./sql/db_initialization/dim_dates.sql";
const createQuery = readSQLScript(createfilePath);

const conn = await connectDb();

await executeQuery(conn, createQuery);

const d1 = new Date("2017-01-01");
const d2 = new Date("2035-12-31");
const dates = getDatesInRange(d1, d2);

const insertfilePath = "./sql/insert/dim_dates.sql";
const insertQuery = readSQLScript(insertfilePath);

for (const dateObj of dates) {

    await executeQuery(conn, insertQuery, dateObj);
}

console.log("done")
