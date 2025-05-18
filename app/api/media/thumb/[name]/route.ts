import {getMediaHandler} from "@/app/api/media/getMediaHandler";

export async function GET(
    request: Request,
    {params}: { params: { name: string } },
) {
    const size = Number.isInteger(process.env.IMAGE_SCALED_MAX_SIZE) ? Number(process.env.IMAGE_SCALED_MAX_SIZE) : 512;
    const fileName = params.name;

    return await getMediaHandler(fileName, size);
}
