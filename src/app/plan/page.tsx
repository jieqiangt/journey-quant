import RecurExpenseForm from "./RecurExpenseForm";
import { RecurExpenseInterface } from "@/models/db.model";
import { ResponseInterface } from "@/models/base.model";
import classes from "./page.module.scss";
import { Metadata } from "next";
import { connectDb, readSQLScript, executeQuery } from "@/utils/dbUtils";
import Table from "@/components/table/Table";

export const metadata: Metadata = {
  title: "Journey Quant - Plan",
  description: "Journey Quant Recurring Expenses",
};

const getCategories = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/categories_selection.sql");
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();

  return response.rows!;
};

const getRecurExpenses = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/recur_expenses.sql");
  const params = { user_id: "1" };
  const result = await executeQuery(conn, query, "query", params);
  const response: ResponseInterface = await result.json();

  return response.rows!;
};

const RecurExpensePage = async () => {
  async function insertRecord(
    record: RecurExpenseInterface
  ): Promise<ResponseInterface> {
    "use server";

    const conn = await connectDb();
    const query = readSQLScript("./src/sql/insert/trs_recur_expense.sql");

    const result = await executeQuery(conn, query, "insert", record);
    const response: ResponseInterface = await result.json();

    if (response.status === 500) {
      // set error notification
    }

    if (response.status === 200) {
      // set success notification
    }

    return response;
  }

  const categories = await getCategories();
  const recurPeriods = [
    { name: "Monthly", value: "m" },
    { name: "Yearly", value: "y" },
  ];

  const recurExpenses = await getRecurExpenses();

  return (
    <main className={classes["main"]}>
      <RecurExpenseForm
        classes={classes}
        baseClass="form"
        insertRecord={insertRecord}
        categoriesSelection={categories}
        recurPeriodsSelection={recurPeriods}
      />
      <Table
        baseClass="recur"
        classes={classes}
        headers={[
          "ID",
          "Description",
          "Amount",
          "Period",
          "Start Date",
          "Category",
          "Payment",
        ]}
        data={recurExpenses}
      />
    </main>
  );
};

export default RecurExpensePage;
