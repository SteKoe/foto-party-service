'use client';

import Masonry from "react-responsive-masonry";
import Image from "next/image";

type PicturesComponentProps = {
    images: string[]
}

export function PictureGalleryComponent({images}: PicturesComponentProps) {
    return (
        <div className="text-center">
            <Masonry columnsCount={4} gutter=".5rem">
                {images.map((img) => (
                    <Image key={img} src={"/api/pictures/" + img} alt={""} width={500} height={250} />
                ))}
            </Masonry>
        </div>
    )
}