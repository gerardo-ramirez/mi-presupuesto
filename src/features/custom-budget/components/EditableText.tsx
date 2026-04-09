import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface EditableTextProps {
  value: string
  onChange: (v: string) => void
  className?: string
  placeholder?: string
}

export function EditableText({ value, onChange, className, placeholder = 'Agregá un título' }: EditableTextProps) {
  const [editing, setEditing] = useState(false)
  const [raw, setRaw] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const startEditing = () => {
    setRaw(value)
    setEditing(true)
    setTimeout(() => inputRef.current?.select(), 0)
  }

  const confirm = () => {
    const trimmed = raw.trim()
    if (trimmed) onChange(trimmed)
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
        onChange={(e) => setRaw(e.target.value)}
        onBlur={confirm}
        onKeyDown={handleKeyDown}
        maxLength={50}
        placeholder={placeholder}
        className={cn(
          'h-6 bg-gray-800 border-amber-500 text-amber-300 text-xs font-semibold tracking-widest uppercase focus-visible:ring-amber-500 px-2',
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
        'text-xs font-semibold tracking-widest uppercase text-amber-300',
        'hover:text-amber-200 hover:underline underline-offset-2',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded',
        'cursor-pointer transition-colors',
        className,
      )}
      title="Click para editar"
    >
      {value || placeholder}
    </button>
  )
}
