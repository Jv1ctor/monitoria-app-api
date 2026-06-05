import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { MajorDto } from '../../dto/major.dto';
import type { MajorRepositoryPort } from '../../interfaces/major-repository.port';

export const findByName =
  (deps: { repository: MajorRepositoryPort }) =>
  async (name: string): Promise<MajorDto> => {
    const { repository } = deps;

    const major = await repository.findByName(name);

    if (!major) {
      throw new NotFoundError({ message: 'curso nao encontrado' });
    }

    return {
      id: major.id,
      name: major.name,
      createdAt: major.created_at,
    };
  };
