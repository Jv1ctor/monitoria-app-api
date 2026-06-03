import { registry } from '@/shared/docs/registry';
import { ApiErrorResponseSchema } from '@/shared/docs/schemas/api-error.schema';

import { LoginUserRequestDto } from '../dto/request/login-user-request.dto';
import { RecoverUserRequestDto } from '../dto/request/recover-user-request.dto';
import { RegisterUserRequestDto } from '../dto/request/register-user-request.dto';
import { LoginUserResponseDto } from '../dto/response/login-user-response.dto';
import { RecoverUserResponseDto } from '../dto/response/recover-user-response.dto';
import { RegisterUserResponseDto } from '../dto/response/register-user-response.dto';

const LoginUserRequestSchema = registry.register(
  'LoginUserRequestDto',
  LoginUserRequestDto,
);

const LoginUserResponseSchema = registry.register(
  'LoginUserResponseDto',
  LoginUserResponseDto,
);

const RegisterUserRequestSchema = registry.register(
  'RegisterUserRequestDto',
  RegisterUserRequestDto,
);

const RegisterUserResponseSchema = registry.register(
  'RegisterUserResponseDto',
  RegisterUserResponseDto,
);

registry.register('RecoverUserRequestDto', RecoverUserRequestDto);

registry.register('RecoverUserResponseDto', RecoverUserResponseDto);

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  summary: 'Authenticate a user',
  description:
    'Validates the user registration number and password, then returns a JWT token.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginUserRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'JWT token generated successfully.',
      content: {
        'application/json': {
          schema: LoginUserResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid credentials or invalid payload.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  summary: 'Register a new user',
  description:
    'Creates a user associated with a major and returns the public user data.',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterUserRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User registered successfully.',
      content: {
        'application/json': {
          schema: RegisterUserResponseSchema,
        },
      },
    },
    400: {
      description: 'Invalid payload.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    409: {
      description: 'Email or Registration already exists',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
    404: {
      description: 'Major not found.',
      content: {
        'application/json': {
          schema: ApiErrorResponseSchema,
        },
      },
    },
  },
});
