import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import PicturesPageComponent from "@/components/PicturesPageComponent";

export default async function Page() {
    return (
        <ContainerLayout size={"max-w-5xl"}>
            <PicturesPageComponent/>
        </ContainerLayout>
    )
}