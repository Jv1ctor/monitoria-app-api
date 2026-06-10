import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { Role } from '@/generated/prisma/enums';

extendZodWithOpenApi(z);

export const MeResponseDto = z
  .object({
    id: z.number().int().positive().openapi({ example: 1 }),
    registration: z.string().openapi({ example: '2026101' }),
    email: z.email().openapi({ example: 'user@example.com' }),
    first_name: z.string().openapi({ example: 'João' }),
    last_name: z.string().openapi({ example: 'Silva' }),
    role: z.enum(Role).openapi({ example: Role.STUDENT }),
    createdAt: z
      .string()
      .datetime()
      .openapi({ example: '2026-06-07T03:20:00.000Z' }),
    academicProfile: z
      .object({
        major: z
          .object({
            id: z.number().int().positive().openapi({ example: 1 }),
            name: z.string().openapi({ example: 'Ciência da Computação' }),
          })
          .optional(),
        classes: z
          .array(
            z.object({
              id: z.number().int().positive().openapi({ example: 1 }),
              code: z.string().openapi({ example: 'CS101-T1' }),
              subject_id: z.number().int().positive().openapi({ example: 1 }),
            }),
          )
          .optional(),
      })
      .optional(),
  })
  .openapi('MeResponseDto');

export type MeResponseDto = z.infer<typeof MeResponseDto>;
