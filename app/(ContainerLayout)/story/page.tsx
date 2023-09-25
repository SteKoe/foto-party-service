import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import Timeline from "@/components/Timeline";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Kim & Stephan | Story',
}

export default function Page() {
    return (
        <ContainerLayout>
            <Timeline/>
        </ContainerLayout>
    )
}