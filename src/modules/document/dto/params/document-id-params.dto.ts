import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const DocumentIdParamsDto = z.object({
  id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type DocumentIdParamsDto = z.infer<typeof DocumentIdParamsDto>;
