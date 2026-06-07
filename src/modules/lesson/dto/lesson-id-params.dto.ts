import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const LessonIdParameterDto = z.object({
  id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type LessonIdParameterDto = z.infer<typeof LessonIdParameterDto>;
