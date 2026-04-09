import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerSchema = z.object({
  displayName: z.string().min(2).max(50).regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/, 'Solo letras y números, sin espacios ni caracteres especiales'),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
