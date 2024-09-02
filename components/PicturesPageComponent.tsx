"use client";

import React from "react";
import { TakePicture } from "@/components/TakePicture";
import { ToastContainer } from "react-toastify";
import PollingPictureGalleryComponent from "@/components/PollingPictureGalleryComponent";

export default function PicturesPageComponent() {
  return (
    <>
      <ToastContainer position={"top-center"} hideProgressBar={true} />

      <PollingPictureGalleryComponent>
        <TakePicture />
      </PollingPictureGalleryComponent>
    </>
  );
}
