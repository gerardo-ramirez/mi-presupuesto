import { cn } from '@/lib/utils'

interface RowProps {
  label: React.ReactNode
  highlight?: boolean
  children: React.ReactNode
  className?: string
}

export function Row({ label, highlight, children, className }: RowProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-3 py-2 rounded-md',
        highlight
          ? 'bg-amber-500/10 border border-amber-500/20'
          : 'hover:bg-gray-800/50',
        className,
      )}
    >
      <span className={cn('text-sm', highlight ? 'text-amber-300 font-medium' : 'text-gray-400')}>
        {label}
      </span>
      <div className={cn('text-sm font-mono', highlight ? 'text-amber-300 font-semibold' : 'text-gray-200')}>
        {children}
      </div>
    </div>
  )
}
