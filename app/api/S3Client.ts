import {S3Client} from "@aws-sdk/client-s3";

export const client = new S3Client({
    apiVersion: '2006-03-01',
    region: process.env.REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    }
})