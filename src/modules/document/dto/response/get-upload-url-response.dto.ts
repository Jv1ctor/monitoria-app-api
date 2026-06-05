import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const GetUploadUrlResponseDto = z.object({
  key: z
    .string()
    .openapi({ example: 'uploads/8b0db4a7-2c5f-49c4-a89d-77df6f6e2c95.pdf' }),
  upload_url: z.string().openapi({
    example:
      'https://storage.example.com/bucket/uploads/8b0db4a7-2c5f-49c4-a89d-77df6f6e2c95.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...',
  }),
});

export type GetUploadUrlResponseDto = z.infer<typeof GetUploadUrlResponseDto>;
