import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth'
import { useAuth } from '@/features/auth'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'

const MAX_ATTEMPTS = 3

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  // Cuando llega al límite, el formulario se deshabilita completamente
  const isBlocked = attempts >= MAX_ATTEMPTS

  const handleSubmit = async (data: { email: string; password: string }) => {
    if (isBlocked) return  // defensa doble: no procesar si ya está bloqueado

    setError(null)
    setIsLoading(true)
    try {
      await login(data)
      navigate('/')
    } catch (err) {
      const next = attempts + 1
      setAttempts(next)

      setError(
        next >= MAX_ATTEMPTS
          ? 'Demasiados intentos fallidos. Recargá la página para continuar.'
          : getAuthErrorMessage(err),  // ← mensaje seguro, nunca err.message crudo
      )
    } finally {
      setIsLoading(false)
    }
  }

  // isLoading || isBlocked deshabilita inputs y botón sin tocar LoginForm
  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading || isBlocked} error={error} />
}
