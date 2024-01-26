import { z } from 'zod';

export const validationSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: 'Title issue is required and must contain at least (5) chars.',
    })
    .max(255),
  body: z.string().min(10, {
    message:
      'Description issue is required and must contain at least (10) chars.',
  }),
});
