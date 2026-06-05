import type { User } from '@/generated/prisma/browser';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<User, 'id' | 'registration' | 'role'>;
    }
  }
}
