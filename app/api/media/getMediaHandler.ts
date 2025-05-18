import {getFile} from "@/app/api/S3Client";
import {Jimp} from "jimp";
import {NextResponse} from "next/server";

export async function getMediaHandler(fileName: string, size: number) {
    try {
        const response = await getFile(fileName);
        const contentType = response.contentType || "application/octet-stream";
        let responseBody = response.body;

        if (contentType?.startsWith("image/") && response.body) {
            // Resize the image using Jimp
            const image = await Jimp.read(Buffer.from(response.body));
            image.scaleToFit({
                w: size,
                h: size,
            });
            responseBody = await image.getBuffer(contentType);
        }

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