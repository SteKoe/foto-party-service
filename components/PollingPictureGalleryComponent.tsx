"use client";

import React, {PropsWithChildren, useEffect, useState, useCallback, useMemo} from "react";
import {PictureGalleryComponent} from "@/components/PictureGalleryComponent";
import {useSearchParams} from "next/navigation";
import useWindowDimensions from "@/app/hooks/useWindowDimensions";
import {useMitt} from "@/components/provider/mitt";
import FloatingProgressBar from "@/components/FloatingProgressBar";

const POLLING_INTERVAL_IN_SECONDS = 60;

export default function PollingPictureGalleryComponent({
  children,
}: PropsWithChildren) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { emitter } = useMitt();
  const [remainingSeconds, setRemainingSeconds] = useState(POLLING_INTERVAL_IN_SECONDS * 1000);

  const { width } = useWindowDimensions();

  const [galleryColumns, setGalleryColumns] = useState(
    Number(searchParams.get("columns") ?? 2),
  );

  const getData = useCallback(async () => {
    const res = await fetch(`/api/media`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }, []);

  useEffect(() => {
    const timeout = 100;
    const countdown = setInterval(() => {
      setRemainingSeconds((prev) => {
        let number = prev - timeout;

        if (number <= 0) {
          return POLLING_INTERVAL_IN_SECONDS * 1000
        }

        return number;
      });
    }, timeout);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    const columnsCount = width >= 800 ? 4 : width >= 600 ? 3 : 2;

    setGalleryColumns(columnsCount);
  }, [width]);

  useEffect(() => {
    const handlePictureUploaded = async () => {
      setIsLoading(true);
      const data = await getData();
      setImages(data);
      setIsLoading(false);
      console.log("Updated images after upload");
    };

    emitter.on("picture.uploaded", handlePictureUploaded);

    return () => {
      emitter.off("picture.uploaded", handlePictureUploaded);
    };
  }, [emitter, getData]);



  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      const data = await getData();
      setImages(data);
      setIsLoading(false);
    };

    void initialLoad();
  }, [getData]);

  useEffect(() => {
    const pollImages = setInterval(async () => {
      setIsLoading(true);
      const data = await getData();
      setImages(data);
      setIsLoading(false);
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 1000 * POLLING_INTERVAL_IN_SECONDS);

    return () => {
      clearInterval(pollImages);
    };
  }, [getData]);

  const memoizedGallery = useMemo(() => (
    <PictureGalleryComponent images={images} columnsCount={galleryColumns}>
      {children}
    </PictureGalleryComponent>
  ), [images, galleryColumns, children]);

  return (
    <>
      <FloatingProgressBar progress={isLoading ? "indeterminate" : (remainingSeconds / (POLLING_INTERVAL_IN_SECONDS * 1000)) * 100}/>

      {memoizedGallery}
    </>
  );
}
