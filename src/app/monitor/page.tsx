import { connectDb, executeQuery, readSQLScript } from "@/utils/dbUtils";
import { ColumnObject, ResponseInterface } from "@/models/base.model";
import classes from "./page.module.scss";
import { Metadata } from "next";
import YearlyExpensesAreaChart from "@/app/monitor/YearlyExpensesAreaChart";

export const metadata: Metadata = {
  title: "Journey Quant - Dashboard",
  description: "Journey Quant Dashboard",
};

const getYearlyExpenses = async (userId: number) => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/dashboard/yearly_expenses.sql");
  const params = { user_id: userId };
  const result = await executeQuery(conn, query, "query", params);
  const response: ResponseInterface = await result.json();

  return response.rows!;
};

const DashboardPage = async () => {
  const userId = 1;
  const yearlyExpenses = (await getYearlyExpenses(userId)) as ColumnObject[];
  return (
    <main className={classes["main"]}>
      <p>Hi</p>
      <h1>This is a title</h1>
      <YearlyExpensesAreaChart
        data={yearlyExpenses}
        baseClass={"areaChart"}
        classes={classes}
      />
    </main>
  );
};

export default DashboardPage;
