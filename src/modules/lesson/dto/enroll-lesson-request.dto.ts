import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const EnrollLessonRequestDto = z
  .object({
    student_id: z.coerce.number().int().positive().openapi({ example: 5 }),
  })
  .openapi('EnrollLessonRequestDto');

export type EnrollLessonRequestDto = z.infer<typeof EnrollLessonRequestDto>;
