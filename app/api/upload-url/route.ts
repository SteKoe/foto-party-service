import {S3Client} from "@aws-sdk/client-s3";
import {createPresignedPost} from "@aws-sdk/s3-presigned-post";
import {NextResponse} from "next/server";
import {randomUUID} from "crypto";

export async function GET(
    request: Request,
) {
    const {searchParams} = new URL(request.url)
    const file = randomUUID() + ".jpg"
    const fileType = searchParams.get('fileType')

    const s3 = new S3Client({
        apiVersion: '2006-03-01',
        region: process.env.REGION!,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY!,
            secretAccessKey: process.env.SECRET_ACCESS_KEY!,
        }
    })

    const post = await createPresignedPost(s3, {
        Bucket: process.env.BUCKET!,
        Key: file!,
        Fields: {
            'Content-Type': fileType!,
        },
        Expires: 60, // seconds
        Conditions: [
            ['content-length-range', 0, 1024 * 1024 * 5], // up to 1 MB
        ],
    })

    return NextResponse.json(post);
}
    