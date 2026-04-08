import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import Loading from '@/components/shared/Loading'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) return <Loading />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}
