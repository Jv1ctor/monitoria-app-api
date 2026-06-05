import z from 'zod';

export const RegisterStudantDto = z.object({
  registration: z.string(),
  password: z.string(),
  email: z.email(),
  first_name: z.string(),
  major_id: z.int().positive(),
  last_name: z.string(),
});

export type RegisterStudantDto = z.infer<typeof RegisterStudantDto>;
