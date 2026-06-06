import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { MajorDto } from '../../dto/major.dto';
import type { MajorRepositoryPort } from '../../interfaces/major-repository.port';

export const remove =
  (deps: {
    majorRepo: MajorRepositoryPort;
    profileRepo: AcademicProfileRepositoryPort;
  }) =>
  async (id: number): Promise<MajorDto> => {
    const { majorRepo, profileRepo } = deps;

    const existingMajor = await majorRepo.findById(id);

    if (!existingMajor) {
      throw new NotFoundError({ message: 'curso nao encontrado' });
    }

    const majorInUse = await profileRepo.majorInUse(id);

    if (majorInUse) {
      throw new ConflictError({ message: 'curso em uso' });
    }

    const major = await majorRepo.remove(id);

    return {
      id: major.id,
      name: major.name,
      createdAt: major.created_at,
    };
  };
