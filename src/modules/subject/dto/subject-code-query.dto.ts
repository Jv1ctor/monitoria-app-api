import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const SubjectCodeQueryDto = z.object({
  code: z.string().min(1, 'Codigo da disciplina e obrigatorio').openapi({
    example: 'CS101',
  }),
});

export type SubjectCodeQueryDto = z.infer<typeof SubjectCodeQueryDto>;
