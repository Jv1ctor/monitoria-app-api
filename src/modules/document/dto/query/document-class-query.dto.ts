import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const DocumentClassQueryDto = z.object({
  class_id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type DocumentClassQueryDto = z.infer<typeof DocumentClassQueryDto>;
