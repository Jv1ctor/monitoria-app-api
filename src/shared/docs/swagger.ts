import '@/modules/auth/docs/openapi';
import '@/modules/class/docs/openapi';
import '@/modules/document/docs/openapi';
import '@/modules/lesson/docs/openapi';
import '@/modules/major/docs/openapi';
import '@/modules/subject/docs/openapi';
import '@/modules/frequencys/docs/openapi';
import '@/modules/student/docs/openapi';
import '@/modules/user/docs/openapi';
import '@/modules/rating/docs/openapi';
import 'dotenv/config';

import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import z from 'zod';

import { registry } from './registry';

extendZodWithOpenApi(z);

export const generateOpenAPI = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',

    info: {
      title: 'Monitor API',
      version: '1.0.0',
      description: 'API da aplicação de monitoria',
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT_API || '3000'}/api/v1/`,
      },
    ],
  });
};
