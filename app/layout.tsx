import './globals.css'
import './fonts/Marcellus/index.css'
import Header from "@/components/Header";

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
        <Header/>
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
