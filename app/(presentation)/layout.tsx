import '../globals.css'
import '../fonts/Marcellus/index.css'
import {Metadata} from "next";
import AnimatedStarfield from "@/components/starfield/AnimatedStarfieldComponent";

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
    <html lang="de">
      <body className={"max-w-full"}>{children}</body>
    </html>
  )
}
