"use client";

import styles from "./TakePicture.module.css";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames";
import { v4 as randomUUID } from "uuid";
import resizeImage from "./ResizeImage";
import { useTranslations } from "next-intl";

interface TakePictureProps {
  onPictureTaken?: () => Promise<void>;
}

export function TakePicture({ onPictureTaken }: TakePictureProps) {
  const [images, setImages] = useState<File[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const t = useTranslations();

  async function submitForm() {
    if (Array.isArray(images) && images.length > 0 && !isUploading) {
      setIsUploading(true);

      try {
        const promises = [];
        for (const image of images) {
          promises.push(
            fetch(
              `https://fne8flz07j.execute-api.eu-central-1.amazonaws.com/prod/fuchs-baer-hochzeit/${randomUUID()}.${image.name.split(".").pop()}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": image.type,
                },
                body: await image.arrayBuffer(),
              },
            ),
          );
        }

        const results = await Promise.allSettled(promises);

        if (results.every((result) => result.status === "fulfilled")) {
          toast(t("take_picture.upload_successful", { count: images.length }));
          typeof onPictureTaken === "function"
            ? await onPictureTaken()
            : void 0;
        } else {
          toast.error(t("take_picture.upload_failed"));
          console.error("Upload failed.");
        }

        resetForm();
      } catch (e) {
        toast.error(t("take_picture.upload_failed"));
        console.error("Upload failed.", e);
      } finally {
        setIsUploading(false);
        setImages(null);
      }
    }
  }

  function resetForm() {
    setImages(null);
  }

  async function previewImage(event: ChangeEvent<HTMLInputElement>) {
    setIsProcessing(true);
    try {
      const files = event.target.files;
      if (files) {
        const filesToProcess: File[] = [];
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          if (file.type === "image/heic") {
            file = await convertHeicToJPG(file);
          }
          filesToProcess.push(file);
        }

        console.log(filesToProcess);

        const validFiles = [...filesToProcess].filter(
          (file) => file.size / 1e6 <= 20,
        );

        if (validFiles.length !== filesToProcess.length) {
          toast(t("take_picture.file_too_large"));
        }

        setImages(validFiles);
      }
    } finally {
      setIsProcessing(false);
    }
  }

  const labelText = (
    <div className={styles.cameraButtonLabel}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
      </svg>
      {t("take_picture.button")}
    </div>
  );

  return (
    <form>
      <label className={styles.cameraButton} id="preview">
        {images ? (
          <div
            className={classNames("grid", {
              "grid-cols-1": images.length <= 1,
              "grid-cols-2": images.length > 1,
            })}
          >
            {images
              .filter((image) => !isUnsupportedFile(image.name))
              .map((image) => {
                return (
                  <img
                    key={image.name}
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                  />
                );
              })}
            {images.filter((image) => isUnsupportedFile(image.name)).length >
              0 && <div>{t("take_picture.unsupported_files")}</div>}
          </div>
        ) : (
          labelText
        )}
        {isUploading && (
          <div className={styles.loadingOverlay}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                className={"m-2 animate-spin"}
                viewBox="0 0 512 512"
              >
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
              </svg>
              {t("take_picture.uploading", { count: images?.length })}
            </div>
          </div>
        )}
        {isProcessing && (
          <div className={styles.loadingOverlay}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                className={"m-2 animate-spin"}
                viewBox="0 0 512 512"
              >
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
              </svg>
              {t("take_picture.processing", { count: images?.length })}
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/heic,video/mp4"
          onChange={previewImage}
        />
      </label>
      {images ? (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.btn}
            onClick={submitForm}
            disabled={isUploading}
          >
            {isUploading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                className={"m-2 animate-spin"}
                viewBox="0 0 512 512"
              >
                <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 448 512"
              >
                <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
              </svg>
            )}
          </button>
          <button
            type="reset"
            className={styles.btn}
            onClick={resetForm}
            disabled={isUploading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 384 512"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
    </form>
  );
}

function isUnsupportedFile(file: string) {
  return isVideoFile(file) || !file.match(/\.(jpe?g|png)$/i);
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

  return videoExtensions.some((ext) => file.endsWith(ext));
}

async function convertHeicToJPG(imageToConvert: File) {
  const heic2any = (await import("heic2any")).default;

  const convertedBlob = await heic2any({
    blob: imageToConvert,
    toType: "image/jpg",
    quality: 0.9,
  });

  const { filename } = extractFilenameAndExtension(imageToConvert.name);
  const a = await resizeImage(
    new File([convertedBlob as Blob], `${filename}.jpg`, {
      type: "image/jpg",
    }),
  );

  return new File([a as Blob], `${filename}.jpg`, {
    type: "image/jpg",
  });
}

function extractFilenameAndExtension(filePath: string): {
  filename: string;
  extension: string;
} {
  // Extract the last part after the last slash
  const lastSegment = filePath.split("/").pop() || "";

  // Split the filename and extension
  const parts = lastSegment.split(".");

  // If there is no dot, it means there's no extension
  if (parts.length === 1) {
    return { filename: parts[0], extension: "" };
  }

  const extension = parts.pop() || "";
  const filename = parts.join(".");

  return { filename, extension };
}
