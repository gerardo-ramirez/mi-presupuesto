import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { registerSchema, type RegisterFormData } from '../schemas/auth.schemas'

interface RegisterFormProps {
  onSubmit: (data: { displayName: string; email: string; password: string }) => void
  isLoading: boolean
  error: string | null
}

export function RegisterForm({ onSubmit, isLoading, error }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { displayName: '', email: '', password: '', confirmPassword: '' },
  })

  const handleValidSubmit = ({ displayName, email, password }: RegisterFormData) => {
    onSubmit({ displayName, email, password })
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 shadow-2xl shadow-black/50">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-sm bg-amber-500" />
            <span className="text-amber-400 text-sm font-medium tracking-wide uppercase">
              Mi Presupuesto
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-100">
            Crear Cuenta
          </CardTitle>
          <CardDescription className="text-gray-400">
            Empezá a gestionar tu presupuesto
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleValidSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm font-medium">
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tu nombre"
                        autoComplete="name"
                        disabled={isLoading}
                        className={cn(
                          'bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500',
                          'focus-visible:ring-amber-500 focus-visible:border-amber-500',
                          fieldState.error && 'border-red-500 focus-visible:ring-red-500',
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                        disabled={isLoading}
                        className={cn(
                          'bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500',
                          'focus-visible:ring-amber-500 focus-visible:border-amber-500',
                          fieldState.error && 'border-red-500 focus-visible:ring-red-500',
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm font-medium">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Mínimo 6 caracteres"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className={cn(
                            'bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500 pr-10',
                            'focus-visible:ring-amber-500 focus-visible:border-amber-500',
                            fieldState.error && 'border-red-500 focus-visible:ring-red-500',
                          )}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword((p) => !p)}
                          className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-300 hover:bg-transparent"
                          tabIndex={-1}
                          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm font-medium">
                      Confirmar Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Repetí tu contraseña"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className={cn(
                            'bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500 pr-10',
                            'focus-visible:ring-amber-500 focus-visible:border-amber-500',
                            fieldState.error && 'border-red-500 focus-visible:ring-red-500',
                          )}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowConfirmPassword((p) => !p)}
                          className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-300 hover:bg-transparent"
                          tabIndex={-1}
                          aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'w-full bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold',
                  'focus-visible:ring-amber-400',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-colors duration-150',
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </Button>

              {error !== null && (
                <p role="alert" className="text-red-400 text-sm text-center">
                  {error}
                </p>
              )}
            </CardContent>

            <CardFooter className="pt-2 pb-6 justify-center">
              <p className="text-gray-500 text-sm">
                ¿Ya tenés cuenta?{' '}
                <Link
                  to="/login"
                  className="text-amber-400 hover:text-amber-300 font-medium underline-offset-4 hover:underline transition-colors"
                >
                  Iniciá sesión
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
