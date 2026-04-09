import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AddGastoFormProps {
  onAdd: (monto: number, nombre?: string) => void
  withName?: boolean
  className?: string
}

export function AddGastoForm({ onAdd, withName = false, className }: AddGastoFormProps) {
  const [nombre, setNombre] = useState('')
  const [monto, setMonto] = useState('')

  const inputClass = cn(
    'h-8 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-600 text-sm',
    'focus-visible:ring-amber-500 focus-visible:border-amber-500',
  )

  const handleAdd = () => {
    const cleaned = monto.replace(/[^0-9.]/g, '')
    const parsed = parseFloat(cleaned)
    if (isNaN(parsed) || parsed <= 0) return
    onAdd(parsed, withName ? nombre || undefined : undefined)
    setNombre('')
    setMonto('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className={cn('flex items-center gap-2 pt-2', className)}>
      {withName && (
        <Input
          placeholder="Agregá un gasto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={200}
          className={cn(inputClass, 'flex-1')}
        />
      )}
      <Input
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value.replace(/[^0-9.]/g, ''))}
        onKeyDown={handleKeyDown}
        inputMode="decimal"
        className={cn(inputClass, withName ? 'w-28' : 'flex-1')}
      />
      <Button
        type="button"
        onClick={handleAdd}
        size="sm"
        className="h-8 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold shrink-0"
      >
        {withName ? '+' : 'Aplicar'}
      </Button>
    </div>
  )
}
