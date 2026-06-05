import '@/modules/auth/docs/openapi';
import '@/modules/major/docs/openapi';

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
        url: 'http://localhost:3000/api/v1/',
      },
    ],
  });
};
