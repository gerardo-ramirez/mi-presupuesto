import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CounterProps {
  value: number
  onChange: (v: number) => void
  label?: string
  className?: string
}

export function Counter({ value, onChange, label, className }: CounterProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {label && <span className="text-gray-400 text-sm">{label}</span>}
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
          className="h-7 w-7 p-0 text-gray-400 hover:text-amber-400 hover:bg-gray-800"
        >
          −
        </Button>
        <span className="font-mono text-amber-300 min-w-[2rem] text-center">{value}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange(value + 1)}
          className="h-7 w-7 p-0 text-gray-400 hover:text-amber-400 hover:bg-gray-800"
        >
          +
        </Button>
      </div>
    </div>
  )
}
