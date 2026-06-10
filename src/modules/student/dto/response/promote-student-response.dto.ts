import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { Role } from '@/generated/prisma/enums';

extendZodWithOpenApi(z);

export const PromoteStudentResponseDto = z
  .object({
    id: z.number().int().positive().openapi({ example: 1 }),
    registration: z.string().openapi({ example: '2026101' }),
    email: z.email().openapi({ example: 'user@example.com' }),
    first_name: z.string().openapi({ example: 'João' }),
    last_name: z.string().openapi({ example: 'Silva' }),
    role: z.enum(Role).openapi({ example: Role.MONITOR }),
    createdAt: z
      .string()
      .datetime()
      .openapi({ example: '2026-06-07T03:20:00.000Z' }),
  })
  .openapi('PromoteStudentResponseDto');

export type PromoteStudentResponseDto = z.infer<
  typeof PromoteStudentResponseDto
>;
