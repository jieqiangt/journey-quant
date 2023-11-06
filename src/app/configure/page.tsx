import { connectDb, executeQuery, readSQLScript } from "@/utils/dbUtils";
import { ResponseInterface } from "@/models/base.model";
import classes from "./page.module.scss";
import { Metadata } from "next";
import CreateCategoryForm from "./CreateCategoryForm";
import { CategoryInterface } from "@/models/db.model";
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

const ConfigurePage = async () => {
  const categories = await getCategories();

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

  return (
    <main className={classes["main"]}>
      <section className="category">
        <CreateCategoryForm
          baseClass="category--form"
          classes={classes}
          insertRecord={insertCategory}
        />
        <Table
          baseClass="category--table"
          classes={classes}
          headers={["ID", "Sub Category", "Category", "Discretionary"]}
          data={categories}
        />
      </section>
    </main>
  );
};

export default ConfigurePage;
