import type { AuthServicePort } from '../interfaces/auth-service.port';
import { login } from './core/login.core';
import { register } from './core/register.core';

export const authController = (deps: { authService: AuthServicePort }) => ({
  login: login({ authService: deps.authService }),
  register: register({ authService: deps.authService }),
});
