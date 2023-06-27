import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import PicturesPageComponent from "@/app/(user)/pictures/PicturesPageComponent";

export default async function Page() {
    return (
        <ContainerLayout size={"max-w-5xl"}>
            <PicturesPageComponent/>
        </ContainerLayout>
    )
}