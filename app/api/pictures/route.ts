import {ListObjectsV2Command} from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
import {client} from "@/app/api/S3Client";
import {listFiles} from "@/app/api/GoogleDriveClient";

export async function GET(
    request: Request,
) {
    const searchParams = new URL(request.url).searchParams;
    const count = Number(searchParams.get("count") ?? 100);

    try {
        const contents = await listFiles();
        return NextResponse.json(contents?.splice(0, count));
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: 404}, {status: 404})
    }
}