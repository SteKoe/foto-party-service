import {S3Client} from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
import sharp from "sharp";
import {createPresignedPost} from "@aws-sdk/s3-presigned-post";
import {FormData} from "next/dist/compiled/@edge-runtime/primitives";
import {randomUUID} from "crypto";

const s3 = new S3Client({
    apiVersion: '2006-03-01',
    region: process.env.REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    }
})

export async function POST(
    request: Request,
) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (file instanceof Blob) {
        const input = await toBuffer(file.stream());
        const buffer = await sharp(input).resize(Number(process.env.RESIZE_SIZE) ?? 1024).toBuffer();

        const fileExt = file.name.split('.').pop();
        const newFilename = `${randomUUID()}.${fileExt}`;
        const response = await uploadToS3(newFilename, new Blob([buffer]));

        if (response.ok) {
            return new NextResponse(null, {status: 201});
        } else {
            return NextResponse.json({
                error: response.statusText
            }, {status: 400})
        }
    }

    return NextResponse.json("post");
}


async function uploadToS3(filename: string, blob: Blob) {
    const {url, fields} = await createPresignedPost(s3, {
        Bucket: process.env.BUCKET!,
        Key: filename,
        Expires: 60, // seconds
        Conditions: [
            ['content-length-range', 0, 1024 * 1024 * 5]
        ],
    })

    const s3UploadFormData = new FormData();
    Object.entries({...fields, file: blob}).forEach(([key, value]) => {
        s3UploadFormData.append(key, value)
    })
    return await fetch(url, {
        method: 'POST',
        body: s3UploadFormData,
    });
}

async function toBuffer(stream: ReadableStream<Uint8Array>) {
    const list = []
    const reader = stream.getReader()
    while (true) {
        const {value, done} = await reader.read()
        if (value)
            list.push(value)
        if (done)
            break
    }
    return Buffer.concat(list)
}
