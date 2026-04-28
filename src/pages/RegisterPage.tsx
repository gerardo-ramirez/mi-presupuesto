import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterForm } from '@/features/auth'
import { useAuth } from '@/features/auth'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'

const MAX_ATTEMPTS = 3

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const isBlocked = attempts >= MAX_ATTEMPTS

  const handleSubmit = async (data: { displayName: string; email: string; password: string }) => {
    if (isBlocked) return

    setError(null)
    setIsLoading(true)
    try {
      await register(data)
      navigate('/')
    } catch (err) {
      const next = attempts + 1
      setAttempts(next)

      setError(
        next >= MAX_ATTEMPTS
          ? 'Demasiados intentos. Recargá la página para continuar.'
          : getAuthErrorMessage(err),
      )
    } finally {
      setIsLoading(false)
    }
  }

  return <RegisterForm onSubmit={handleSubmit} isLoading={isLoading || isBlocked} error={error} />
}
