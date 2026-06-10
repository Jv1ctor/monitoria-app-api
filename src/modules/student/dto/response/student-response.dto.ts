import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { Role } from '@/generated/prisma/enums';

extendZodWithOpenApi(z);

export const StudentResponseDto = z
  .object({
    id: z.number().int().positive().openapi({ example: 1 }),
    registration: z.string().openapi({ example: '2026101' }),
    email: z.email().openapi({ example: 'student@example.com' }),
    first_name: z.string().openapi({ example: 'Maria' }),
    last_name: z.string().openapi({ example: 'Souza' }),
    role: z.enum(Role).openapi({ example: Role.STUDENT }),
    createdAt: z
      .string()
      .datetime()
      .openapi({ example: '2026-06-07T03:20:00.000Z' }),
  })
  .openapi('StudentResponseDto');

export type StudentResponseDto = z.infer<typeof StudentResponseDto>;
