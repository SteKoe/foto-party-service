import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  apiVersion: "2006-03-01",
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getFile(name: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: name,
  });
  const response = await client.send(command);
  return response.Body?.transformToWebStream();
}

export async function deleteFile(name: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: name,
  });
  await client.send(command);
}

export async function listFiles() {
  const command = new ListObjectsCommand({
    Bucket: process.env.AWS_BUCKET,
  });
  const response = await client.send(command);
  return response.Contents?.map((file) => file.Key) ?? [];
}

export async function uploadImage(name: string, body: Buffer) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: name,
    Body: body,
  });
  return client.send(command);
}
