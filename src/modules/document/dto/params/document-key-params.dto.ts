import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const DocumentKeyParamsDto = z.object({
  key: z
    .string()
    .min(1)
    .regex(/^uploads\/[\dA-Za-z-]+\.[\dA-Za-z]+$/, 'Key invalido')
    .openapi({ example: 'uploads/8b0db4a7-2c5f-49c4-a89d-77df6f6e2c95.pdf' }),
});

export type DocumentKeyParamsDto = z.infer<typeof DocumentKeyParamsDto>;
