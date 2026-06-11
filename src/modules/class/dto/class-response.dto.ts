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
  subject: z
    .object({
      id: z.number().int().positive(),
      name: z.string(),
      code: z.string(),
    })
    .optional()
    .openapi({
      example: { id: 1, name: 'Computer Science', code: 'CS101' },
    }),
  monitor: z
    .object({
      id: z.number().int().positive(),
      first_name: z.string(),
      last_name: z.string(),
    })
    .optional()
    .openapi({
      example: { id: 2, first_name: 'John', last_name: 'Doe' },
    }),
});

export type ClassResponseDto = z.infer<typeof ClassResponseDto>;
