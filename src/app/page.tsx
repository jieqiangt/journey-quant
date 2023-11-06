import { connectDb, executeQuery, readSQLScript } from "@/utils/dbUtils";
import { ColumnObject, ResponseInterface } from "@/models/base.model";
import {
  NeccessityData,
  CategoryData,
  StackedBarCategoryData,
  NecessityCumData,
} from "@/models/charts.model";
import classes from "./page.module.scss";
import { Metadata } from "next";
import CurrentMonthCategoryPieChart from "./CurrentMonthCategoryPieChart";
import CurrentMonthDailyBarChart from "./CurrentMonthDailyBarChart";
import CurrentMonthGaugeChart from "./CurrentMonthGaugeChart";
import { convertDatetoStr } from "@/utils/dateUtils";
import { CATEGORYCOLORS } from "@/utils/constants";
import CurrentMonthAreaChart from "./CurrentMonthAreaChart";

export const metadata: Metadata = {
  title: "Journey Quant - Home",
  description: "Journey Quant Description",
};

const getCurrentMonthExpensesByNecessity = async (
  userId: number,
  target: number
) => {
  const conn = await connectDb();
  const query = readSQLScript(
    "./src/sql/dashboard/main/current_month_expenses_by_necessity.sql"
  );

  const today = new Date();
  const params = {
    user_id: userId,
    exp_month: today.getMonth() + 1,
    exp_year: today.getFullYear(),
  };
  const result = await executeQuery(conn, query, "query", params);
  const response: ResponseInterface = await result.json();

  const dataRows = response.rows!;

  const necessityBreakdown: NeccessityData[] = [];

  for (const row of dataRows) {
    const necessity = row.label;
    const total = +row.total;

    const rowWithColor = {
      ...(necessity == "Essential" && {
        ...row,
        color: "#0010F1",
        total: +total.toFixed(2),
      }),
      ...(necessity == "Discretionary" && {
        ...row,
        color: "#FF8F07",
        total: +total.toFixed(2),
      }),
    } as NeccessityData;

    necessityBreakdown.push(rowWithColor);
  }

  const overallTotal = necessityBreakdown.reduce((total, expense) => {
    return total + +expense.total;
  }, 0);

  const budgetFromTarget = +(target - overallTotal);
  const totalExpensesFromBudget: NeccessityData[] = [];

  if (budgetFromTarget > 0) {
    totalExpensesFromBudget.push({
      label: "Total Expenditure",
      total: +overallTotal.toFixed(2),
      color: "#0010F1",
    });
    totalExpensesFromBudget.push({
      label: "Remaining",
      total: +budgetFromTarget.toFixed(2),
      color: "#128412",
    });

    necessityBreakdown.push({
      label: "Remaining",
      total: +budgetFromTarget.toFixed(2),
      color: "#128412",
    });
  } else {
    totalExpensesFromBudget.push({
      label: "Budget",
      total: +target.toFixed(2),
      color: "#0010F1",
    });
    totalExpensesFromBudget.push({
      label: "Exceeded",
      total: +Math.abs(budgetFromTarget).toFixed(2),
      color: "#E41010",
    });
  }

  return [
    totalExpensesFromBudget,
    necessityBreakdown,
    +overallTotal.toFixed(2),
  ] as const;
};

const getCurrentMonthExpensesByCategory = async (userId: number) => {
  const conn = await connectDb();
  const query = readSQLScript(
    "./src/sql/dashboard/main/current_month_expenses_by_category.sql"
  );

  const today = new Date();
  const params = {
    user_id: userId,
    exp_month: today.getMonth() + 1,
    exp_year: today.getFullYear(),
  };
  const result = await executeQuery(conn, query, "query", params);
  const response: ResponseInterface = await result.json();

  const dataRows = response.rows!;
  const dataRowsWithColor: CategoryData[] = [];

  for (const row of dataRows) {
    const category = row.label;
    const total = +row.total;
    const assignedColor = CATEGORYCOLORS.filter(
      (colorData) => colorData.category == category
    );

    const rowWithColor: CategoryData = {
      label: row.label,
      total: +total.toFixed(2),
      color: assignedColor[0].color,
    };

    dataRowsWithColor.push(rowWithColor);
  }
  return dataRowsWithColor;
};

const getCurrentMonthExpensesByCategoryPerDay = async (userId: number) => {
  const conn = await connectDb();
  const query = readSQLScript(
    "./src/sql/dashboard/main/current_month_expenses_by_category_per_day.sql"
  );

  const today = new Date();
  const params = {
    user_id: userId,
    start_date: `${today.getFullYear()}-${today.getMonth() + 1}-1`,
    end_date: convertDatetoStr(today),
  };
  const result = await executeQuery(conn, query, "query", params);
  const response: ResponseInterface = await result.json();

  const dataRows = response.rows!;
  const dataRowsNumericCorrected: StackedBarCategoryData[] = [];

  for (const row of dataRows) {
    let rowNumericCorrected: Partial<StackedBarCategoryData> = {};

    for (const colName in row) {
      const value: string | number = +row[colName]
        ? +row[colName]
        : row[colName];
      const newCol: ColumnObject = {};
      newCol[colName] = value;
      rowNumericCorrected = { ...rowNumericCorrected, ...newCol };
    }

    dataRowsNumericCorrected.push(
      rowNumericCorrected as StackedBarCategoryData
    );
  }

  return dataRowsNumericCorrected;
};

const getCurrentMonthFixedExpensesByCategory = async (userId: number) => {
  const conn = await connectDb();
  const query = readSQLScript(
    "./src/sql/dashboard/main/current_month_fixed_expenses_by_category.sql"
  );

  const today = new Date();
  const params = {
    user_id: userId,
    exp_month: today.getMonth() + 1,
    exp_year: today.getFullYear(),
  };
  const result = await executeQuery(conn, query, "query", params);
  const response: ResponseInterface = await result.json();

  const dataRows = response.rows!;
  const dataRowsNumericCorrected: StackedBarCategoryData[] = [];

  for (const row of dataRows) {
    let rowNumericCorrected: Partial<StackedBarCategoryData> = {};

    for (const colName in row) {
      const value: string | number = +row[colName]
        ? +row[colName]
        : row[colName];
      const newCol: ColumnObject = {};
      newCol[colName] = value;
      rowNumericCorrected = { ...rowNumericCorrected, ...newCol };
    }

    dataRowsNumericCorrected.push(
      rowNumericCorrected as StackedBarCategoryData
    );
  }

  return dataRowsNumericCorrected;
};

const getCurrentMonthExpensesByNecessityPerDay = async (
  userId: number,
  fixedMonthExpenses: NeccessityData
) => {
  const conn = await connectDb();
  const query = readSQLScript(
    "./src/sql/dashboard/main/current_month_expenses_by_necessity_per_day.sql"
  );

  const today = new Date();
  const params = {
    user_id: userId,
    start_date: `${today.getFullYear()}-${today.getMonth() + 1}-1`,
    end_date: convertDatetoStr(today),
  };
  const result = await executeQuery(conn, query, "query", params);
  const response: ResponseInterface = await result.json();

  const dataRows = response.rows!;
  dataRows.unshift(fixedMonthExpenses);

  const dataRowsWithCum: NecessityCumData[] = [];
  let essentialCum: number = 0;
  let discretionaryCum: number = 0;

  for (const row of dataRows) {
    const essential = +row.essential;
    const discretionary = +row.discretionary;

    essentialCum = +(+essentialCum + +row.essential).toFixed(2);
    discretionaryCum = +(+discretionaryCum + +row.discretionary).toFixed(2);

    const rowWithCum = {
      date: row.date,
      essential: +essential.toFixed(2),
      discretionary: +discretionary.toFixed(2),
      cum_essential: +essentialCum,
      cum_discretionary: +discretionaryCum,
    } as NecessityCumData;

    dataRowsWithCum.push(rowWithCum);
  }
  return dataRowsWithCum;
};

const getCurrentMonthFixedExpensesByNecessity = async (userId: number) => {
  const conn = await connectDb();
  const query = readSQLScript(
    "./src/sql/dashboard/main/current_month_fixed_expenses_by_necessity.sql"
  );

  const today = new Date();
  const params = {
    user_id: userId,
    exp_month: today.getMonth() + 1,
    exp_year: today.getFullYear(),
  };

  const result = await executeQuery(conn, query, "query", params);
  const response: ResponseInterface = await result.json();

  const dataRows = response.rows!;
  return dataRows[0] as NeccessityData;
};

const Home = async () => {
  const [
    currentExpensesFromBudget,
    currentMonthExpensesByNecessity,
    overallTotal,
  ] = await getCurrentMonthExpensesByNecessity(1, 1600);

  const currentMonthExpensesByCategory =
    await getCurrentMonthExpensesByCategory(1);

  const currentMonthFixedExpensesByCategory =
    await getCurrentMonthFixedExpensesByCategory(1);

  const currentMonthExpensesByCategoryPerDay =
    await getCurrentMonthExpensesByCategoryPerDay(1);

  const currentMonthFixedExpensesByNecessity =
    await getCurrentMonthFixedExpensesByNecessity(1);

  const currentMonthExpensesByNecessityPerDay =
    await getCurrentMonthExpensesByNecessityPerDay(
      1,
      currentMonthFixedExpensesByNecessity
    );

  return (
    <main className={classes["main"]}>
      <section className={classes["dashboard"]}>
        <CurrentMonthGaugeChart
          classes={classes}
          baseClass={"gauge"}
          data={currentExpensesFromBudget}
          total={overallTotal}
          outerData={currentMonthExpensesByNecessity}
        />
        <CurrentMonthCategoryPieChart
          classes={classes}
          baseClass={"pie"}
          data={currentMonthExpensesByCategory}
        />
        <CurrentMonthDailyBarChart
          classes={classes}
          baseClass={"bar"}
          data={currentMonthExpensesByCategoryPerDay}
        />
        <CurrentMonthAreaChart
          classes={classes}
          baseClass={"area"}
          data={currentMonthExpensesByNecessityPerDay}
        />
      </section>
    </main>
  );
};

export default Home;
