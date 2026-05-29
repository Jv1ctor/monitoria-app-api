import type { LoginUserRequestDto } from '../dto/request/login-user-request.dto';
import type { RecoverUserRequestDto } from '../dto/request/recover-user-request.dto';
import type { RegisterUserRequestDto } from '../dto/request/register-user-request.dto';
import type { LoginUserResponseDto } from '../dto/response/login-user-response.dto';
import type { RecoverUserResponseDto } from '../dto/response/recover-user-response.dto';
import type { RegisterUserResponseDto } from '../dto/response/register-user-response.dto';

export type AuthServicePort = {
  register(input: RegisterUserRequestDto): Promise<RegisterUserResponseDto>;
  login(input: LoginUserRequestDto): Promise<LoginUserResponseDto>;
  recover(input: RecoverUserRequestDto): Promise<RecoverUserResponseDto>;
};
