import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'
import { useAuth } from '@/features/auth'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'
import type { ForgotPasswordFormData } from '@/features/auth/schemas/auth.schemas'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setError(null)
    setIsLoading(true)
    try {
      await resetPassword(data.email)
      setIsSuccess(true)
    } catch (err) {
      // No revelamos si el email existe o no: 'user-not-found' también se trata como éxito
      if (err instanceof FirebaseError && err.code === 'auth/user-not-found') {
        setIsSuccess(true)
      } else {
        setError(getAuthErrorMessage(err))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ForgotPasswordForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      isSuccess={isSuccess}
    />
  )
}
