import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const LoginUserRequestDto = z.object({
  registration: z
    .string()
    .regex(/^\d{7}$/, 'A matricula deve conter exatamente 7 numeros')
    .nonempty(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type LoginUserRequestDto = z.infer<typeof LoginUserRequestDto>;
