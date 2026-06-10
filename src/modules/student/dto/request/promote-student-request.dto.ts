import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const PromoteStudentRequestDto = z
  .object({
    subject_id: z.coerce.number().int().positive().openapi({ example: 1 }),
  })
  .openapi('PromoteStudentRequestDto');

export type PromoteStudentRequestDto = z.infer<typeof PromoteStudentRequestDto>;
