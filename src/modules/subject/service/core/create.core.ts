import type { MajorRepositoryPort } from '@/modules/major/interfaces/major-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { CreateSubjectDto } from '../../dto/create-subject.dto';
import type { SubjectDto } from '../../dto/subject.dto';
import type { SubjectRepositoryPort } from '../../interfaces/subject-repository.port';

export const create =
  (deps: {
    subjectRepo: SubjectRepositoryPort;
    majorRepo: MajorRepositoryPort;
  }) =>
  async (input: CreateSubjectDto): Promise<SubjectDto> => {
    const { majorRepo, subjectRepo } = deps;

    const exist = await subjectRepo.findByCode(input.code);

    if (exist) {
      throw new ConflictError({ message: 'Disciplina já cadastrada' });
    }

    const existMajor = await majorRepo.findById(input.major_id);

    if (!existMajor) {
      throw new NotFoundError({ message: 'Curso no encontrado' });
    }

    const subject = await subjectRepo.create({
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
