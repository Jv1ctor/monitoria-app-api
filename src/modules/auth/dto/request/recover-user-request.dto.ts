import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const RecoverUserRequestDto = z.object({
  email: z
    .string()
    .min(1, 'E-mail e obrigatorio')
    .email('Insira um e-mail institucional valido')
    .refine(
      email => email.endsWith('@edu.unifor.br') || email.endsWith('@unifor.br'),
      {
        message: 'Utilize seu e-mail da Unifor (@edu.unifor.br)',
      },
    ),
});

export type RecoverUserRequestDto = z.infer<typeof RecoverUserRequestDto>;
