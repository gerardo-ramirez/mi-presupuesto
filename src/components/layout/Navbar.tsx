import { LogOut, LayoutGrid, LayoutList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'

interface NavbarProps {
  userName: string | null
  onLogout: () => void
  showSwitch?: boolean
  currentView?: 'classic' | 'custom'
  onSwitch?: () => void
}

export function Navbar({ userName, onLogout, showSwitch, currentView, onSwitch }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between bg-bg-elevated border-b border-border px-3 sm:px-6 py-3">
      <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent shrink-0">
        Mi Presupuesto
      </span>
      <div className="flex items-center gap-1 sm:gap-3 min-w-0">
        {userName && (
          <span className="text-text-muted text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">
            {userName}
          </span>
        )}
        {showSwitch && onSwitch && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onSwitch}
            className="text-text-muted hover:text-gold-400 hover:bg-amber-500/10 flex items-center gap-1 px-2 sm:px-3"
          >
            {currentView === 'classic' ? (
              <>
                <LayoutGrid className="h-4 w-4 shrink-0" />
                <span className="text-xs hidden sm:inline">Custom</span>
              </>
            ) : (
              <>
                <LayoutList className="h-4 w-4 shrink-0" />
                <span className="text-xs hidden sm:inline">Clásico</span>
              </>
            )}
          </Button>
        )}
        <ThemeToggle />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-text-subtle hover:text-red-400 hover:bg-red-950/30 px-2 sm:px-3"
          aria-label="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  )
}
