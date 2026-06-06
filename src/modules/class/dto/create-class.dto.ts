import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const CreateClassDto = z.object({
  code: z
    .string()
    .min(1, 'Codigo da turma e obrigatorio')
    .openapi({ example: 'CS101-T1' }),
  monitor_id: z.coerce.number().int().positive().openapi({ example: 2 }),
  subject_id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type CreateClassDto = z.infer<typeof CreateClassDto>;
