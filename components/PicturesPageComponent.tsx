"use client";

import { PictureGalleryComponent } from "@/components/PictureGalleryComponent";
import React, { useEffect, useState } from "react";
import { useCurrentWidth } from "react-breakpoints-hook";
import { TakePicture } from "@/components/TakePicture";
import { ToastContainer } from "react-toastify";

export default function PicturesPageComponent() {
  const [images, setImages] = useState([]);

  const width = useCurrentWidth();
  const columnsCount =
    images.length === 0 ? 1 : width >= 800 ? 4 : width >= 600 ? 3 : 2;

  async function getData() {
    const res = await fetch(`/api/pictures`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    setImages(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ToastContainer position={"top-center"} hideProgressBar={true} />

      <PictureGalleryComponent images={images} columnsCount={columnsCount}>
        <TakePicture onPictureTaken={getData} />
      </PictureGalleryComponent>
    </>
  );
}
