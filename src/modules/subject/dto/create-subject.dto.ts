import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const CreateSubjectDto = z.object({
  code: z
    .string()
    .min(1, 'Codigo da disciplina e obrigatorio')
    .openapi({ example: 'CS101' }),
  name: z
    .string()
    .min(1, 'Nome da disciplina e obrigatorio')
    .openapi({ example: 'Introducao a Computacao' }),
  major_id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type CreateSubjectDto = z.infer<typeof CreateSubjectDto>;
