'use client';

import Masonry from "react-responsive-masonry";
import Image from "next/image";

type PicturesComponentProps = {
    images: string[],
    columnsCount?: number
}

export function PictureGalleryComponent({images, columnsCount = 4}: PicturesComponentProps) {
    return (
        <div className="text-center">
            <Masonry columnsCount={columnsCount} gutter="0.6rem" className={"m-2"}>
                {images.map((img) => (
                    <Image key={img} src={"/api/pictures/" + img} alt={""} width={500} height={250} className={"rounded"} />
                ))}
            </Masonry>
        </div>
    )
}