import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCheck, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconPicker } from './IconPicker'
import { EditableText } from './EditableText'
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
  onRemove?: () => void
  onTitleChange?: (title: string) => void
  onIconChange?: (icon: string) => void
  onComplete?: () => void
  isCompleted?: boolean
  onShare?: () => void
  isExample?: boolean
  showConfirmExample?: boolean
  onConfirmExample?: () => void
}

export function SectionCard({
  title,
  icon,
  children,
  onRemove,
  onTitleChange,
  onIconChange,
  onComplete,
  isCompleted = false,
  onShare,
  isExample = false,
  showConfirmExample = false,
  onConfirmExample,
}: SectionCardProps) {
  return (
    <Card
      className={cn(
        'shadow-lg',
        isCompleted
          ? 'bg-emerald-950/40 border-emerald-900/60'
          : isExample
            ? 'bg-bg-elevated border-2 border-dashed border-sky-500/40'
            : 'bg-bg-elevated border-border',
      )}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 min-w-0">
            {!isCompleted && onIconChange ? (
              <IconPicker value={icon} onChange={onIconChange} />
            ) : (
              <span className="text-base shrink-0">{icon}</span>
            )}
            {!isCompleted && onTitleChange ? (
              <EditableText value={title} onChange={onTitleChange} />
            ) : (
              <span className="text-xs font-semibold tracking-widest uppercase text-gold-300 truncate">
                {title}
              </span>
            )}
            {isExample && !isCompleted && (
              <span className="shrink-0 text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full border border-sky-500/40 text-sky-300 bg-sky-500/10">
                Ejemplo
              </span>
            )}
            {isCompleted && (
              <span className="flex items-center gap-1 ml-1 text-emerald-500 text-xs font-medium normal-case tracking-normal shrink-0">
                <CheckCheck className="h-3.5 w-3.5" />
                Listo
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onShare && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onShare}
                aria-label="Compartir por WhatsApp"
                className="h-6 w-6 p-0 text-text-subtle border border-border-strong/60 hover:text-emerald-400 hover:bg-emerald-950/30 hover:border-emerald-700/60"
                title="Compartir por WhatsApp"
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            )}
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
                    className="h-6 w-6 p-0 text-text-subtle border border-border-strong/60 hover:text-red-400 hover:bg-red-950/30 hover:border-red-800/60"
                    title="Eliminar sección"
                  >
                    ✕
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar "{title}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción eliminará la sección permanentemente. No se puede deshacer.
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

        {showConfirmExample && onConfirmExample && (
          <div className="mt-2 flex items-center justify-between gap-2 px-2 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-600/40">
            <span className="text-[11px] text-emerald-300">Editaste esta sección de ejemplo</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onConfirmExample}
              className="h-6 px-2 text-[11px] text-emerald-300 border border-emerald-600/50 hover:bg-emerald-500/20 hover:text-emerald-200"
            >
              Usar esta sección
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent
        className={cn(
          'px-4 pb-4 space-y-1',
          isCompleted && 'pointer-events-none opacity-40 grayscale select-none',
        )}
      >
        {children}
      </CardContent>
    </Card>
  )
}
