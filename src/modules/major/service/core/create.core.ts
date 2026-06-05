import { ConflictError } from '@/shared/handle-error/errors/conflict.error';

import type { CreateMajorDto } from '../../dto/create-major.dto';
import type { MajorDto } from '../../dto/major.dto';
import type { MajorRepositoryPort } from '../../interfaces/major-repository.port';

export const create =
  (deps: { repository: MajorRepositoryPort }) =>
  async (input: CreateMajorDto): Promise<MajorDto> => {
    const { repository } = deps;

    const exist = await repository.findByName(input.name);

    if (exist) {
      throw new ConflictError({ message: 'Curso já cadastrado' });
    }

    const major = await repository.create({
      name: input.name,
    });

    return {
      id: major.id,
      name: major.name,
      createdAt: major.created_at,
    };
  };
