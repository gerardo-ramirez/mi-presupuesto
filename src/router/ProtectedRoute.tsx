import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import Loading from '@/components/shared/Loading'

export function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) return <Loading />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}
