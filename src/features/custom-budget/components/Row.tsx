import { cn } from '@/lib/utils'

interface RowProps {
  label: string
  highlight?: boolean
  remaining?: boolean
  danger?: boolean
  children: React.ReactNode
}

export function Row({ label, highlight, remaining, danger, children }: RowProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between flex-wrap gap-x-2 gap-y-0.5 px-3 py-2 rounded-md',
        danger
          ? 'bg-red-500/15 border border-red-500/40'
          : remaining
            ? 'bg-rose-500/10 border border-rose-500/20'
            : highlight
              ? 'bg-amber-500/10 border border-amber-500/20'
              : 'hover:bg-bg-muted/50',
      )}
    >
      <span
        className={cn(
          'text-sm',
          danger
            ? 'text-red-400 font-semibold'
            : remaining
              ? 'text-rose-400 font-medium'
              : highlight
                ? 'text-gold-300 font-medium'
                : 'text-text-muted',
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          'text-sm font-mono shrink-0',
          danger
            ? 'text-red-400 font-bold'
            : remaining
              ? 'text-rose-400 font-semibold'
              : highlight
                ? 'text-gold-300 font-semibold'
                : 'text-text',
        )}
      >
        {children}
      </div>
    </div>
  )
}
