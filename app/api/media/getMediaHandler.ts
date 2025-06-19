import {getFile} from "@/app/api/S3Client";
import {NextResponse} from "next/server";

export async function getMediaHandler(fileName: string) {
    try {
        const response = await getFile(fileName);
        const contentType = response.contentType ?? "application/octet-stream";
        const responseBody = response.body;

        return new NextResponse(responseBody, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=3600, immutable", // Cache for 1 hour
            }
        });
    } catch (e) {
        console.error(`An error occurred during media retrieval: ${e}`);
        return NextResponse.json({error: 404}, {status: 404});
    }
}