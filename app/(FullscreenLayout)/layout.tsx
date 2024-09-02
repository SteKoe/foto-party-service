import "../globals.css";
import "../fonts/Marcellus/index.css";
import { Metadata, Viewport } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Katharina & Kevin",
  description: "",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={"h-full"}>
      <body className={"flex min-h-full flex-col justify-between"}>
        {children}
      </body>
    </html>
  );
}
