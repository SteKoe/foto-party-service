'use client'

import ContainerLayout from "@/app/ContainerLayout";
import {PictureGalleryComponent} from "@/components/PictureGalleryComponent";
import React, {useEffect, useState} from "react";

export default function PicturesPageComponent() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await fetch(`/api/pictures`)
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const data = await res.json();
            setImages(data);
        }

        getData();
    }, []);

    return (
        <ContainerLayout size={"max-w-5xl"}>
            <PictureGalleryComponent images={images} />
        </ContainerLayout>
    )
}