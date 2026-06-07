import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const LessonResponseDto = z.object({
  id: z.number().int().positive().openapi({ example: 1 }),
  modality: z.string().openapi({ example: 'REMOTE' }),
  date_time: z
    .string()
    .datetime()
    .openapi({ example: '2026-06-10T14:00:00.000Z' }),
  description: z.string().nullable().openapi({ example: 'Aula sobre vetores' }),
  class_id: z.number().int().positive().openapi({ example: 1 }),
  createdAt: z
    .string()
    .datetime()
    .openapi({ example: '2026-06-05T03:20:00.000Z' }),
});

export type LessonResponseDto = z.infer<typeof LessonResponseDto>;
