import React from "react";
import AnimatedStarfield from "@/components/starfield/AnimatedStarfieldComponent";

export default function ContainerLayout({children, size = "max-w-4xl"}: {
    children: React.ReactNode,
    size?: string
}) {
    return (
        <main className={"mx-auto px-4 md:px-0 " + size}>
            {children}
        </main>
    )
}