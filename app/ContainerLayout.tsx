import React from "react";

export default function ContainerLayout({children, size = "max-w-xl"}: {
    children: React.ReactNode,
    size?: string
}) {
    return (
        <main className={"mx-auto " + size}>
            {children}
        </main>
    )
}