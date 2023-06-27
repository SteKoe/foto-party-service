import {ListObjectsV2Command} from "@aws-sdk/client-s3";
import {NextResponse} from "next/server";
import {client} from "@/app/api/S3Client";

export async function GET(
    request: Request,
) {
    const command = new ListObjectsV2Command({
        Bucket: process.env.BUCKET
    });


    try {
        let contents: any[] = [];
        let isTruncated = true;

        while (isTruncated) {
            const {Contents, IsTruncated, NextContinuationToken} = await client.send(command);
            if (Contents) {
                isTruncated = IsTruncated;
                command.input.ContinuationToken = NextContinuationToken;

                let map = Contents
                    .sort((a, b) => new Date(b.LastModified!).getTime() - new Date(a.LastModified!).getTime())
                    .map((c) => {
                    return c.Key!;
                });

                contents = [...contents, ...map];
            }
        }
        return NextResponse.json(contents);
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: 404}, {status: 404})
    }
}