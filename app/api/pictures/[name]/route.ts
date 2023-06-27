import {GetObjectCommand} from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {client} from "@/app/api/S3Client";

export async function GET(
    request: Request,
    {params}: { params: { name: string } }
) {

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET,
            Key: params.name
        });
        const response = await client.send(command);
        return new NextResponse(await response.Body?.transformToWebStream());
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: 404}, {status: 404});
    }
}

async function getSignedFileUrl(fileName: string, bucket: string, expiresIn: number = 60 * 60 * 24) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: fileName,
    });

    return await getSignedUrl(client, command, {expiresIn});
}