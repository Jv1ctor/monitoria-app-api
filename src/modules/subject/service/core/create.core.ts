import { ConflictError } from '@/shared/handle-error/errors/conflict.error';

import type { CreateSubjectDto } from '../../dto/create-subject.dto';
import type { SubjectDto } from '../../dto/subject.dto';
import type { SubjectRepositoryPort } from '../../interfaces/subject-repository.port';

export const create =
  (deps: { repository: SubjectRepositoryPort }) =>
  async (input: CreateSubjectDto): Promise<SubjectDto> => {
    const { repository } = deps;

    const exist = await repository.findByCode(input.code);

    if (exist) {
      throw new ConflictError({ message: 'Disciplina já cadastrada' });
    }

    const subject = await repository.create({
      code: input.code,
      name: input.name,
      major: { connect: { id: input.major_id } },
    });

    return {
      id: subject.id,
      code: subject.code,
      name: subject.name,
      major_id: subject.major_id,
      createdAt: subject.created_at,
    };
  };
