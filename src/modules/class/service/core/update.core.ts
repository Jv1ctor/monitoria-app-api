import type { SubjectRepositoryPort } from '@/modules/subject/interfaces/subject-repository.port';
import type { AcademicProfileRepositoryPort } from '@/modules/user/interfaces/academic-profile-repository.port';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { ClassDto } from '../../dto/class.dto';
import type { UpdateClassDto } from '../../dto/update-class.dto';
import type { ClassRepositoryPort } from '../../interfaces/class-repository.port';

export const update =
  (deps: {
    classRepo: ClassRepositoryPort;
    subjectRepo: SubjectRepositoryPort;
    profileRepo: AcademicProfileRepositoryPort;
  }) =>
  async (id: number, input: UpdateClassDto): Promise<ClassDto> => {
    const { classRepo, subjectRepo, profileRepo } = deps;

    const existing = await classRepo.findById(id);

    if (!existing) {
      throw new NotFoundError({ message: 'turma nao encontrada' });
    }

    if (input.code) {
      const existClassByCode = await classRepo.findByCode(input.code);

      if (existClassByCode) {
        throw new ConflictError({ message: 'codigo já utilizado' });
      }
    }

    if (input.subject_id) {
      const existSubject = await subjectRepo.findById(input.subject_id);

      if (!existSubject) {
        throw new NotFoundError({ message: 'disciplina não existe' });
      }
    }

    if (input.monitor_id) {
      const existMonitor = await profileRepo.findByUserId(input.monitor_id, {
        role: 'MONITOR',
      });

      if (!existMonitor) {
        throw new NotFoundError({ message: 'Monitor não existe' });
      }
    }

    const classEntity = await classRepo.update(id, {
      ...(input.code !== undefined && { code: input.code }),
      ...(input.monitor_id !== undefined && {
        monitor: { connect: { user_id: input.monitor_id } },
      }),
      ...(input.subject_id !== undefined && {
        subject: { connect: { id: input.subject_id } },
      }),
    });

    return {
      id: classEntity.id,
      code: classEntity.code,
      monitor_id: classEntity.monitor_id,
      subject_id: classEntity.subject_id,
      createdAt: classEntity.created_at,
    };
  };
