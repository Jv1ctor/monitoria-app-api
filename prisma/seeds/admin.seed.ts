import { Role, type PrismaClient } from '../../src/generated/prisma/client';
import type { GlobalOmitConfig } from '../../src/generated/prisma/internal/prismaNamespace';
import { logger } from '../../src/shared/logger';
import type { DefaultArgs } from '@prisma/client/runtime/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { getRandomValues, randomInt } from 'node:crypto';
import z from 'zod';

export const UserSchema = z.object({
  registration: z
    .string()
    .regex(/^\d{7}$/, 'A matricula deve conter 7 numeros'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  email: z
    .string()
    .min(1, 'E-mail e obrigatorio')
    .email('Insira um e-mail valido'),
});

export const adminSeed = async (
  prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs>,
) => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const registration =
    process.env.ADMIN_REGISTRATION ||
    randomInt(0, 10000000).toString().padStart(7, '0');

  const { success, data, error } = await UserSchema.safeParseAsync({
    email,
    registration,
    password,
  });

  if (!success) {
    logger.error(error.message);
    return;
  }

  const exist = await prisma.user.findFirst({
    where: { OR: [{ registration: data.registration }, { email: data.email }] },
  });

  if (exist) {
    logger.warn('Usuario já registrado');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = await prisma.user.create({
    data: {
      first_name: 'Admin',
      last_name: 'Default',
      password: hashedPassword,
      email: data.email,
      registration: data.registration,
      role: Role.ADMIN,
    },
    select: {
      first_name: true,
      last_name: true,
      registration: true,
      role: true,
    },
  });

  logger.info('Admin criado!');
  logger.info(user);
};
