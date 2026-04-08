import { Button } from '@/components/ui/button'
import type { Expense } from '../types/customBudget.types'

interface ExpenseListProps {
  expenses: Expense[]
  onRemove: (id: string) => void
}

export function ExpenseList({ expenses, onRemove }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="text-xs text-gray-600 italic px-3 py-1">Sin gastos</p>
  }

  return (
    <ul className="space-y-1">
      {expenses.map((e) => (
        <li key={e.id} className="flex items-center justify-between px-3 py-1 rounded-md hover:bg-gray-800/50">
          <span className="text-sm text-gray-400 truncate max-w-[60%]">
            {e.nombre ?? '—'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-200">
              $ {e.monto.toLocaleString('es-AR')}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(e.id)}
              className="h-5 w-5 p-0 text-gray-600 hover:text-red-400 hover:bg-red-950/30"
            >
              ✕
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
