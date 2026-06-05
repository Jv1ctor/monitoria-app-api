import z from 'zod';

import { Role } from '@/generated/prisma/enums';

export const PayloadJwtDto = z.object({
  user_id: z.int().positive(),
  role: z.enum(Role),
  name: z.string(),
});

export type PayloadJwtDto = z.infer<typeof PayloadJwtDto>;
