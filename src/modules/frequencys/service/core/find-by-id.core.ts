import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { LessonRepositoryPort } from '@/modules/lesson/interfaces/lesson-repository.port';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { FrequencysResponseDto } from '../../dto/response/frequencys-response.dto';
import type { FrequencysRepositoryPort } from '../../interfaces/frequencys-repository.port';
import type { AuthoredUser } from '../../interfaces/frequencys-service.port';

export const findById =
  (deps: {
    frequencysRepo: FrequencysRepositoryPort;
    lessonRepo: LessonRepositoryPort;
    classRepo: ClassRepositoryPort;
  }) =>
  async (id: number, user: AuthoredUser): Promise<FrequencysResponseDto> => {
    const { frequencysRepo, lessonRepo, classRepo } = deps;

    const frequencys = await frequencysRepo.findById(id);

    if (!frequencys) {
      throw new NotFoundError({ message: 'Frequencia nao encontrada' });
    }

    if (user.role === 'STUDENT' && frequencys.student_id !== user.id) {
      throw new ForbiddenError({
        message: 'Aluno so pode ver a propria frequencia',
      });
    }

    if (user.role === 'MONITOR') {
      const lesson = await lessonRepo.findById(frequencys.lesson_id);
      if (!lesson) {
        throw new NotFoundError({ message: 'Aula nao encontrada' });
      }
      const cls = await classRepo.findById(lesson.class_id);
      if (!cls || cls.monitor_id !== user.id) {
        throw new ForbiddenError({
          message: 'Monitor so pode ver frequencias das proprias turmas',
        });
      }
    }

    const lesson = await lessonRepo.findById(frequencys.lesson_id);
    const classId = lesson?.class_id ?? 0;
    const enrolled = classId
      ? await frequencysRepo.isEnrolled(classId, frequencys.student_id)
      : false;

    return {
      id: frequencys.id,
      status: frequencys.status,
      value: frequencys.value,
      student_id: frequencys.student_id,
      lesson_id: frequencys.lesson_id,
      createdAt: frequencys.created_at.toISOString(),
      unboundAt: frequencys.unbound_at?.toISOString() ?? undefined,
      enrolled,
    };
  };
