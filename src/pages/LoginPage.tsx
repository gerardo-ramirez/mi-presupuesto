import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth'
import { useAuth } from '@/features/auth'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError(null)
    setIsLoading(true)
    try {
      await login(data)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
}
