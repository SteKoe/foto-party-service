import '../globals.css'
import '../fonts/Marcellus/index.css'
import React from "react";
import Navigation from "@/components/Navigation";
import {Metadata} from "next";
import AnimatedStarfield from "@/components/starfield/AnimatedStarfieldComponent";

export const metadata: Metadata = {
    title: 'Kim & Stephan | Hochzeit unter Sternen',
    description: 'Wir heiraten dann wohl!',
    viewport: 'width=device-width, initial-scale=1.0',
    themeColor: "#2C305A"
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="de" className={"h-full"}>
        <body className={"min-h-full flex flex-col justify-between"}>
        <div>
            <Navigation/>
            <AnimatedStarfield/>
            {children}
        </div>
        <footer className="footer">
            Created with ❤️<br/>by Kim & Stephan
        </footer>
        </body>
        </html>
    )
}
