import type { Role } from '@/generated/prisma/enums';
import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';
import { UnauthorizedError } from '@/shared/handle-error/errors/unauthorized.error';

import type { AcademicProfileRepositoryPort } from '../../interfaces/academic-profile-repository.port';
import type { UserRepositoryPort } from '../../interfaces/user-repository.port';
import type { MeResponse } from '../../interfaces/user-service.port';

export const getMe =
  (deps: {
    userRepo: UserRepositoryPort;
    profileRepo: AcademicProfileRepositoryPort;
    majorRepo: MajorRepositoryPort;
  }) =>
  async (userId: number, role: Role): Promise<MeResponse> => {
    const { userRepo, profileRepo, majorRepo } = deps;

    const user = await userRepo.findById(userId);

    if (!user) {
      throw new NotFoundError({ message: 'Usuário não encontrado' });
    }

    if (user.role !== role) {
      throw new UnauthorizedError({ message: 'Token Inválido' });
    }

    if (user.role === 'ADMIN') {
      return {
        id: user.id,
        registration: user.registration,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        createdAt: user.created_at,
        academicProfile: undefined,
      };
    }

    const profile = await profileRepo.findByUserIdWithClasses(userId);
    const major = profile
      ? await majorRepo.findById(profile.major_id)
      : undefined;

    const classes =
      user.role === 'MONITOR' && profile
        ? profile.classes.map(c => ({
            id: c.id,
            code: c.code,
            subject_id: c.subject_id,
          }))
        : undefined;

    return {
      id: user.id,
      registration: user.registration,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      createdAt: user.created_at,
      academicProfile: profile
        ? {
            major: major ? { id: major.id, name: major.name } : undefined,
            classes,
          }
        : undefined,
    };
  };
