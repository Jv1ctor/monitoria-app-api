import { ZodError } from 'zod';

import type { FormattedZodError } from './types/formatted-zod-error.type';

export function formatZodError(error?: ZodError): FormattedZodError[] {
  if (!error) return [];
  const errors = new Map<string, string[]>();

  for (const issue of error.issues) {
    const field = issue.path.join('.');

    if (!errors.has(field)) {
      errors.set(field, []);
    }

    errors.get(field)!.push(issue.message);
  }

  return [...errors.entries()].map(([field, constraints]) => ({
    field,
    constraints,
  }));
}
