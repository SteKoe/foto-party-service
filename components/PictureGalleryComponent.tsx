'use client';

import Masonry from "react-responsive-masonry";
import Image from "next/image";
import {PropsWithChildren, useState} from "react";

import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import styles from "./PictureGalleryComponent.module.css"

type PicturesComponentProps = {
    images: string[],
    columnsCount?: number
} & PropsWithChildren

export function PictureGalleryComponent({images, columnsCount = 4, children}: PicturesComponentProps) {
    const [deletedImages, setDeletedImages] = useState([] as string[]);
    const removeImage = async (imageToDelete: string) => {
        if (window.confirm("Willst du dieses Bild für jeden unwiederbringlich löschen?")) {
            const response = await fetch('/api/pictures/' + imageToDelete, {
                method: 'DELETE'
            });

            if (response.ok) {
                setDeletedImages(prevState => [...prevState, imageToDelete])
            }
        }
    }

    return (
        <div className="text-center text-xs md:text-base">
            <LightGallery speed={500}
                          selector={"img"}
                          download={false}>
                <Masonry columnsCount={columnsCount} gutter="0.6em" className={"p-2"}>
                    {children}
                    {images.filter(img => !deletedImages.includes(img)).map((img) => (
                        <div data-src={"/api/pictures/" + img} key={img} className={styles.galleryImage}>
                            <div className={styles.overlay}>
                                <button className={styles.btn} onClick={() => removeImage(img)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" height="1em"
                                         viewBox="0 0 448 512">
                                        <path
                                            d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                    </svg>
                                </button>
                            </div>
                            <Image src={"/api/pictures/" + img} alt={img} width={500} height={250}
                                   className={"rounded"} data-src={"/api/pictures/" + img}/>
                        </div>
                    ))}
                </Masonry>
            </LightGallery>
        </div>
    )
}