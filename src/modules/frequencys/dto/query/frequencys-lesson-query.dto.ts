import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const FrequencysLessonQueryDto = z.object({
  lesson_id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type FrequencysLessonQueryDto = z.infer<typeof FrequencysLessonQueryDto>;
