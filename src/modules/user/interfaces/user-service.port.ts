import type { UserDto } from '../dto/user.dto';

export type UserServicePort = {
  findByRegistration(registration: string): Promise<UserDto | null>;
};
