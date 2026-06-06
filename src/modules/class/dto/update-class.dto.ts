import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const UpdateClassDto = z.object({
  code: z
    .string()
    .min(1, 'Codigo da turma e obrigatorio')
    .openapi({ example: 'CS101-T2' })
    .optional(),
  monitor_id: z.coerce
    .number()
    .int()
    .positive()
    .openapi({ example: 2 })
    .optional(),
  subject_id: z.coerce
    .number()
    .int()
    .positive()
    .openapi({ example: 1 })
    .optional(),
});

export type UpdateClassDto = z.infer<typeof UpdateClassDto>;
