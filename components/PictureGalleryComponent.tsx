"use client";

import Masonry from "react-responsive-masonry";
import Image from "next/image";
import { PropsWithChildren } from "react";

import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import styles from "./PictureGalleryComponent.module.css";

type PicturesComponentProps = {
  images: string[];
  columnsCount?: number;
} & PropsWithChildren;

export function PictureGalleryComponent({
  images,
  columnsCount = 4,
  children,
}: PicturesComponentProps) {
  return (
    <div className="text-center text-xs md:text-base">
      <LightGallery speed={500} selector={"img"} download={false}>
        <Masonry columnsCount={columnsCount} gutter="0.6em" className={"p-2"}>
          {children}
          {images.map((img) => (
            <div
              data-src={"/api/pictures/" + img}
              key={img}
              className={styles.galleryImage}
            >
              <Image
                src={"/api/pictures/" + img}
                alt={img}
                blurDataURL={"/api/pictures/" + img + "?preview"}
                placeholder="blur"
                width={500}
                height={250}
                loading="lazy"
                className={"rounded"}
                data-src={"/api/pictures/" + img}
              />
            </div>
          ))}
        </Masonry>
      </LightGallery>
    </div>
  );
}
