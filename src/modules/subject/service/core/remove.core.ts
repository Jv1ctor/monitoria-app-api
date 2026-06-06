import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { SubjectDto } from '../../dto/subject.dto';
import type { SubjectRepositoryPort } from '../../interfaces/subject-repository.port';

export const remove =
  (deps: {
    subjectRepo: SubjectRepositoryPort;
    classRepo: ClassRepositoryPort;
  }) =>
  async (id: number): Promise<SubjectDto> => {
    const { subjectRepo, classRepo } = deps;

    const existing = await subjectRepo.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'disciplina nao encontrada' });
    }

    const subjectInUse = await classRepo.subjectInUse(id);

    if (subjectInUse) {
      throw new ConflictError({ message: 'disciplina em uso' });
    }

    const subject = await subjectRepo.remove(id);

    return {
      id: subject.id,
      code: subject.code,
      name: subject.name,
      major_id: subject.major_id,
      createdAt: subject.created_at,
    };
  };
