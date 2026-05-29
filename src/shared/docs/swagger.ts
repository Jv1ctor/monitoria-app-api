import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

export const generateOpenAPI = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',

    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'API com Express + Zod + Swagger',
    },

    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  });
};
