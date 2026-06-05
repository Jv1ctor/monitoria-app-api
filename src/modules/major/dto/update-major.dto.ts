import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const UpdateMajorDto = z.object({
  name: z
    .string()
    .min(1, 'Nome do curso e obrigatorio')
    .openapi({ example: 'Engenharia de Software' }),
});

export type UpdateMajorDto = z.infer<typeof UpdateMajorDto>;
