import { connectDb, executeQuery, readSQLScript } from "@/utils/dbUtils";
import { ResponseInterface } from "@/models/base.model";
import classes from "./page.module.scss";
import { Metadata } from "next";
import CreateCategoryForm from "./CreateCategoryForm";
import {
  CategoryInterface,
  PaymentInterface,
  ChargingAccountInterface,
} from "@/models/db.model";
import CreatePaymentForm from "./CreatePaymentForm";
import CreateChargingAccountForm from "./CreateChargingAccountForm";
import Table from "@/components/table/Table";

export const metadata: Metadata = {
  title: "Journey Quant - Configure",
  description: "Journey Quant Configure Page",
};

const getCategories = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/categories.sql");
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();
  return response.rows!;
};

const getPayments = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/payments.sql");
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();
  return response.rows!;
};

const getChargingAccounts = async () => {
  const conn = await connectDb();
  const query = readSQLScript("./src/sql/query/charging_accounts.sql");
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();
  return response.rows!;
};

const getChargingAccountsSelection = async () => {
  const conn = await connectDb();
  const query = readSQLScript(
    "./src/sql/query/charging_accounts_selection.sql"
  );
  const result = await executeQuery(conn, query, "query");
  const response: ResponseInterface = await result.json();
  return response.rows!;
};

const ConfigurePage = async () => {
  const categories = await getCategories();
  const payments = await getPayments();
  const chargingAccounts = await getChargingAccounts();
  const chargingAccountsSelection = await getChargingAccountsSelection();

  async function insertCategory(
    record: CategoryInterface
  ): Promise<ResponseInterface> {
    "use server";

    const conn = await connectDb();
    const query = readSQLScript("./src/sql/insert/dim_categories.sql");

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

  async function insertPayment(
    record: PaymentInterface
  ): Promise<ResponseInterface> {
    "use server";

    const conn = await connectDb();
    const query = readSQLScript("./src/sql/insert/dim_payments.sql");

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

  async function insertChargingAccount(
    record: PaymentInterface
  ): Promise<ResponseInterface> {
    "use server";

    const conn = await connectDb();
    const query = readSQLScript("./src/sql/insert/dim_charging_accounts.sql");

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

  return (
    <main className={classes["main"]}>
      <section className="category">
        <CreateCategoryForm
          baseClass="category"
          classes={classes}
          insertRecord={insertCategory}
        />
        <Table
          baseClass="category"
          classes={classes}
          headers={["ID", "Sub Category", "Category", "Discretionary"]}
          data={categories}
        />
      </section>
      <section className="payment">
        <CreatePaymentForm
          baseClass="payment"
          classes={classes}
          insertRecord={insertPayment}
          chargingAccountsSelection={chargingAccountsSelection}
        />
        <Table
          baseClass="payment"
          classes={classes}
          headers={[
            "ID",
            "Alias",
            "Payment Type",
            "Card Provider",
            "Payment Operator",
            "Charged To",
          ]}
          data={payments}
        />
      </section>
      <section className="charging-account">
        <CreateChargingAccountForm
          baseClass="charging-account"
          classes={classes}
          insertRecord={insertChargingAccount}
        />
        <Table
          baseClass="charging-account"
          classes={classes}
          headers={["ID", "Alias", "Service Provider"]}
          data={chargingAccounts}
        />
      </section>
    </main>
  );
};

export default ConfigurePage;
