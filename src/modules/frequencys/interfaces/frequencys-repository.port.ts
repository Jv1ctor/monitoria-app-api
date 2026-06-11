import type { Frequencys, Prisma } from '@/generated/prisma/browser';

export type FrequencysWithStudent = Frequencys & {
  student: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      registration: string;
    };
  };
};

export type FrequencysRepositoryPort = {
  create: (data: Prisma.FrequencysUncheckedCreateInput) => Promise<Frequencys>;
  findById: (id: number) => Promise<Frequencys | null>;
  findByLesson: (lessonId: number) => Promise<FrequencysWithStudent[]>;
  findByClass: (classId: number) => Promise<FrequencysWithStudent[]>;
  findByStudent: (studentId: number) => Promise<
    (Frequencys & {
      lesson: {
        id: number;
        modality: string;
        date_time: Date;
        description: string | null;
        class_id: number;
        created_at: Date;
        class: {
          id: number;
          code: string;
          subject: { id: number; name: string } | null;
          monitor: {
            user: { id: number; first_name: string; last_name: string };
          } | null;
        } | null;
      };
    })[]
  >;
  findByStudentAndLesson: (
    studentId: number,
    lessonId: number,
  ) => Promise<Frequencys | null>;
  update: (
    id: number,
    data: Prisma.FrequencysUpdateInput,
  ) => Promise<Frequencys>;
  remove: (id: number) => Promise<Frequencys>;
  isEnrolled: (classId: number, studentId: number) => Promise<boolean>;
};
