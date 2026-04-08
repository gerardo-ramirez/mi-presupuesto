import { Button } from '@/components/ui/button'

interface CounterProps {
  value: number
  onChange: (v: number) => void
  label?: string
}

export function Counter({ value, onChange, label }: CounterProps) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-gray-400">{label}</span>}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="h-6 w-6 p-0 text-gray-400 hover:text-amber-300 hover:bg-amber-500/10"
      >
        −
      </Button>
      <span className="text-sm font-mono font-semibold text-amber-300 min-w-[2ch] text-center">
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onChange(value + 1)}
        className="h-6 w-6 p-0 text-gray-400 hover:text-amber-300 hover:bg-amber-500/10"
      >
        +
      </Button>
    </div>
  )
}
