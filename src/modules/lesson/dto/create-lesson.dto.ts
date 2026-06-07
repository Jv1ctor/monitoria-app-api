import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { Modality } from '@/generated/prisma/enums';

extendZodWithOpenApi(z);

export const CreateLessonDto = z.object({
  modality: z.enum(Modality).openapi({ example: 'REMOTE' }),
  date_time: z
    .string()
    .datetime({ message: 'Data e hora invalidas' })
    .openapi({ example: '2026-06-10T14:00:00.000Z' }),
  description: z.string().optional().openapi({ example: 'Aula sobre vetores' }),
  class_id: z.coerce
    .number()
    .int()
    .positive('Turma invalida')
    .openapi({ example: 1 }),
});

export type CreateLessonDto = z.infer<typeof CreateLessonDto>;
