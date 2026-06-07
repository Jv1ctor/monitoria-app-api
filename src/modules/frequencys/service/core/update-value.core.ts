import type { ClassRepositoryPort } from '@/modules/class/interfaces/class-repository.port';
import type { LessonRepositoryPort } from '@/modules/lesson/interfaces/lesson-repository.port';
import { ForbiddenError } from '@/shared/handle-error/errors/forbidden.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { UpdateFrequencysValueRequestDto } from '../../dto/request/update-frequencys-value-request.dto';
import type { FrequencysResponseDto } from '../../dto/response/frequencys-response.dto';
import type { FrequencysRepositoryPort } from '../../interfaces/frequencys-repository.port';
import type { AuthoredUser } from '../../interfaces/frequencys-service.port';

export const updateValue =
  (deps: {
    frequencysRepo: FrequencysRepositoryPort;
    lessonRepo: LessonRepositoryPort;
    classRepo: ClassRepositoryPort;
  }) =>
  async (
    id: number,
    input: UpdateFrequencysValueRequestDto,
    user: AuthoredUser,
  ): Promise<FrequencysResponseDto> => {
    const { frequencysRepo, lessonRepo, classRepo } = deps;

    const existing = await frequencysRepo.findById(id);
    if (!existing) {
      throw new NotFoundError({ message: 'Frequencia nao encontrada' });
    }

    if (user.role === 'STUDENT') {
      throw new ForbiddenError({
        message: 'Aluno nao pode marcar frequencia',
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
          message: 'Monitor so pode editar frequencias das proprias turmas',
        });
      }
    }

    const updated = await frequencysRepo.update(id, {
      value: input.value,
      status: 'FINISHED',
    });

    const lesson = await lessonRepo.findById(updated.lesson_id);
    const classId = lesson?.class_id ?? 0;
    const enrolled = classId
      ? await frequencysRepo.isEnrolled(classId, updated.student_id)
      : false;

    return {
      id: updated.id,
      status: updated.status,
      value: updated.value,
      student_id: updated.student_id,
      lesson_id: updated.lesson_id,
      createdAt: updated.created_at.toISOString(),
      unboundAt: updated.unbound_at?.toISOString() ?? undefined,
      enrolled,
    };
  };
