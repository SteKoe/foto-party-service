import '../globals.css'
import '../fonts/Marcellus/index.css'
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Kim & Stephan',
    description: 'Wir heiraten dann wohl!',
    viewport: 'width=device-width, initial-scale=1.0'
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="de" className={'h-full'}>
        <body className={'min-h-full flex flex-col justify-between'}>
        {children}
        </body>
        </html>
    )
}
