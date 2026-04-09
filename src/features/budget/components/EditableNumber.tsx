import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface EditableNumberProps {
  value: number
  onChange: (v: number) => void
  prefix?: '$' | 'USD'
  className?: string
}

function format(value: number, prefix: '$' | 'USD' = '$'): string {
  if (prefix === 'USD') return `USD ${value.toLocaleString('es-AR')}`
  return `$ ${value.toLocaleString('es-AR')}`
}

export function EditableNumber({ value, onChange, prefix = '$', className }: EditableNumberProps) {
  const [editing, setEditing] = useState(false)
  const [raw, setRaw] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const startEditing = () => {
    setRaw(String(value))
    setEditing(true)
    setTimeout(() => inputRef.current?.select(), 0)
  }

  const confirm = () => {
    const parsed = parseFloat(raw.replace(/[^0-9.]/g, ''))
    if (!isNaN(parsed)) onChange(parsed)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') confirm()
    if (e.key === 'Escape') setEditing(false)
  }

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={raw}
        onChange={(e) => setRaw(e.target.value.replace(/[^0-9.]/g, ''))}
        onBlur={confirm}
        onKeyDown={handleKeyDown}
        inputMode="decimal"
        placeholder="0"
        className={cn(
          'h-7 w-36 bg-gray-800 border-amber-500 text-amber-300 text-sm font-mono',
          'focus-visible:ring-amber-500',
          className,
        )}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className={cn(
        'font-mono text-amber-300 hover:text-amber-200 hover:underline',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded',
        'cursor-pointer transition-colors',
        className,
      )}
    >
      {format(value, prefix)}
    </button>
  )
}
