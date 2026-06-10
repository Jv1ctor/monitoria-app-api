import { Role } from '@/generated/prisma/browser';
import { prisma } from '@/shared/database/prisma';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { ClassDto } from '../../dto/class.dto';
import type { AssignMonitorRequestDto } from '../../dto/request/assign-monitor-request.dto';
import type { ClassRepositoryPort } from '../../interfaces/class-repository.port';

export const assignMonitor =
  (deps: { classRepo: ClassRepositoryPort }) =>
  async (
    classId: number,
    input: AssignMonitorRequestDto,
  ): Promise<ClassDto> => {
    const { classRepo } = deps;

    const existingClass = await classRepo.findById(classId);

    if (!existingClass) {
      throw new NotFoundError({ message: 'Turma não encontrada' });
    }

    const monitorProfile = await prisma.academicProfile.findUnique({
      where: {
        user_id: input.monitor_id,
        user: { role: Role.MONITOR },
      },
    });

    if (!monitorProfile) {
      throw new NotFoundError({ message: 'Monitor não encontrado' });
    }

    const updated = await prisma.class.update({
      where: { id: classId },
      data: { monitor: { connect: { user_id: input.monitor_id } } },
    });

    return {
      id: updated.id,
      code: updated.code,
      monitor_id: updated.monitor_id,
      subject_id: updated.subject_id,
      createdAt: updated.created_at,
    };
  };
