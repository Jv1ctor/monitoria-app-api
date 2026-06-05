import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const RegisterUserResponseDto = z.object({
  registration: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  major: z.string(),
});

export type RegisterUserResponseDto = z.infer<typeof RegisterUserResponseDto>;
