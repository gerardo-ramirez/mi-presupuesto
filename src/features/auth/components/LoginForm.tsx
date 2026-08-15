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
import { loginSchema, type LoginFormData } from '../schemas/auth.schemas'

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  isLoading: boolean
  error: string | null
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-bg-elevated border-border shadow-2xl shadow-black/50">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-sm bg-amber-500" />
            <span className="text-gold-400 text-sm font-medium tracking-wide uppercase">
              Mi Presupuesto
            </span>
          </div>
          <CardTitle className="text-2xl font-bold text-text">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-text-muted">
            Ingresá a tu presupuesto
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-text-muted text-sm font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                        disabled={isLoading}
                        className={cn(
                          'bg-bg-elevated border-border-strong text-text placeholder:text-text-subtle',
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-text-muted text-sm font-medium">
                        Contraseña
                      </FormLabel>
                      <Link
                        to="/forgot-password"
                        tabIndex={-1}
                        className="text-gold-400 hover:text-gold-300 text-xs font-medium underline-offset-4 hover:underline transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Mínimo 6 caracteres"
                          autoComplete="current-password"
                          disabled={isLoading}
                          className={cn(
                            'bg-bg-elevated border-border-strong text-text placeholder:text-text-subtle pr-10',
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
                          className="absolute right-0 top-0 h-full px-3 text-text-subtle hover:text-text-muted hover:bg-transparent"
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
                    Ingresando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>

              {error !== null && (
                <p role="alert" className="text-red-400 text-sm text-center">
                  {error}
                </p>
              )}
            </CardContent>

            <CardFooter className="pt-2 pb-6 justify-center">
              <p className="text-text-subtle text-sm">
                ¿No tenés cuenta?{' '}
                <Link
                  to="/register"
                  className="text-gold-400 hover:text-gold-300 font-medium underline-offset-4 hover:underline transition-colors"
                >
                  Registrate
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
