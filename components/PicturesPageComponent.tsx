"use client";

import React from "react";
import {ToastContainer} from "react-toastify";
import PollingPictureGalleryComponent from "@/components/PollingPictureGalleryComponent";
import {DropZone} from "@/components/DropZone";

export default function PicturesPageComponent() {
  return (
    <>
      <ToastContainer position={"top-center"} hideProgressBar={true} />

      <PollingPictureGalleryComponent>
          <DropZone/>
      </PollingPictureGalleryComponent>
    </>
  );
}
