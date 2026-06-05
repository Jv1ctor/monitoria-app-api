import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { SubjectDto } from '../../dto/subject.dto';
import type { UpdateSubjectDto } from '../../dto/update-subject.dto';
import type { SubjectRepositoryPort } from '../../interfaces/subject-repository.port';

export const update =
  (deps: { repository: SubjectRepositoryPort }) =>
  async (id: number, input: UpdateSubjectDto): Promise<SubjectDto> => {
    const { repository } = deps;

    const existing = await repository.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'disciplina nao encontrada' });
    }

    const subject = await repository.update(id, {
      ...(input.code !== undefined && { code: input.code }),
      ...(input.name !== undefined && { name: input.name }),
      ...(input.major_id !== undefined && {
        major: { connect: { id: input.major_id } },
      }),
    });

    return {
      id: subject.id,
      code: subject.code,
      name: subject.name,
      major_id: subject.major_id,
      createdAt: subject.created_at,
    };
  };
