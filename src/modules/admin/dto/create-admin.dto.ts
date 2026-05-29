import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const CreateAdminDto = z.object({
  registration: z
    .string()
    .regex(/^\d{10}$/, 'A matricula deve conter 10 numeros')
    .nonempty()
    .nonoptional(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
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
  first_name: z.string().min(1, 'Primeiro nome e obrigatorio'),
  last_name: z.string().min(1, 'Sobrenome e obrigatorio'),
});
