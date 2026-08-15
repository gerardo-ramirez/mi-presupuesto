import { Square, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Expense } from '../types/customBudget.types'
import { EditableNumber } from './EditableNumber'

interface ChecklistExpenseListProps {
  expenses: Expense[]
  onRemove: (id: string) => void
  onUpdate: (id: string, monto: number) => void
  onToggleDone: (id: string) => void
}

export function ChecklistExpenseList({ expenses, onRemove, onUpdate, onToggleDone }: ChecklistExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="text-xs text-text-subtle italic px-3 py-1">Sin gastos</p>
  }

  return (
    <ul className="space-y-1">
      {expenses.map((e) => (
        <li key={e.id} className="flex items-center justify-between px-3 py-1 rounded-md hover:bg-bg-muted/50">
          <button
            type="button"
            onClick={() => onToggleDone(e.id)}
            className="flex items-start gap-2 min-w-0 flex-1 text-left"
            title={e.done ? 'Marcar como pendiente' : 'Marcar como hecho'}
          >
            {e.done ? (
              <CheckSquare className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <Square className="h-4 w-4 text-text-subtle shrink-0 mt-0.5" />
            )}
            <span
              className={cn(
                'text-sm line-clamp-2 break-words min-w-0',
                e.done ? 'text-text-subtle line-through' : 'text-text-muted',
              )}
            >
              {e.nombre ?? '—'}
            </span>
          </button>
          <div className="flex items-center gap-2 shrink-0">
            <EditableNumber value={e.monto} onChange={(v) => onUpdate(e.id, v)} positive />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(e.id)}
              className="h-5 w-5 p-0 text-text-subtle hover:text-red-400 hover:bg-red-950/30"
            >
              ✕
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
