import { Role, Modality, Status, type PrismaClient } from '../../src/generated/prisma/client';
import type { GlobalOmitConfig } from '../../src/generated/prisma/internal/prismaNamespace';
import { logger } from '../../src/shared/logger';
import type { DefaultArgs } from '@prisma/client/runtime/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

/**
 * Seed de desenvolvimento — cria dados para testar os fluxos de estudante e monitor.
 *
 * Cria:
 *  - 1 monitor (registration: 1234565, password: senha123)
 *  - 2 cursos (majors) com 2 disciplinas cada
 *  - 4 turmas (2 por curso), todas vinculadas ao monitor
 *  - 2 aulas por turma (8 no total)
 *  - 1 estudante (registration: 7654321, password: senha123)
 *  - Inscrições do estudante em algumas aulas
 *  - Frequências para as aulas inscritas
 */

const MONITOR = {
  registration: '1234565',
  password: 'senha123',
  email: 'monitor@dev.com',
  firstName: 'Carlos',
  lastName: 'Monitor',
} as const;

const STUDENT = {
  registration: '7654321',
  password: 'senha123',
  email: 'aluno@dev.com',
  firstName: 'Ana',
  lastName: 'Aluna',
} as const;

const MAJORS = [
  {
    name: 'Ciência da Computação',
    subjects: [
      { code: 'ED-101', name: 'Estrutura de Dados' },
      { code: 'MD-101', name: 'Matemática Discreta' },
    ],
  },
  {
    name: 'Engenharia de Software',
    subjects: [
      { code: 'ER-101', name: 'Engenharia de Requisitos' },
      { code: 'AS-101', name: 'Arquitetura de Software' },
    ],
  },
] as const;

function makeClassCode(subjectCode: string, suffix: string) {
  return `${subjectCode}-${suffix}`;
}

function makeLessonDate(offsetDays: number, hour: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(hour, 0, 0, 0);
  return d;
}

export const devSeed = async (
  prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs>,
) => {
  // ── 1. Cursos e Disciplinas ──────────────────────────────────────────────

  const createdMajors: { id: number; name: string; subjects: { id: number; code: string; name: string }[] }[] = [];

  for (const major of MAJORS) {
    let dbMajor = await prisma.major.findUnique({ where: { name: major.name } });
    if (!dbMajor) {
      dbMajor = await prisma.major.create({ data: { name: major.name } });
      logger.info(`Curso criado: ${dbMajor.name}`);
    } else {
      logger.info(`Curso já existe: ${dbMajor.name}`);
    }

    const subjects: { id: number; code: string; name: string }[] = [];
    for (const subj of major.subjects) {
      let dbSubject = await prisma.subject.findUnique({ where: { code: subj.code } });
      if (!dbSubject) {
        dbSubject = await prisma.subject.create({
          data: { code: subj.code, name: subj.name, major_id: dbMajor.id },
        });
        logger.info(`  Disciplina criada: ${dbSubject.code} — ${dbSubject.name}`);
      } else {
        logger.info(`  Disciplina já existe: ${dbSubject.code}`);
      }
      subjects.push({ id: dbSubject.id, code: dbSubject.code, name: dbSubject.name });
    }

    createdMajors.push({ id: dbMajor.id, name: dbMajor.name, subjects });
  }

  // ── 2. Monitor ───────────────────────────────────────────────────────────

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(MONITOR.password, salt);

  let monitorUser = await prisma.user.findUnique({ where: { registration: MONITOR.registration } });
  if (!monitorUser) {
    monitorUser = await prisma.user.create({
      data: {
        registration: MONITOR.registration,
        password: hashedPassword,
        email: MONITOR.email,
        first_name: MONITOR.firstName,
        last_name: MONITOR.lastName,
        role: Role.MONITOR,
      },
    });
    logger.info(`Monitor criado: ${monitorUser.first_name} ${monitorUser.last_name} (${monitorUser.registration})`);
  } else {
    logger.info(`Monitor já existe: ${monitorUser.registration}`);
  }

  // AcademicProfile do monitor (vinculado ao primeiro curso)
  let monitorProfile = await prisma.academicProfile.findUnique({ where: { user_id: monitorUser.id } });
  if (!monitorProfile) {
    monitorProfile = await prisma.academicProfile.create({
      data: {
        user_id: monitorUser.id,
        major_id: createdMajors[0].id,
      },
    });
    logger.info(`  AcademicProfile do monitor criado (curso: ${createdMajors[0].name})`);
  } else {
    logger.info(`  AcademicProfile do monitor já existe`);
  }

  // ── 3. Turmas (2 por curso = 4 no total) ─────────────────────────────────

  const createdClasses: { id: number; code: string; subjectCode: string }[] = [];

  for (const major of createdMajors) {
    for (const subject of major.subjects) {
      const classCode = makeClassCode(subject.code, 'T1');

      let dbClass = await prisma.class.findUnique({ where: { code: classCode } });
      if (!dbClass) {
        dbClass = await prisma.class.create({
          data: {
            code: classCode,
            monitor_id: monitorProfile.user_id,
            subject_id: subject.id,
          },
        });
        logger.info(`Turma criada: ${dbClass.code} (${subject.name})`);
      } else {
        logger.info(`Turma já existe: ${dbClass.code}`);
      }
      createdClasses.push({ id: dbClass.id, code: dbClass.code, subjectCode: subject.code });
    }
  }

  // ── 4. Aulas (2 por turma) ──────────────────────────────────────────────

  const createdLessons: { id: number; classCode: string; dateLabel: string }[] = [];

  for (const cls of createdClasses) {
    const lessonSpecs = [
      { offset: 0, hour: 14, modality: Modality.REMOTE },
      { offset: 3, hour: 10, modality: Modality.INPERSON },
    ];

    for (const spec of lessonSpecs) {
      const dateTime = makeLessonDate(spec.offset, spec.hour);
      const dateLabel = dateTime.toISOString().slice(0, 10);

      const existing = await prisma.lesson.findFirst({
        where: { class_id: cls.id, date_time: dateTime },
      });
      if (existing) {
        logger.info(`  Aula já existe: ${cls.code} em ${dateLabel}`);
        createdLessons.push({ id: existing.id, classCode: cls.code, dateLabel });
        continue;
      }

      const lesson = await prisma.lesson.create({
        data: {
          modality: spec.modality,
          date_time: dateTime,
          description: spec.offset === 0 ? 'Aula de hoje' : 'Aula futura',
          class_id: cls.id,
        },
      });
      logger.info(`  Aula criada: ${cls.code} — ${spec.modality} — ${dateLabel}`);
      createdLessons.push({ id: lesson.id, classCode: cls.code, dateLabel });
    }
  }

  // ── 5. Estudante ─────────────────────────────────────────────────────────

  const studentHashedPassword = await bcrypt.hash(STUDENT.password, salt);

  let studentUser = await prisma.user.findUnique({ where: { registration: STUDENT.registration } });
  if (!studentUser) {
    studentUser = await prisma.user.create({
      data: {
        registration: STUDENT.registration,
        password: studentHashedPassword,
        email: STUDENT.email,
        first_name: STUDENT.firstName,
        last_name: STUDENT.lastName,
        role: Role.STUDENT,
      },
    });
    logger.info(`Estudante criado: ${studentUser.first_name} ${studentUser.last_name} (${studentUser.registration})`);
  } else {
    logger.info(`Estudante já existe: ${studentUser.registration}`);
  }

  let studentProfile = await prisma.academicProfile.findUnique({ where: { user_id: studentUser.id } });
  if (!studentProfile) {
    studentProfile = await prisma.academicProfile.create({
      data: {
        user_id: studentUser.id,
        major_id: createdMajors[0].id,
      },
    });
    logger.info(`  AcademicProfile do estudante criado (curso: ${createdMajors[0].name})`);
  } else {
    logger.info(`  AcademicProfile do estudante já existe`);
  }

  // ── 6. Inscrever estudante nas aulas de hoje ─────────────────────────────

  const todayLessons = createdLessons.filter((l) => l.dateLabel === new Date().toISOString().slice(0, 10));

  for (const lesson of todayLessons) {
    const existing = await prisma.lessonUser.findFirst({
      where: { lesson_id: lesson.id, student_id: studentProfile.user_id },
    });
    if (existing) {
      logger.info(`  Estudante já inscrito na aula ${lesson.classCode}`);
      continue;
    }

    await prisma.lessonUser.create({
      data: {
        lesson_id: lesson.id,
        student_id: studentProfile.user_id,
      },
    });
    logger.info(`  Estudante inscrito na aula: ${lesson.classCode}`);
  }

  // ── 7. Frequências para as aulas inscritas ───────────────────────────────

  for (const lesson of todayLessons) {
    const existing = await prisma.frequencys.findFirst({
      where: { lesson_id: lesson.id, student_id: studentProfile.user_id },
    });
    if (existing) {
      logger.info(`  Frequência já existe para aula ${lesson.classCode}`);
      continue;
    }

    await prisma.frequencys.create({
      data: {
        status: Status.PENDING,
        value: false,
        student_id: studentProfile.user_id,
        lesson_id: lesson.id,
      },
    });
    logger.info(`  Frequência criada para aula: ${lesson.classCode}`);
  }

  // ── Resumo ───────────────────────────────────────────────────────────────

  logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  logger.info('Seed de desenvolvimento concluída!');
  logger.info(`  Cursos:      ${createdMajors.length}`);
  logger.info(`  Disciplinas: ${createdMajors.reduce((acc, m) => acc + m.subjects.length, 0)}`);
  logger.info(`  Turmas:      ${createdClasses.length}`);
  logger.info(`  Aulas:       ${createdLessons.length}`);
  logger.info(`  Monitor:     ${MONITOR.registration} / ${MONITOR.password}`);
  logger.info(`  Estudante:   ${STUDENT.registration} / ${STUDENT.password}`);
  logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
};
