import { Suspense } from "react";
import PollingPictureGalleryComponent from "@/components/PollingPictureGalleryComponent";

export default async function Page() {
  return (
    <Suspense>
      <PollingPictureGalleryComponent />
    </Suspense>
  );
}
