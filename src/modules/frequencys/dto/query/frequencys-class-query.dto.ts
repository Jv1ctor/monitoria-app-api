import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const FrequencysClassQueryDto = z.object({
  class_id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type FrequencysClassQueryDto = z.infer<typeof FrequencysClassQueryDto>;
