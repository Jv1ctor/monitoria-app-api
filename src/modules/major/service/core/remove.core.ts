import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { MajorDto } from '../../dto/major.dto';
import type { MajorRepositoryPort } from '../../interfaces/major-repository.port';

export const remove =
  (deps: { repository: MajorRepositoryPort }) =>
  async (id: number): Promise<MajorDto> => {
    const { repository } = deps;

    const existingMajor = await repository.findById(id);

    if (!existingMajor) {
      throw new NotFoundError({ message: 'not found major' });
    }

    const major = await repository.remove(id);

    return {
      id: major.id,
      name: major.name,
      createdAt: major.created_at,
    };
  };
