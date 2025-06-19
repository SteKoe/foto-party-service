import {getMediaHandler} from "@/app/api/media/getMediaHandler";

export async function GET(
    request: Request,
    {params}: { params: { name: string } },
) {
    return await getMediaHandler(`originals/${params.name}`);
}
