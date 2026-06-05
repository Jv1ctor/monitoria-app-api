import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const MajorNameQueryDto = z.object({
  name: z.string().min(1, 'Nome do curso e obrigatorio').openapi({
    example: 'Ciencia da Computacao',
  }),
});

export type MajorNameQueryDto = z.infer<typeof MajorNameQueryDto>;
