import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email({
    message: 'Invalid email',
  }),
  password: z
    .string({
      error: (iss) => (iss.input === undefined ? 'Field is required' : 'Invalid input'),
    })
    .min(8, {
      error: 'Password must be at least 8 characters long',
    }),
})

export const signupSchema = loginSchema
  .extend({
    displayName: z
      .string({
        error: (iss) => (iss.input === undefined ? 'Field is required' : 'Invalid input'),
      })
      .min(3, {
        error: 'Username must be at least 3 characters long',
      }),
    confirmPassword: z
      .string({
        error: (iss) => (iss.input === undefined ? 'Field is required' : 'Invalid input'),
      })
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
