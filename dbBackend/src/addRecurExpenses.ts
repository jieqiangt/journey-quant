import { connectDb, executeQuery, readSQLScript } from "./dbUtils.js";
import { Row } from "./models/base.model.js";
import { ExpenseInterface } from "./models/db.model.js";
import fs from "fs";


const convertDatetoStr = (date: Date) => {
    const yearStr = date.toLocaleString("default", { year: "numeric" });
    const monthStr = date.toLocaleString("default", { month: "2-digit" });
    const dayStr = date.toLocaleString("default", { day: "2-digit" });

    return `${yearStr}-${monthStr}-${dayStr}`;
};

const updateFtTables = async (expense: ExpenseInterface) => {
    "use server";
    const { exp_date, exp_month, exp_year, user_id, updated_on, category_id } =
      expense;

    const conn = await connectDb();
    const getDiscretionaryQuery = readSQLScript(
      "./sql/query/get_discretionary_for_category_id.sql"
    );
    const getDiscretionaryParams = { category_id: category_id };
    const discretionaryResponse = await executeQuery(
      conn,
      getDiscretionaryQuery,
      getDiscretionaryParams
    );

    const discretionaryResult: Row = discretionaryResponse.rows![0];
    const discretionary:number = discretionaryResult.discretionary

    const updateParams = {
      exp_date,
      exp_month,
      exp_year,
      user_id,
      updated_on,
      category_id,
      discretionary,
    };

    const getFilePath = "./sql/updateFtTables/get";
    const replaceFilePath = "./sql/updateFtTables/replace";
    const fullFilePaths = fs.readdirSync(getFilePath);

    for (const fullFilePath of fullFilePaths) {
      const tblName = fullFilePath.split(/[.]/)[0];
      const getQuery = readSQLScript(`${getFilePath}/${tblName}.sql`);
      const getResult = await executeQuery(
        conn,
        getQuery,
        updateParams
      );

      const resultRows:Row[] = getResult.rows

      const replaceQuery = readSQLScript(`${replaceFilePath}/${tblName}.sql`);
      for (const row  of resultRows) {
        const replaceResult = await executeQuery(
          conn,
          replaceQuery,
          row
        );
      }
    }
  };

const conn = await connectDb();
const checkRecurExpensesQuery = readSQLScript("./sql/recur_expenses/check_recur_expenses.sql");

const today = new Date()
const todayDateStr = convertDatetoStr(today)

const params = { exp_month: today.getMonth() + 1, exp_year: today.getFullYear() }
const checkResult = await executeQuery(conn, checkRecurExpensesQuery, params);

if (checkResult.rows.length == 0) {

    const getRecurExpensesQuery = readSQLScript("./sql/recur_expenses/get_recur_expenses.sql");
    const insertRecurExpensesQuery = readSQLScript("./sql/insert/trs_expenses.sql");

    const recurExpensesResult = await executeQuery(conn, getRecurExpensesQuery, params);
    const expensesToAdd = recurExpensesResult.rows as ExpenseInterface[]

    for (let expense of expensesToAdd) {
        const insertParams = {
            exp_date: null,
            exp_desc: expense.exp_desc,
            amount: expense.amount,
            exp_month: today.getMonth() + 1,
            exp_year: today.getFullYear(),
            recurring: true,
            recurring_period: expense.recurring_period,
            category_id: expense.category_id,
            recurring_start: expense.recurring_start,
            user_id: expense.user_id,
            created_on: todayDateStr,
            updated_on: todayDateStr
        }

        const insertResult = await executeQuery(conn, insertRecurExpensesQuery, insertParams);
        console.log(`inserted ${insertResult.rowsAffected} row with rowID ${insertResult.insertId}`)
        updateFtTables(insertParams)
    }


}
else {
    console.log("Recurring expenses added to current month!")
}

