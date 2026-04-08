import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { cn } from '@/lib/utils'

interface DolarSectionProps {
  precioDolar: number
  currencyName: string
  onPrecioDolarChange: (v: number) => void
  onCurrencyNameChange: (v: string) => void
}

function EditableLabel({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
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
        className="h-6 w-28 bg-gray-800 border-amber-500 text-amber-300 text-xs font-semibold tracking-widest uppercase focus-visible:ring-amber-500 px-2"
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
      )}
      title="Click para editar nombre"
    >
      {value}
    </button>
  )
}

export function DolarSection({
  precioDolar,
  currencyName,
  onPrecioDolarChange,
  onCurrencyNameChange,
}: DolarSectionProps) {
  return (
    <SectionCard title="Tipo de Cambio" icon="💵">
      <Row label={<EditableLabel value={currencyName} onChange={onCurrencyNameChange} />} highlight>
        <EditableNumber value={precioDolar} onChange={onPrecioDolarChange} />
      </Row>
    </SectionCard>
  )
}
