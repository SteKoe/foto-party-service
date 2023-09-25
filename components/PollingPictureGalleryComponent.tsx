'use client'

import React, {useEffect, useState} from "react";
import {PictureGalleryComponent} from "@/components/PictureGalleryComponent";
import ToggleFullscreenButton from "@/components/ToggleFullscreen";
import {useSearchParams} from "next/navigation";

const POLLING_INTERVAL_IN_SECONDS = 60;

export default function PollingPictureGalleryComponent() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    const galleryColumns = Number(searchParams.get("columns") ?? 4);

    async function getData() {
        const res = await fetch(`/api/pictures?count=${galleryColumns * 10}`)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

    useEffect(() => {
        const initialLoad = async () => {
            setIsLoading(true);
            let data = await getData();
            setImages(data);
            setIsLoading(false);
        }

        initialLoad();
    }, []);
    

    useEffect(() => {
        const id = setInterval(async () => {
            setIsLoading(true);
            let data = await getData();
            setImages(data);
            setIsLoading(false);
        }, 1000 * POLLING_INTERVAL_IN_SECONDS);
        return () => clearInterval(id);
    }, []);


    return (
        <>
            <div className={"fixed bottom-1 right-1 flex gap-1 text-black z-40"}>
                {isLoading ? (
                    <div
                        className={"bg-white bg-opacity-50 text-center h-7 w-7 text-xs md:h-10 md:w-10 md:text-base rounded flex justify-center items-center "}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={"animate-spin m-2"}
                             viewBox="0 0 512 512">
                            <path
                                d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>
                        </svg>
                    </div>
                ) : ''}
                <ToggleFullscreenButton/>
            </div>
            <PictureGalleryComponent images={images} columnsCount={galleryColumns}/>
        </>
    )
}