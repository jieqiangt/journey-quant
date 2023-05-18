import { textFont, titleFont } from "./fonts";
import "./globals.scss";

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
      <body className={`${textFont.variable} ${titleFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
