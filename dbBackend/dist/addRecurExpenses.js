import { connectDb, executeQuery, readSQLScript } from "./dbUtils.js";
const convertDatetoStr = (date) => {
    const yearStr = date.toLocaleString("default", { year: "numeric" });
    const monthStr = date.toLocaleString("default", { month: "2-digit" });
    const dayStr = date.toLocaleString("default", { day: "2-digit" });
    return `${yearStr}-${monthStr}-${dayStr}`;
};
const conn = await connectDb();
const checkRecurExpensesQuery = readSQLScript("./sql/recur_expenses/check_recur_expenses.sql");
const today = new Date();
const todayDateStr = convertDatetoStr(today);
const params = { exp_month: today.getMonth() + 1, exp_year: today.getFullYear() };
const checkResult = await executeQuery(conn, checkRecurExpensesQuery, params);
if (checkResult.rows.length == 0) {
    const getRecurExpensesQuery = readSQLScript("./sql/recur_expenses/get_recur_expenses.sql");
    const insertRecurExpensesQuery = readSQLScript("./sql/recur_expenses/insert_recur_expenses.sql");
    const recurExpensesResult = await executeQuery(conn, getRecurExpensesQuery, params);
    const expensesToAdd = recurExpensesResult.rows;
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
        };
        const insertResult = await executeQuery(conn, insertRecurExpensesQuery, insertParams);
        console.log(insertResult);
    }
}
else {
    console.log("Recurring expenses added to current month!");
}
