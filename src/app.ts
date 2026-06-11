import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { router } from './router';
import { generateOpenAPI } from './shared/docs/swagger';
import { globalErrorMiddleware } from './shared/handle-error/middleware/global-error.middleware';
import { notFoundErrorMiddleware } from './shared/handle-error/middleware/not-found-error.middleware';
import { loggerHttp } from './shared/logger';

const app = express();

app.use(loggerHttp);
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.options('/{*splat}', (_request, response) => response.status(204).end());

app.use('/api/v1', (_request, response, next) => {
  response.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  response.set('Pragma', 'no-cache');
  response.set('Expires', '0');
  next();
});

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(generateOpenAPI()));
app.use('/api/v1', router);

app.use(notFoundErrorMiddleware);
app.use(globalErrorMiddleware);

export { app };
