import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION ?? "us-east-1";
const bucket = process.env.AWS_S3_BUCKET ?? "";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 =
  bucket && accessKeyId && secretAccessKey
    ? new S3Client({
        region,
        credentials: { accessKeyId, secretAccessKey },
      })
    : null;

export type UploadResult = { url: string; key: string } | { error: string };

export async function uploadToS3(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
): Promise<UploadResult> {
  if (!s3 || !bucket) return { error: "S3 not configured" };
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      })
    );
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    return { url, key };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed" };
  }
}

