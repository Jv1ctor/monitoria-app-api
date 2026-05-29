import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const CreateMajorDto = z.object({
  name: z.string().min(1, 'Nome do curso e obrigatorio'),
});

export type CreateMajorDto = z.infer<typeof CreateMajorDto>;
