import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { LessonRepositoryPort } from '@/modules/lesson/interfaces/lesson-repository.port';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { FrequencysResponseDto } from '../../dto/response/frequencys-response.dto';
import type { FrequencysRepositoryPort } from '../../interfaces/frequencys-repository.port';
import type { AuthoredUser } from '../../interfaces/frequencys-service.port';

export const remove =
  (deps: {
    frequencysRepo: FrequencysRepositoryPort;
    lessonRepo: LessonRepositoryPort;
    classRepo: ClassRepositoryPort;
  }) =>
  async (id: number, user: AuthoredUser): Promise<FrequencysResponseDto> => {
    const { frequencysRepo, lessonRepo, classRepo } = deps;

    const existing = await frequencysRepo.findById(id);
    if (!existing) {
      throw new NotFoundError({ message: 'Frequencia nao encontrada' });
    }

    if (user.role === 'STUDENT') {
      throw new ForbiddenError({
        message: 'Aluno nao pode remover frequencia',
      });
    }

    if (user.role === 'MONITOR') {
      const lesson = await lessonRepo.findById(existing.lesson_id);
      if (!lesson) {
        throw new NotFoundError({ message: 'Aula nao encontrada' });
      }
      const cls = await classRepo.findById(lesson.class_id);
      if (!cls || cls.monitor_id !== user.id) {
        throw new ForbiddenError({
          message: 'Monitor so pode remover frequencias das proprias turmas',
        });
      }
    }

    const removed = await frequencysRepo.remove(id);

    const lesson = await lessonRepo.findById(removed.lesson_id);
    const classId = lesson?.class_id ?? 0;
    const enrolled = classId
      ? await frequencysRepo.isEnrolled(classId, removed.student_id)
      : false;

    return {
      id: removed.id,
      status: removed.status,
      value: removed.value,
      student_id: removed.student_id,
      lesson_id: removed.lesson_id,
      createdAt: removed.created_at.toISOString(),
      unboundAt: removed.unbound_at?.toISOString() ?? undefined,
      enrolled,
    };
  };
