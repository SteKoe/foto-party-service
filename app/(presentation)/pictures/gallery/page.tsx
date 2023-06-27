import React from "react";
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
        <PictureGalleryComponent images={data} />
    )
}