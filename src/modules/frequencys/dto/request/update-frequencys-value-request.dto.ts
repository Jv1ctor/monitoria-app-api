import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const UpdateFrequencysValueRequestDto = z
  .object({
    value: z.boolean().openapi({ example: true }),
  })
  .openapi('UpdateFrequencysValueRequestDto');

export type UpdateFrequencysValueRequestDto = z.infer<
  typeof UpdateFrequencysValueRequestDto
>;
