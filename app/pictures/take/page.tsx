import {TakePicture} from "@/components/TakePicture";
import ContainerLayout from "@/app/ContainerLayout";
import {NextRequest, NextResponse} from "next/server";
export default function Page() {
    return (
        <ContainerLayout>
            <TakePicture  />
        </ContainerLayout>
    )
}
