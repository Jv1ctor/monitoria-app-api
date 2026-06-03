import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const RecoverUserResponseDto = z.object({
  message: z.string(),
});

export type RecoverUserResponseDto = z.infer<typeof RecoverUserResponseDto>;
