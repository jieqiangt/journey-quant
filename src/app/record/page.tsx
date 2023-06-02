import ExpenseForm from "./ExpenseForm";
import classes from "./page.module.scss";
import { Metadata } from "next";
import { ExpenseInterface } from "@/models/db.model";
import { connectDb, executeQuery, readSQLScript } from "@/utils/dbUtils";
import { ResponseInterface } from "@/models/base.model";

export const metadata: Metadata = {
  title: "Journey Quant - Record",
  description: "Journey Quant Record Expense",
};

const getCategories = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/categories_selection.sql");
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();

  return response.rows!;
};

const getPayments = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/payments_selection.sql");
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();

  return response.rows!;
};

const RecordPage = async () => {
  async function insertRecord(
    record: ExpenseInterface
  ): Promise<ResponseInterface> {
    "use server";

    const conn = await connectDb();
    const query = readSQLScript("./src/sql/insert/trs_expenses.sql");

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
  const payments = await getPayments();

  return (
    <main className={classes[""]}>
      <ExpenseForm
        classes={classes}
        baseClass="form"
        insertRecord={insertRecord}
        categoriesSelection={categories}
        paymentsSelection={payments}
      />
    </main>
  );
};

export default RecordPage;
