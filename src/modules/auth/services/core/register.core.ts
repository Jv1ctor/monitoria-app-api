import bcrypt from 'bcrypt';

import type { StudentServicePort } from '@/modules/student/interfaces/student-service.port';

import { RegisterUserRequestDto } from '../../dto/request/register-user-request.dto';
import type { RegisterUserResponseDto } from '../../dto/response/register-user-response.dto';

export const register =
  (deps: { studentService: StudentServicePort }) =>
  async (data: RegisterUserRequestDto): Promise<RegisterUserResponseDto> => {
    const { studentService } = deps;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const student = await studentService.register({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: hashedPassword,
      registration: data.registration,
      major_name: data.major_name,
    });

    return {
      first_name: student.user.first_name,
      last_name: student.user.last_name,
      email: student.user.email,
      major: student.major.name,
      registration: student.user.registration,
    };
  };
