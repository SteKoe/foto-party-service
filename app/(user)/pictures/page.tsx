import React from "react";
import ContainerLayout from "@/app/ContainerLayout";
import {PictureGalleryComponent} from "@/components/PictureGalleryComponent";

async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/pictures`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    const data = await getData()

    return (
        <ContainerLayout size={"max-w-5xl"}>
            <PictureGalleryComponent images={data} />
        </ContainerLayout>
    )
}