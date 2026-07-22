import { z } from 'zod'
import { safeEmailField, DISPLAY_NAME_REGEX } from '@/lib/sanitize'

export const loginSchema = z.object({
  email: safeEmailField(),
  password: z.string().min(6).max(128),
})

export const registerSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .regex(DISPLAY_NAME_REGEX, 'Solo letras y números, sin espacios ni caracteres especiales'),
  email: safeEmailField(),
  password: z.string().min(6).max(128),
  confirmPassword: z.string().min(6).max(128),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: safeEmailField(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
