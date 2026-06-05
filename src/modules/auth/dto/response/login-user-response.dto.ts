import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const LoginUserResponseDto = z.object({
  token: z.string(),
});

export type LoginUserResponseDto = z.infer<typeof LoginUserResponseDto>;
