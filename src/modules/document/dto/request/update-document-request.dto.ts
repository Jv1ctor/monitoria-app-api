import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const UpdateDocumentRequestDto = z
  .object({
    description: z
      .string()
      .trim()
      .max(500, 'Descricao muito grande')
      .nullable()
      .openapi({ example: 'Lista da aula 1' })
      .optional(),
  })
  .openapi('UpdateDocumentRequestDto');

export type UpdateDocumentRequestDto = z.infer<typeof UpdateDocumentRequestDto>;
