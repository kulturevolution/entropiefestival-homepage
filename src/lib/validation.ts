import { z } from 'zod';

export const SupporterSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(255, 'First name must be less than 255 characters')
    .trim()
    .regex(/^[a-zA-Z\s\-'\p{L}]+$/u, 'First name contains invalid characters'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(255, 'Last name must be less than 255 characters')
    .trim()
    .regex(/^[a-zA-Z\s\-'\p{L}]+$/u, 'Last name contains invalid characters'),

  email: z
    .string()
    .min(5, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Invalid email format')
    .toLowerCase()
    .trim(),

  pronoun: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || val === '' || val.length <= 255,
      'Pronoun must be less than 255 characters'
    )
    .refine(
      (val) =>
        val === undefined ||
        val === '' ||
        /^[a-zA-Z\s\-'\p{L}\/_*]+$/u.test(val),
      'Pronoun contains invalid characters'
    ),
});

export type SupporterData = z.infer<typeof SupporterSchema>;
