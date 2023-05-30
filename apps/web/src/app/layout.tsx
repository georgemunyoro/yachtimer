"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Roboto } from "next/font/google";

import "./globals.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "../styles/ag-theme-yachtimer.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
