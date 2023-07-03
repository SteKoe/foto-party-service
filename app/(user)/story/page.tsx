import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import Timeline from "@/components/Timeline";

export default function Page() {
    return (
        <ContainerLayout>
            <h1 className="heroHeading text-center">
                Story
            </h1>
            <Timeline />
        </ContainerLayout>
    )
}