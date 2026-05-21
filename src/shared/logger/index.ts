import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  level: 'debug',
});

export const loggerHttp = pinoHttp({
  logger,
  customLogLevel(_, response) {
    if (response.statusCode >= 400 && response.statusCode < 500) return 'warn';
    if (response.statusCode >= 500) return 'error';
    return 'info';
  },
  customSuccessMessage(request, response, responseTime) {
    return `[HTTP] ${request.method} - ${response.statusCode} - ${
      request.url
    } - request completed - ${responseTime.toPrecision()}ms`;
  },
  customSuccessObject: () => {},
});
