import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import type { StorageProvider } from './storage.provider';

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

const defaultDownloadExpires = Number(
  process.env.S3_DOWNLOAD_URL_EXPIRES_IN || 300,
);
const defaultUploadExpires = Number(
  process.env.S3_UPLOAD_URL_EXPIRES_IN || 300,
);
const defaultPreviewExpires = Number(
  process.env.S3_PREVIEW_URL_EXPIRES_IN || 300,
);

export const S3StorageProvider: StorageProvider = {
  async delete(key: string): Promise<void> {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      }),
    );
  },

  async getSignedDownloadUrl(
    key: string,
    filename: string,
    expiresIn: number = defaultDownloadExpires,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      ResponseContentDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    });

    return getSignedUrl(s3, command, { expiresIn });
  },

  async getSignedPreviewUrl(
    key: string,
    expiresIn: number = defaultPreviewExpires,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      ResponseContentDisposition: 'inline',
    });

    return getSignedUrl(s3, command, { expiresIn });
  },

  async getSignedUploadUrl(
    key: string,
    expiresIn: number = defaultUploadExpires,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
    });

    return getSignedUrl(s3, command, { expiresIn });
  },
};
