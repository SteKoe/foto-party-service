import {NextResponse} from "next/server";
import sharp from "sharp";
import {randomUUID} from "crypto";
import {uploadImage} from "@/app/api/GoogleDriveClient";

export async function POST(
    request: Request,
) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (file instanceof Blob) {
        const input = await toBuffer(file.stream());
        const maxDimension = Number(process.env.RESIZE_SIZE) ?? 1024;
        const buffer = await sharp(input)
            .withMetadata()
            .resize({
                height: maxDimension,
                width: maxDimension,
                withoutEnlargement: true,
                fit: sharp.fit.inside,
            })
            .toBuffer();

        const fileExt = file.name.split('.').pop();
        const newFilename = `${randomUUID()}.${fileExt}`;
        const response = await uploadImage(newFilename, buffer);

        if (response) {
            return new NextResponse(null, {status: 201});
        } else {
            return NextResponse.json({
                error: response
            }, {status: 400})
        }
    }

    return NextResponse.json("post");
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
