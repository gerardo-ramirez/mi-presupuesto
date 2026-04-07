import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterForm } from '@/features/auth'
import { useAuth } from '@/features/auth'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: { displayName: string; email: string; password: string }) => {
    setError(null)
    setIsLoading(true)
    try {
      await register(data)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta')
    } finally {
      setIsLoading(false)
    }
  }

  return <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
}
