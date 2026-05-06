import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCheck } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface SectionCardProps {
  title: string
  icon: string
  children: React.ReactNode
  className?: string
  onRemove?: () => void
  onComplete?: () => void
  isCompleted?: boolean
}

export function SectionCard({
  title,
  icon,
  children,
  className,
  onRemove,
  onComplete,
  isCompleted = false,
}: SectionCardProps) {
  return (
    <Card
      className={cn(
        isCompleted
          ? 'bg-emerald-950/40 border-emerald-900/60'
          : 'bg-gray-900 border-gray-800',
        className,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500">
            <span>{icon}</span>
            <span>{title}</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-emerald-500 normal-case tracking-normal font-medium">
                <CheckCheck className="h-3.5 w-3.5" />
                Listo
              </span>
            )}
          </CardTitle>

          <div className="flex items-center gap-1 shrink-0">
            {!isCompleted && onComplete && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onComplete}
                className="h-6 px-2 text-xs text-emerald-600/70 border border-emerald-800/50 hover:text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-700/70"
                title="Marcar como listo"
              >
                Listo
              </Button>
            )}
            {onRemove && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-500 border border-gray-700/60 hover:text-red-400 hover:bg-red-950/30 hover:border-red-800/60"
                    title="Eliminar sección"
                  >
                    ✕
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar esta sección?</AlertDialogTitle>
                    <AlertDialogDescription>
                      La sección "{title}" se ocultará del panel. Esta acción no se puede deshacer sin resetear el presupuesto.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onRemove}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={cn(
          'space-y-1 pt-0',
          isCompleted && 'pointer-events-none opacity-40 grayscale select-none',
        )}
      >
        {children}
      </CardContent>
    </Card>
  )
}
