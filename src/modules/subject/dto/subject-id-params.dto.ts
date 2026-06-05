import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const SubjectIdParameterDto = z.object({
  id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type SubjectIdParameterDto = z.infer<typeof SubjectIdParameterDto>;
