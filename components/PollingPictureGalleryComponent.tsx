"use client";

import React, { useEffect, useState } from "react";
import { PictureGalleryComponent } from "@/components/PictureGalleryComponent";
import { useSearchParams } from "next/navigation";
import prettyMilliseconds from "pretty-ms";
import useWindowDimensions from "@/app/hooks/useWindowDimensions";

const POLLING_INTERVAL_IN_SECONDS = 60;

function Countdown(props: { time: number }) {
  const [remainingSeconds, setRemainingSeconds] = useState(props.time);

  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
      if (remainingSeconds <= 0) {
        setRemainingSeconds(props.time);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);
  return (
    <>
      {prettyMilliseconds(remainingSeconds * 1000, {
        compact: true,
      })}
    </>
  );
}

export default function PollingPictureGalleryComponent() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const { width } = useWindowDimensions();

  const [galleryColumns, setGalleryColumns] = useState(
    Number(searchParams.get("columns") ?? 2),
  );

  useEffect(() => {
    setGalleryColumns(width < 640 ? 1 : width < 1024 ? 2 : 4);
  }, [width]);

  async function getData() {
    const res = await fetch(`/api/pictures`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      const data = await getData();
      setImages(data);
      setIsLoading(false);
    };

    initialLoad();
  }, []);

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
  }, []);

  return (
    <>
      <div className={"fixed bottom-1 right-1 z-40 flex gap-1 text-black"}>
        {isLoading ? (
          <div
            className={
              "flex h-7 w-7 items-center justify-center rounded bg-white bg-opacity-50 text-center text-xs md:h-10 md:w-10 md:text-base"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={"m-2 animate-spin"}
              viewBox="0 0 512 512"
            >
              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
            </svg>
          </div>
        ) : (
          <div
            className={
              "flex h-7 px-2 items-center justify-center rounded bg-white bg-opacity-50 text-center text-xs md:h-10 md:w-10 md:text-base"
            }
          >
            <Countdown time={POLLING_INTERVAL_IN_SECONDS} />
          </div>
        )}
      </div>
      <PictureGalleryComponent images={images} columnsCount={galleryColumns} />
    </>
  );
}
