import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const GetSignedDownloadAndPreviewResponseDto = z.object({
  preview_url: z.string(),
  download_url: z.string(),
});

export type GetSignedDownloadAndPreviewResponseDto = z.infer<
  typeof GetSignedDownloadAndPreviewResponseDto
>;
