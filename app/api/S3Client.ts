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
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS__ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getFile(name: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: name,
  });
  const response = await client.send(command);
  return response.Body?.transformToByteArray();
}

export async function deleteFile(name: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: name,
  });
  await client.send(command);
}

export async function listFiles() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET,
  });

  const response = await client.send(command);

  return (
    response.Contents?.sort(
      (a: _Object, b: _Object) =>
        (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0),
    ).map((file) => file.Key) ?? []
  );
}

export async function uploadImage(name: string, body: Buffer) {
  console.log(process.env.AWS_BUCKET);
  console.log(process.env.AWS_SECRET_ACCESS_KEY);
  console.log(process.env.AWS__ACCESS_KEY);
  console.log(name);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: name,
    Body: body,
  });

  //return client.send(command);
}
