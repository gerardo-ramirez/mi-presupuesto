import type { ReactNode } from 'react'
import { useAuth } from '@/features/auth'

const ADMIN_EMAIL = 'gerardoramirez656@gmail.com'

interface AdminRouteProps {
  children: ReactNode
  fallback: ReactNode
}

export function AdminRoute({ children, fallback }: AdminRouteProps) {
  const { user } = useAuth()
  return user?.email === ADMIN_EMAIL ? <>{children}</> : <>{fallback}</>
}
