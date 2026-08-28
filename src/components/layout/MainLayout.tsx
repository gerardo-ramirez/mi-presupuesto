import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { Navbar } from './Navbar'
// import { EmailVerificationBanner } from './EmailVerificationBanner' // deshabilitado temporalmente: el reenvío de verificación no funciona

const ADMIN_EMAIL = 'gerardoramirez656@gmail.com'

export function MainLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isAdmin = user?.email === ADMIN_EMAIL
  const currentView = location.pathname === '/custom' ? 'custom' : 'classic'

  const handleSwitch = () => {
    navigate(currentView === 'classic' ? '/custom' : '/')
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar
        userName={user?.displayName ?? null}
        onLogout={logout}
        showSwitch={isAdmin}
        currentView={currentView}
        onSwitch={handleSwitch}
      />
      <Outlet />
    </div>
  )
}
