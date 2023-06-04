import ExpenseForm from "./ExpenseForm";
import classes from "./page.module.scss";
import { Metadata } from "next";
import { ExpenseInterface } from "@/models/db.model";
import { connectDb, executeQuery, readSQLScript } from "@/utils/dbUtils";
import { ResponseInterface } from "@/models/base.model";
import { convertDatetoStr, addMonths } from "@/utils/dateUtils";
import Table from "@/components/table/Table";

export const metadata: Metadata = {
  title: "Journey Quant - Record",
  description: "Journey Quant Record Expense",
};

const getCategoriesSelection = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/categories_selection.sql");
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();

  return response.rows!;
};

const getPaymentsSelection = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/payments_selection.sql");
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();

  return response.rows!;
};

const getExpenses = async (startDate: string) => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/expenses.sql");
  const params = { startDate: startDate };
  const result = await executeQuery(conn, query, "query", params);
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

  const categoriesSelection = await getCategoriesSelection();
  const paymentsSelection = await getPaymentsSelection();

  const startDate = addMonths(new Date(), -3);

  const startDateStr = convertDatetoStr(startDate);
  const expenses = await getExpenses(startDateStr);

  return (
    <main className={classes[""]}>
      <ExpenseForm
        classes={classes}
        baseClass="form"
        insertRecord={insertRecord}
        categoriesSelection={categoriesSelection}
        paymentsSelection={paymentsSelection}
      />
      <Table
        baseClass="expenses"
        classes={classes}
        headers={["ID", "Date", "Category", "Description", "Amount"]}
        data={expenses}
      />
    </main>
  );
};

export default RecordPage;
