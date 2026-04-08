import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import Loading from '@/components/shared/Loading'

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) return <Loading />
  if (isAuthenticated) return <Navigate to="/" replace />
  return <>{children}</>
}
