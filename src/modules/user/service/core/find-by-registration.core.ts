import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { UserDto } from '../../dto/user.dto';
import type { UserRepositoryPort } from '../../interfaces/user-repository.port';

export const findByRegistration =
  (deps: { repository: UserRepositoryPort }) =>
  async (registration: string): Promise<UserDto | null> => {
    const { repository } = deps;

    const user = await repository.findByRegistration(registration);

    if (!user) {
      throw new NotFoundError({ message: 'not found user' });
    }

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      registration: user.registration,
      createdAt: user.created_at,
      majorId: user.major_id,
      role: user.role,
    };
  };
