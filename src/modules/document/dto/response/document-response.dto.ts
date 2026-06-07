import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const DocumentResponseDto = z.object({
  id: z.number().int().positive().openapi({ example: 1 }),
  key: z
    .string()
    .openapi({ example: 'uploads/8b0db4a7-2c5f-49c4-a89d-77df6f6e2c95.pdf' }),
  filename: z.string().openapi({ example: 'exercice_1.pdf' }),
  mime_type: z.string().openapi({ example: 'application/pdf' }),
  size: z.number().openapi({ example: 1_000_000 }),
  description: z.string().nullable().openapi({ example: 'Lista da aula 1' }),
  class_id: z.number().int().positive().openapi({ example: 1 }),
  createdAt: z
    .string()
    .datetime()
    .openapi({ example: '2026-06-05T03:20:00.000Z' }),
});

export type DocumentResponseDto = z.infer<typeof DocumentResponseDto>;
