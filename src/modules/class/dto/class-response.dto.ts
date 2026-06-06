import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const ClassResponseDto = z.object({
  id: z.number().int().positive().openapi({ example: 1 }),
  code: z.string().openapi({ example: 'CS101-T1' }),
  monitor_id: z.number().int().positive().openapi({ example: 2 }),
  subject_id: z.number().int().positive().openapi({ example: 1 }),
  createdAt: z
    .string()
    .datetime()
    .openapi({ example: '2026-06-05T03:20:00.000Z' }),
});

export type ClassResponseDto = z.infer<typeof ClassResponseDto>;
