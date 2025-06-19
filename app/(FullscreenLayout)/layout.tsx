import "../globals.css";
import "../fonts/Marcellus/index.css";
import '@mantine/core/styles.css';

import {Metadata, Viewport} from "next";
import React from "react";
import {getLocale, getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import {MittProvider} from "@/components/provider/mitt";
import {ColorSchemeScript, mantineHtmlProps, MantineProvider} from '@mantine/core';

export const metadata: Metadata = {
  title: process.env.APP_NAME || "Foto Gallery App",
  description: "",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
      <html lang={locale} className={"h-full"} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript/>
      </head>
      <body className={"flex flex-col min-h-full"}>
        <div className={"flex h-full flex-col justify-between"}>
          <MittProvider>
            <NextIntlClientProvider messages={messages}>
              <MantineProvider>
                {children}
              </MantineProvider>
            </NextIntlClientProvider>
          </MittProvider>
        </div>
      </body>
    </html>
  );
}
