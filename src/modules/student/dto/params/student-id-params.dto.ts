import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const StudentIdParamsDto = z
  .object({
    id: z.coerce.number().int().positive().openapi({ example: 1 }),
  })
  .openapi('StudentIdParamsDto');

export type StudentIdParamsDto = z.infer<typeof StudentIdParamsDto>;
