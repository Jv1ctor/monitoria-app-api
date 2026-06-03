import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const RecoverUserRequestDto = z.object({
  email: z
    .string()
    .min(1, 'E-mail e obrigatorio')
    .email('Insira um e-mail valido')
    .openapi({ example: 'example@example.com' }),
});

export type RecoverUserRequestDto = z.infer<typeof RecoverUserRequestDto>;
