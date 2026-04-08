import { LogOut, LayoutGrid, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  userName: string | null
  onLogout: () => void
  showSwitch?: boolean
  currentView?: 'classic' | 'custom'
  onSwitch?: () => void
}

export function Navbar({ userName, onLogout, showSwitch, currentView, onSwitch }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between bg-gray-900 border-b border-gray-800 px-6 py-3">
      <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
        Mi Presupuesto
      </span>
      <div className="flex items-center gap-3">
        {userName && (
          <span className="text-gray-400 text-sm">{userName}</span>
        )}
        {showSwitch && onSwitch && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onSwitch}
            className="text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 flex items-center gap-1"
          >
            {currentView === 'classic' ? (
              <>
                <LayoutGrid className="h-4 w-4" />
                <span className="text-xs">Custom</span>
              </>
            ) : (
              <>
                <LayoutList className="h-4 w-4" />
                <span className="text-xs">Clásico</span>
              </>
            )}
          </Button>
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
