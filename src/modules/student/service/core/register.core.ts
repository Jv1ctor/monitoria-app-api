import { type Major, Role, type User } from '@/generated/prisma/browser';
import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';
import type { UserRepositoryPort } from '@/modules/user/interfaces/user-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { AcademicProfileRepositoryPort } from '../../../user/interfaces/academic-profile-repository.port';
import type { RegisterStudantDto } from '../../dto/register-student.dto';

export const register =
  (deps: {
    userRepo: UserRepositoryPort;
    majorRepo: MajorRepositoryPort;
    profileRepo: AcademicProfileRepositoryPort;
  }) =>
  async (data: RegisterStudantDto): Promise<{ user: User; major: Major }> => {
    const { profileRepo, userRepo, majorRepo } = deps;

    const existRegistration = await userRepo.findByRegistration(
      data.registration,
    );
    if (existRegistration) {
      throw new ConflictError({ message: 'Matrícula já cadastrada' });
    }

    const existEmail = await userRepo.findByEmail(data.email);
    if (existEmail) {
      throw new ConflictError({ message: 'Email já cadastrada' });
    }

    const major = await majorRepo.findById(data.major_id);
    if (!major) {
      throw new NotFoundError({ message: 'Não foi possivel encontrar curso' });
    }

    const user = await userRepo.create({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      registration: data.registration,
      password: data.password,
      role: Role.STUDENT,
    });
    await profileRepo.create({
      user: { connect: user },
      major: { connect: major },
    });

    return { user: user, major: major };
  };
