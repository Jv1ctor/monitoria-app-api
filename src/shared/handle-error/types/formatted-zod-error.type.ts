import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const FormattedZodError = z.object({
  field: z.string(),
  constraints: z.array(z.string()),
});

export type FormattedZodError = z.infer<typeof FormattedZodError>;
