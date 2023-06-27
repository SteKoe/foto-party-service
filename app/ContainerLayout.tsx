import React from "react";

export default function ContainerLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <main className="max-w-xl mx-auto">
            {children}
        </main>
    )
}