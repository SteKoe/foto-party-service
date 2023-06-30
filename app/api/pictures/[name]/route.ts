import {DeleteObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
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
        const stream = await response.Body?.transformToWebStream()!;
        return new NextResponse(stream);
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: 404}, {status: 404});
    }
}

export async function DELETE(request: Request, {params}: { params: { name: string } }) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.BUCKET,
            Key: params.name
        });
        await client.send(command);
        return new NextResponse(null, {status: 201});
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: 404}, {status: 404});
    }
}
