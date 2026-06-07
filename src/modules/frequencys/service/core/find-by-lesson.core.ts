import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { LessonRepositoryPort } from '@/modules/lesson/interfaces/lesson-repository.port';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { FrequencysResponseDto } from '../../dto/response/frequencys-response.dto';
import type { FrequencysRepositoryPort } from '../../interfaces/frequencys-repository.port';
import type { AuthoredUser } from '../../interfaces/frequencys-service.port';

export const findByLesson =
  (deps: {
    frequencysRepo: FrequencysRepositoryPort;
    lessonRepo: LessonRepositoryPort;
    classRepo: ClassRepositoryPort;
  }) =>
  async (
    lessonId: number,
    user: AuthoredUser,
  ): Promise<FrequencysResponseDto[]> => {
    const { frequencysRepo, lessonRepo, classRepo } = deps;

    const lesson = await lessonRepo.findById(lessonId);
    if (!lesson) {
      throw new NotFoundError({ message: 'Aula nao encontrada' });
    }

    const cls = await classRepo.findById(lesson.class_id);
    if (!cls) {
      throw new NotFoundError({ message: 'Turma nao encontrada' });
    }

    if (user.role === 'MONITOR' && cls.monitor_id !== user.id) {
      throw new ForbiddenError({
        message: 'Monitor so pode ver frequencias das proprias turmas',
      });
    }

    const frequencysList = await frequencysRepo.findByLesson(lessonId);

    const filtered =
      user.role === 'STUDENT'
        ? frequencysList.filter(f => f.student_id === user.id)
        : frequencysList;

    return Promise.all(
      filtered.map(async frequencys => {
        const enrolled = await frequencysRepo.isEnrolled(
          cls.id,
          frequencys.student_id,
        );
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
      }),
    );
  };
