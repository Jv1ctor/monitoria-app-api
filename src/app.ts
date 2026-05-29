import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

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
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(generateOpenAPI()));
// definir rotas
app.use('/api/v1', (_request, response) => {
  response.json({ ping: 'pong' });
});

app.use(notFoundErrorMiddleware);
app.use(globalErrorMiddleware);

export { app };
