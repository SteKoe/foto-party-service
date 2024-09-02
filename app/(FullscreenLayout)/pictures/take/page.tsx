import { Metadata } from "next";
import PicturesPageComponent from "@/components/PicturesPageComponent";

export const metadata: Metadata = {
  title: "Katharina & Kevin | Mache ein Foto und teiles es!",
};

export default function Page() {
  return <PicturesPageComponent />;
}
