import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const FrequencysIdParamsDto = z.object({
  id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type FrequencysIdParamsDto = z.infer<typeof FrequencysIdParamsDto>;
