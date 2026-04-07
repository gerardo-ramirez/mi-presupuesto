import { Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { Navbar } from './Navbar'

export function MainLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar userName={user?.displayName ?? null} onLogout={logout} />
      <Outlet />
    </div>
  )
}
