import type { Role } from '@/generated/prisma/browser';

import type { UpdateFrequencysValueRequestDto } from '../dto/request/update-frequencys-value-request.dto';
import type { FrequencysResponseDto } from '../dto/response/frequencys-response.dto';

export type AuthoredUser = {
  id: number;
  role: Role;
};

export type FrequencysServicePort = {
  findById: (id: number, user: AuthoredUser) => Promise<FrequencysResponseDto>;
  findByLesson: (
    lessonId: number,
    user: AuthoredUser,
  ) => Promise<FrequencysResponseDto[]>;
  findByClass: (
    classId: number,
    user: AuthoredUser,
  ) => Promise<FrequencysResponseDto[]>;
  findByStudent: (
    studentId: number,
    user: AuthoredUser,
  ) => Promise<FrequencysResponseDto[]>;
  updateValue: (
    id: number,
    input: UpdateFrequencysValueRequestDto,
    user: AuthoredUser,
  ) => Promise<FrequencysResponseDto>;
  remove: (id: number, user: AuthoredUser) => Promise<FrequencysResponseDto>;
};
