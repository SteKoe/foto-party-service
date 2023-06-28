'use client';

import Masonry from "react-responsive-masonry";
import Image from "next/image";
import {PropsWithChildren} from "react";

type PicturesComponentProps = {
    images: string[],
    columnsCount?: number
} & PropsWithChildren

export function PictureGalleryComponent({images, columnsCount = 4, children}: PicturesComponentProps) {
    return (
        <div className="text-center text-xs md:text-base">
            <Masonry columnsCount={columnsCount} gutter="0.6em" className={"p-2"}>
                {children}
                {images.map((img) => (
                    <Image key={img} src={"/api/pictures/" + img} alt={""} width={500} height={250} className={"rounded"} />
                ))}
            </Masonry>
        </div>
    )
}