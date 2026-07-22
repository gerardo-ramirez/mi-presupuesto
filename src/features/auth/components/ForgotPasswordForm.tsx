import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, ArrowLeft } from 'lucide-react'
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
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas/auth.schemas'

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => void
  isLoading: boolean
  error: string | null
  isSuccess: boolean
}

export function ForgotPasswordForm({ onSubmit, isLoading, error, isSuccess }: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

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
            Recuperar Contraseña
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isSuccess
              ? 'Revisá tu bandeja de entrada'
              : 'Ingresá tu email y te enviaremos un link para restablecerla'}
          </CardDescription>
        </CardHeader>

        {isSuccess ? (
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <Mail className="h-10 w-10 text-amber-400" />
              <p className="text-gray-300 text-sm">
                Si el email ingresado corresponde a una cuenta registrada, vas a recibir un
                correo con instrucciones para restablecer tu contraseña.
              </p>
            </div>
            <Button
              asChild
              className={cn(
                'w-full bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold',
                'focus-visible:ring-amber-400',
              )}
            >
              <Link to="/login">Volver a Iniciar Sesión</Link>
            </Button>
          </CardContent>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
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
                      Enviando...
                    </>
                  ) : (
                    'Enviar Link de Recuperación'
                  )}
                </Button>

                {error !== null && (
                  <p role="alert" className="text-red-400 text-sm text-center">
                    {error}
                  </p>
                )}
              </CardContent>

              <CardFooter className="pt-2 pb-6 justify-center">
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-gray-500 hover:text-amber-400 text-sm transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Volver a Iniciar Sesión
                </Link>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </div>
  )
}
