import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  userName: string | null
  onLogout: () => void
}

export function Navbar({ userName, onLogout }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between bg-gray-900 border-b border-gray-800 px-6 py-3">
      <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
        Mi Presupuesto
      </span>
      <div className="flex items-center gap-3">
        {userName && (
          <span className="text-gray-400 text-sm">{userName}</span>
        )}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-gray-500 hover:text-red-400 hover:bg-red-950/30"
          aria-label="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  )
}
