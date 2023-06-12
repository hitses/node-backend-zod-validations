import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string({
    required_error: 'Title is required'
  }),
  description: z.string({
    required_error: 'Description is required'
  }),
  date: z
    .string()
    .datetime({
      message: 'Invalid date'
    })
    .optional()
})

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, 'Password must be at least 6 characters long')
})
