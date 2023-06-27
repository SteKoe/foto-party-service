import {ListObjectsV2Command} from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
import {client} from "@/app/api/S3Client";

export async function GET(
    request: Request,
) {
    const searchParams = new URL(request.url).searchParams;
    const count = Number(searchParams.get("count") ?? 2);
    
    const command = new ListObjectsV2Command({
        Bucket: process.env.BUCKET
    });

    try {
        let contents: any[] = [];
        let isTruncated = true;

        while (isTruncated) {
            const {Contents, IsTruncated, NextContinuationToken} = await client.send(command);
            if (Contents) {
                isTruncated = !!IsTruncated;
                command.input.ContinuationToken = NextContinuationToken;

                let map = Contents
                    .sort((a, b) => new Date(b.LastModified!).getTime() - new Date(a.LastModified!).getTime())
                    .map((c) => {
                    return c.Key!;
                });

                contents = [...contents, ...map];
            }
        }
        return NextResponse.json(contents.splice(0, count));
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: 404}, {status: 404})
    }
}