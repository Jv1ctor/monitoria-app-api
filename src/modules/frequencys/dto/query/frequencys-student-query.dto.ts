import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const FrequencysStudentQueryDto = z.object({
  student_id: z.coerce.number().int().positive().openapi({ example: 5 }),
});

export type FrequencysStudentQueryDto = z.infer<
  typeof FrequencysStudentQueryDto
>;
