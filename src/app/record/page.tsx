import ExpenseForm from "./ExpenseForm";
import classes from "./page.module.scss";
import { Metadata } from "next";
import { ExpenseInterface } from "@/models/db.model";
import { connectDb, executeQuery, readSQLScript } from "@/utils/dbUtils";
import fs from "fs";
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

  async function updateRecord(
    record: ExpenseInterface
  ): Promise<ResponseInterface> {
    "use server";
    const conn = await connectDb();
    const query = readSQLScript("./src/sql/update/trs_expenses.sql");

    const result = await executeQuery(conn, query, "update", record);
    const response: ResponseInterface = await result.json();

    if (response.status === 500) {
      // set error notification
    }

    if (response.status === 200) {
      // set success notification
    }

    return response;
  }

  const updateFtTables = async (expense: ExpenseInterface) => {
    "use server";
    const { exp_date, exp_month, exp_year, user_id, updated_on, category_id } =
      expense;
    const conn = await connectDb();
    const getDiscretionaryQuery = readSQLScript(
      "./src/sql/query/get_discretionary_for_category_id.sql"
    );
    const getDiscretionaryParams = { category_id: category_id };
    const result = await executeQuery(
      conn,
      getDiscretionaryQuery,
      "query",
      getDiscretionaryParams
    );
    const discretionaryResponse: ResponseInterface = await result.json();
    const discretionary: number = discretionaryResponse.rows![0].discretionary;

    const updateParams = {
      exp_date,
      exp_month,
      exp_year,
      user_id,
      updated_on,
      category_id,
      discretionary,
    };

    const getFilePath = "./src/sql/ftTables/get";
    const replaceFilePath = "./src/sql/ftTables/replace";
    const fullFilePaths = fs.readdirSync(getFilePath);

    for (const fullFilePath of fullFilePaths) {
      const tblName = fullFilePath.split(/[.]/)[0];
      const getQuery = readSQLScript(`${getFilePath}/${tblName}.sql`);
      const getResult = await executeQuery(
        conn,
        getQuery,
        "query",
        updateParams
      );
      const getResponse = await getResult.json();

      const replaceQuery = readSQLScript(`${replaceFilePath}/${tblName}.sql`);
      for (const row of getResponse.rows) {
        const replaceResult = await executeQuery(
          conn,
          replaceQuery,
          "update",
          row
        );
        await replaceResult.json();
      }
    }
  };

  const categoriesSelection = await getCategoriesSelection();
  const startDate = addMonths(new Date(), -3);

  const startDateStr = convertDatetoStr(startDate);
  const expenses = await getExpenses(startDateStr);

  return (
    <main className={classes["main"]}>
      <ExpenseForm
        classes={classes}
        baseClass="form"
        insertRecord={insertRecord}
        categoriesSelection={categoriesSelection}
        updateFtTables={updateFtTables}
      />
      <Table
        baseClass="expenses"
        classes={classes}
        dataType="expense"
        headers={["ID", "Date", "Category", "Description", "Amount", " "]}
        data={expenses}
      />
    </main>
  );
};

export default RecordPage;
