import {
  _Object,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  apiVersion: "2006-03-01",
  region: process.env.AWS__REGION!,
  credentials: {
    accessKeyId: process.env.AWS__ACCESS_KEY!,
    secretAccessKey: process.env.AWS__SECRET_ACCESS_KEY!,
  },
});

export async function getFile(name: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS__BUCKET_NAME,
    Key: name,
  });
  const response = await client.send(command);
  return {
    body: await response.Body?.transformToByteArray(),
    contentType: response.ContentType, // Return the content type
  };
}

export async function deleteFile(name: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS__BUCKET_NAME,
    Key: name,
  });
  await client.send(command);
}

export async function uploadFile(name: string, contentType: string, file: Buffer) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS__BUCKET_NAME,
    Key: name,
    Body: file,
    ContentType: contentType
  });
  await client.send(command);
}

export async function listFiles() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS__BUCKET_NAME,
    Prefix: "thumbnails/",
  });

  const response = await client.send(command);

  return (
    response.Contents?.sort(
      (a: _Object, b: _Object) =>
        (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0),
    ).map((file) => file.Key?.replace("thumbnails/", "")) ?? []
  );
}
