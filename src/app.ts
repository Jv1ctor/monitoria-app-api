import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { globalErrorMiddleware } from './shared/handle-error/middleware/global-error.middleware';
import { notFoundErrorMiddleware } from './shared/handle-error/middleware/not-found-error.middleware';
import { loggerHttp } from './shared/logger';

const app = express();

app.use(loggerHttp);
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// definir rotas
app.use('/api/v1', () => {});

app.use(notFoundErrorMiddleware);
app.use(globalErrorMiddleware);

export { app };
