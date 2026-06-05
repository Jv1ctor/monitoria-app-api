import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import {
  AllowedTypes,
  AllowedTypesValues,
} from '@/shared/storage/enum/allowed-types.enum';

extendZodWithOpenApi(z);

export const CreateUploadUrlRequestDto = z.object({
  file_name: z
    .string()
    .trim()
    .min(1, 'Nome do arquivo é obrigatório')
    .max(255, 'Nome do arquivo muito grande')
    .openapi({ example: 'exercice_1.pdf' }),

  contentType: z
    .enum(AllowedTypesValues)
    .openapi({ example: AllowedTypes.PDF }),

  size: z
    .number()
    .int()
    .positive()
    .max(20 * 1024 * 1024, 'O arquivo não pode exceder 20 MB')
    .openapi({ example: 1_000_000 }),

  description: z.string().optional().openapi({ example: 'Lista da aula 1' }),

  class_id: z.coerce.number().int().positive().openapi({ example: 1 }),
});

export type CreateUploadUrlRequestDto = z.infer<
  typeof CreateUploadUrlRequestDto
>;
