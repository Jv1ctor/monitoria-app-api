import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { Modality } from '@/generated/prisma/enums';

extendZodWithOpenApi(z);

export const UpdateLessonDto = z.object({
  modality: z.enum(Modality).optional().openapi({ example: 'INPERSON' }),
  date_time: z
    .string()
    .datetime({ message: 'Data e hora invalidas' })
    .optional()
    .openapi({ example: '2026-06-10T14:00:00.000Z' }),
  description: z
    .string()
    .optional()
    .openapi({ example: 'Aula sobre matrizes' }),
  class_id: z.coerce
    .number()
    .int()
    .positive('Turma invalida')
    .optional()
    .openapi({ example: 1 }),
});

export type UpdateLessonDto = z.infer<typeof UpdateLessonDto>;
