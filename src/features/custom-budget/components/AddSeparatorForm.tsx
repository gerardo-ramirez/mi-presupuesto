import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { sanitizeSafeText } from '@/lib/sanitize'

interface AddSeparatorFormProps {
  onAdd: (label: string) => void
}

export function AddSeparatorForm({ onAdd }: AddSeparatorFormProps) {
  const [expanded, setExpanded] = useState(false)
  const [label, setLabel] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const trimmed = label.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setLabel('')
    setExpanded(false)
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => {
          setExpanded(true)
          setTimeout(() => inputRef.current?.focus(), 0)
        }}
        className="px-3 py-0.5 text-xs text-sky-500/70 hover:text-sky-400 transition-colors"
      >
        + agregar separador
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1 px-3 py-1">
      <Input
        ref={inputRef}
        value={label}
        onChange={(e) => setLabel(sanitizeSafeText(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit()
          if (e.key === 'Escape') setExpanded(false)
        }}
        onBlur={() => { if (!label.trim()) setExpanded(false) }}
        placeholder="Ej: A partir de acá, gastos de supermercado"
        maxLength={100}
        className="h-7 bg-bg-muted border-sky-700 text-text text-xs placeholder:text-text-subtle focus-visible:ring-sky-500 focus-visible:border-sky-500"
      />
      <Button
        type="button"
        size="sm"
        onClick={handleSubmit}
        className="h-7 px-2 bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/30 text-xs"
      >
        +
      </Button>
    </div>
  )
}
