import '../globals.css'
import '../fonts/Marcellus/index.css'
import FloralHeader from "@/components/FloralHeader";
import React from "react";
import Navigation from "@/components/Navigation";

export const metadata = {
    title: 'Kim & Stephan',
    description: 'Wir heiraten dann wohl!',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <FloralHeader/>
        <Navigation />
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
