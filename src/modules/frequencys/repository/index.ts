import { prisma } from '@/shared/database/prisma';

import type { FrequencysRepositoryPort } from '../interfaces/frequencys-repository.port';
import { create } from './core/create.core';
import { findByClass } from './core/find-by-class.core';
import { findById } from './core/find-by-id.core';
import { findByLesson } from './core/find-by-lesson.core';
import { findByStudent } from './core/find-by-student.core';
import { remove } from './core/remove.core';
import { update } from './core/update.core';

export const frequencysRepository: FrequencysRepositoryPort = {
  create,
  findById,
  findByLesson,
  findByClass,
  findByStudent,
  update,
  remove,
  isEnrolled: async (classId: number, studentId: number) => {
    const found = await prisma.lessonUser.findFirst({
      where: { lesson: { class_id: classId }, student_id: studentId },
    });
    return found !== null;
  },
};
