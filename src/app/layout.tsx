import NavBar from "@/components/layout/NavBar";
import { textFont, headerFont } from "./fonts";
import "./globals.scss";
import classes from "./layout.module.scss";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Journey Quant - FallBack",
  description: "Journey Quant FallBack Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${textFont.variable} ${headerFont.variable}`}>
        <NavBar classes={classes} baseClass="nav" />
        {children}
      </body>
    </html>
  );
}
