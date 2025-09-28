import {getMediaHandler} from "@/app/api/media/getMediaHandler";

export async function GET(request: Request, props: { params: Promise<{ name: string }> }) {
    const params = await props.params;
    return await getMediaHandler(`thumbnails/${params.name}`);
}
