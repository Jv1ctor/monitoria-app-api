import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const RegisterUserRequestDto = z.object({
  registration: z
    .string()
    .regex(/^\d{7}$/, 'A matricula deve conter 7 numeros')
    .nonempty()
    .nonoptional()
    .openapi({ example: '1234567' }),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .openapi({ example: 'senha123' }),
  email: z
    .string()
    .min(1, 'E-mail e obrigatorio')
    .email('Insira um e-mail valido')
    .openapi({ example: 'example@example.com' }),
  first_name: z
    .string()
    .min(1, 'Primeiro nome e obrigatorio')
    .openapi({ example: 'lucas' }),
  last_name: z
    .string()
    .min(1, 'Sobrenome e obrigatorio')
    .openapi({ example: 'silva' }),
  major_name: z
    .string()
    .nonempty()
    .nonoptional({ error: 'Curso invalido' })
    .openapi({ example: 'Ciência da computação' }),
});

export type RegisterUserRequestDto = z.infer<typeof RegisterUserRequestDto>;
