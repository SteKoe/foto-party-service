import PollingPictureGalleryComponent from "@/components/PollingPictureGalleryComponent";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense>
      <PollingPictureGalleryComponent />
    </Suspense>
  );
}
