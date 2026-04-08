import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EditableText } from './EditableText'

interface DivisionManagerProps {
  divisions: number[]
  divisionLabel: string
  equivalencia: number
  onAdd: (parts: number) => void
  onRemove: (index: number) => void
  onLabelChange: (label: string) => void
}

export function DivisionManager({
  divisions,
  divisionLabel,
  equivalencia,
  onAdd,
  onRemove,
  onLabelChange,
}: DivisionManagerProps) {
  const [raw, setRaw] = useState('')

  const handleAdd = () => {
    const parsed = parseInt(raw)
    if (isNaN(parsed) || parsed <= 0) return
    onAdd(parsed)
    setRaw('')
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 px-3 py-1">
        <span className="text-xs text-gray-500">Dividir en</span>
        <EditableText value={divisionLabel} onChange={onLabelChange} />
      </div>

      {divisions.map((parts, index) => (
        <div key={index} className="flex items-center justify-between px-3 py-1 rounded-md hover:bg-gray-800/50">
          <span className="text-sm text-gray-400">
            A {parts} {divisionLabel}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-200">
              $ {Math.round(equivalencia / parts).toLocaleString('es-AR')}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
              className="h-5 w-5 p-0 text-gray-600 hover:text-red-400 hover:bg-red-950/30"
            >
              ✕
            </Button>
          </div>
        </div>
      ))}

      {divisions.length < 3 && (
        <div className="flex items-center gap-1 px-3 py-1">
          <Input
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }}
            placeholder="Partes"
            className="h-7 w-20 bg-gray-800 border-gray-700 text-gray-200 text-xs placeholder:text-gray-600 focus-visible:ring-amber-500 focus-visible:border-amber-500"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleAdd}
            className="h-7 px-2 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs"
          >
            +
          </Button>
        </div>
      )}
    </div>
  )
}
