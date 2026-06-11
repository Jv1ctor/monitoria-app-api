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
  student: z
    .object({
      id: z.number().int().positive(),
      first_name: z.string(),
      last_name: z.string(),
      registration: z.string(),
    })
    .optional()
    .openapi({
      example: {
        id: 5,
        first_name: 'Maria',
        last_name: 'Silva',
        registration: '2422074',
      },
    }),
  lesson: z
    .object({
      id: z.number().int().positive(),
      modality: z.string(),
      date_time: z.string().datetime(),
      description: z.string().nullable(),
      class_id: z.number().int().positive(),
      createdAt: z.string().datetime(),
      class: z
        .object({
          id: z.number().int().positive(),
          code: z.string(),
          subject: z
            .object({
              id: z.number().int().positive(),
              name: z.string(),
            })
            .optional(),
          monitor: z
            .object({
              id: z.number().int().positive(),
              first_name: z.string(),
              last_name: z.string(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional()
    .openapi({
      example: {
        id: 1,
        modality: 'REMOTE',
        date_time: '2026-06-10T14:00:00.000Z',
        description: 'Aula sobre vetores',
        class_id: 1,
        createdAt: '2026-06-05T03:20:00.000Z',
        class: {
          id: 1,
          code: 'CS101-T1',
          subject: { id: 1, name: 'Computer Science' },
          monitor: { id: 2, first_name: 'John', last_name: 'Doe' },
        },
      },
    }),
});

export type FrequencysResponseDto = z.infer<typeof FrequencysResponseDto>;
