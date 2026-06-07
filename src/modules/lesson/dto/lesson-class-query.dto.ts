import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const LessonClassQueryDto = z.object({
  class_id: z.coerce
    .number()
    .int()
    .positive('Turma invalida')
    .openapi({ example: 1 }),
});

export type LessonClassQueryDto = z.infer<typeof LessonClassQueryDto>;
