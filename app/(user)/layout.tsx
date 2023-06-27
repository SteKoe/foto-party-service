import '../globals.css'
import '../fonts/Marcellus/index.css'
import FloralHeader from "@/components/FloralHeader";
import React from "react";
import Navigation from "@/components/Navigation";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Kim & Stephan',
    description: 'Wir heiraten dann wohl!',
    viewport: 'width=device-width, initial-scale=1.0'
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="de">
        <body>
        <FloralHeader/>
        <Navigation/>
        <main>
            {children}
        </main>
        <footer className="footer">
            Created with ❤️<br/>by Kim & Stephan
        </footer>
        </body>
        </html>
)
}
