import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const FrequencysResponseDto = z.object({
  id: z.number().int().positive().openapi({ example: 1 }),
  status: z.enum(['PENDING', 'FINISHED']).openapi({ example: 'PENDING' }),
  value: z.boolean().openapi({ example: false }),
  student_id: z.number().int().positive().openapi({ example: 5 }),
  lesson_id: z.number().int().positive().openapi({ example: 1 }),
  createdAt: z
    .string()
    .datetime()
    .openapi({ example: '2026-06-05T03:20:00.000Z' }),
  unboundAt: z
    .string()
    .datetime()
    .optional()
    .openapi({ example: '2026-06-05T03:20:00.000Z' }),
  enrolled: z.boolean().openapi({ example: true }),
});

export type FrequencysResponseDto = z.infer<typeof FrequencysResponseDto>;
