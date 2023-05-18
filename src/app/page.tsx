import classes from "./page.module.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journey Quant - Home",
  description: "Journey Quant Description",
};

const Home: React.FC = () => {
  return (
    <main className={classes["main"]}>
      <p>Hi</p>
      <h1>This is a title</h1>
    </main>
  );
};

export default Home;
