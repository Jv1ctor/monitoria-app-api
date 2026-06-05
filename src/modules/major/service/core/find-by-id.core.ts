import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { MajorDto } from '../../dto/major.dto';
import type { MajorRepositoryPort } from '../../interfaces/major-repository.port';

export const findById =
  (deps: { repository: MajorRepositoryPort }) =>
  async (id: number): Promise<MajorDto> => {
    const { repository } = deps;

    const major = await repository.findById(id);

    if (!major) {
      throw new NotFoundError({ message: 'curso nao encontrado' });
    }

    return {
      id: major.id,
      name: major.name,
      createdAt: major.created_at,
    };
  };
