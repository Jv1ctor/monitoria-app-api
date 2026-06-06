import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { SubjectDto } from '../../dto/subject.dto';
import type { SubjectRepositoryPort } from '../../interfaces/subject-repository.port';

export const findById =
  (deps: { subjectRepo: SubjectRepositoryPort }) =>
  async (id: number): Promise<SubjectDto> => {
    const { subjectRepo } = deps;

    const subject = await subjectRepo.findById(id);

    if (!subject) {
      throw new NotFoundError({ message: 'disciplina nao encontrada' });
    }

    return {
      id: subject.id,
      code: subject.code,
      name: subject.name,
      major_id: subject.major_id,
      createdAt: subject.created_at,
    };
  };
