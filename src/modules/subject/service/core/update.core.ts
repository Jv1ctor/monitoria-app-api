import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { SubjectDto } from '../../dto/subject.dto';
import type { UpdateSubjectDto } from '../../dto/update-subject.dto';
import type { SubjectRepositoryPort } from '../../interfaces/subject-repository.port';

export const update =
  (deps: {
    subjectRepo: SubjectRepositoryPort;
    majorRepo: MajorRepositoryPort;
  }) =>
  async (id: number, input: UpdateSubjectDto): Promise<SubjectDto> => {
    const { subjectRepo, majorRepo } = deps;

    const existing = await subjectRepo.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'disciplina nao encontrada' });
    }

    if (input.code) {
      const existSubjectByCode = await subjectRepo.findByCode(input.code);

      if (existSubjectByCode) {
        throw new ConflictError({ message: 'codigo já utilizado' });
      }
    }

    if (input.major_id) {
      const existMajor = await majorRepo.findById(input.major_id);

      if (!existMajor) {
        throw new NotFoundError({ message: 'curso não existe' });
      }
    }

    const subject = await subjectRepo.update(id, {
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
