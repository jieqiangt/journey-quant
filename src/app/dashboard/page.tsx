import classes from "./page.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journey Quant - Dashboard",
  description: "Journey Quant Dashboard",
};

const DashboardPage: React.FC = () => {
  return (
    <main className={classes["main"]}>
      <p>Hi</p>
      <h1>This is a title</h1>
    </main>
  );
};

export default DashboardPage;
