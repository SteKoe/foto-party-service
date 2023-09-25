'use client'

import {PictureGalleryComponent} from "@/components/PictureGalleryComponent";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import { useCurrentWidth } from 'react-breakpoints-hook';

export default function PicturesPageComponent() {
    const [images, setImages] = useState([]);

    const width = useCurrentWidth();
    const columnsCount = images.length === 0 ? 1 : width >= 800 ? 4 : width >= 600 ? 3 : 2;
    
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
        <>
            <PictureGalleryComponent images={images} columnsCount={columnsCount}>
                <Link href={"/pictures/take"} className="h-64 flex flex-col gap-1 text-xs justify-center items-center border border-dashed rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1.5em" viewBox="0 0 512 512">
                        <path
                            d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
                    </svg>
                    Foto machen <br />&amp;<br /> hochladen!
                </Link>
            </PictureGalleryComponent>
        </>
    )
}