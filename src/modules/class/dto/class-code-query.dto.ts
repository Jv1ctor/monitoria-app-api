import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const ClassCodeQueryDto = z.object({
  code: z.string().min(1, 'Codigo da turma e obrigatorio').openapi({
    example: 'CS101-T1',
  }),
});

export type ClassCodeQueryDto = z.infer<typeof ClassCodeQueryDto>;
