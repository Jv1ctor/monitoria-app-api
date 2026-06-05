import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const UpdateSubjectDto = z.object({
  code: z
    .string()
    .min(1, 'Codigo da disciplina e obrigatorio')
    .openapi({ example: 'CS102' })
    .optional(),
  name: z
    .string()
    .min(1, 'Nome da disciplina e obrigatorio')
    .openapi({ example: 'Calculo I' })
    .optional(),
  major_id: z.coerce
    .number()
    .int()
    .positive()
    .openapi({ example: 1 })
    .optional(),
});

export type UpdateSubjectDto = z.infer<typeof UpdateSubjectDto>;
