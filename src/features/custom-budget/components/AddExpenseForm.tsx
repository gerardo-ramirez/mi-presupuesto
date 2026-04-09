import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface AddExpenseFormProps {
  onAdd: (monto: number, nombre?: string) => void
  withName?: boolean
}

export function AddExpenseForm({ onAdd, withName = false }: AddExpenseFormProps) {
  const [nombre, setNombre] = useState('')
  const [monto, setMonto] = useState('')
  const montoRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const cleaned = monto.replace(/[^0-9.]/g, '')
    const parsed = parseFloat(cleaned)
    if (isNaN(parsed) || parsed <= 0) return
    onAdd(parsed, withName && nombre.trim() ? nombre.trim() : undefined)
    setNombre('')
    setMonto('')
  }

  const handleMontoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="flex items-center gap-1 px-3 py-1">
      {withName && (
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') montoRef.current?.focus() }}
          placeholder="Agregá un gasto"
          maxLength={200}
          className="h-7 bg-gray-800 border-gray-700 text-gray-200 text-xs placeholder:text-gray-600 focus-visible:ring-amber-500 focus-visible:border-amber-500"
        />
      )}
      <Input
        ref={montoRef}
        value={monto}
        onChange={(e) => setMonto(e.target.value.replace(/[^0-9.]/g, ''))}
        onKeyDown={handleMontoKeyDown}
        placeholder="Monto"
        inputMode="decimal"
        className="h-7 bg-gray-800 border-gray-700 text-gray-200 text-xs placeholder:text-gray-600 focus-visible:ring-amber-500 focus-visible:border-amber-500"
      />
      <Button
        type="button"
        size="sm"
        onClick={handleSubmit}
        className="h-7 px-2 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs"
      >
        {withName ? '+' : 'Aplicar'}
      </Button>
    </div>
  )
}
