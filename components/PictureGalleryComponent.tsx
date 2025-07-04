"use client";

import Masonry from "react-responsive-masonry";
import Image from "next/image";
import { PropsWithChildren } from "react";

import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import styles from "./PictureGalleryComponent.module.css";
import classNames from "classnames";

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
      <LightGallery
        speed={500}
        selector={".light-gallery"}
        download={false}
        plugins={[lgVideo]}
      >
        <Masonry columnsCount={columnsCount} gutter="0.6em" className={"p-2"}>
          {children}
          {images.filter(supportedFile).map((img) => {
            return (
              <div key={img} className={classNames(styles.galleryImage)}>
                {!isVideoFile(img) && (
                  <Image
                    data-src={`/api/media/${img}`}
                    src={`/api/media/thumb/${img}`}
                    alt={img}
                    width={500}
                    unoptimized={true}
                    height={250}
                    loading="lazy"
                    className={"rounded-xl light-gallery w-full h-full object-cover"}
                  />
                )}

                {isVideoFile(img) && (
                  <video
                    muted={true}
                    autoPlay={true}
                    controls={false}
                    loop={true}
                    className={"rounded-xl w-full h-full object-cover"}
                    src={"/api/media/" + img}
                  />
                )}
              </div>
            );
          })}
        </Masonry>
      </LightGallery>
    </div>
  );
}

function isVideoFile(file: string) {
  const videoExtensions: string[] = [
    ".mp4",
    ".avi",
    ".mkv",
    ".mov",
    ".wmv",
    ".flv",
    ".webm",
    ".mpeg",
    ".mpg",
    ".m4v",
    ".3gp",
    ".3g2",
    ".m2ts",
    ".mts",
    ".ts",
    ".vob",
    ".ogv",
    ".rm",
    ".rmvb",
  ];
  return videoExtensions.some((ext) => file.toLowerCase().endsWith(ext));
}

function supportedFile(file: string) {
  const supportedExtensions: string[] = [
    ".jpg",
    ".jpeg",
    ".png",
    ".mp4",
    ".mov",
  ];
  return supportedExtensions.some((ext) => file.toLowerCase().endsWith(ext));
}
