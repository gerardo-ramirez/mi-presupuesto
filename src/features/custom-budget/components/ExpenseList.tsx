import { Button } from '@/components/ui/button'
import type { Expense, Separator } from '../types/customBudget.types'
import { EditableNumber } from './EditableNumber'

interface ExpenseListProps {
  expenses: Expense[]
  separators?: Separator[]
  onRemove: (id: string) => void
  onUpdate: (id: string, monto: number) => void
  onRemoveSeparator?: (id: string) => void
}

type MergedItem =
  | { kind: 'expense'; order: number; data: Expense }
  | { kind: 'separator'; order: number; data: Separator }

export function ExpenseList({ expenses, separators = [], onRemove, onUpdate, onRemoveSeparator }: ExpenseListProps) {
  if (expenses.length === 0 && separators.length === 0) {
    return <p className="text-xs text-text-subtle italic px-3 py-1">Sin gastos</p>
  }

  const merged: MergedItem[] = [
    ...expenses.map((e, i) => ({ kind: 'expense' as const, order: e.order ?? i, data: e })),
    ...separators.map((s) => ({ kind: 'separator' as const, order: s.order, data: s })),
  ].sort((a, b) => a.order - b.order)

  return (
    <ul className="space-y-1">
      {merged.map((item) =>
        item.kind === 'separator' ? (
          <li
            key={item.data.id}
            className="flex items-center justify-between px-3 py-1 my-1 rounded-md bg-sky-500/10 border border-sky-500/30"
          >
            <span className="text-xs font-medium text-sky-300 truncate">{item.data.label}</span>
            {onRemoveSeparator && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveSeparator(item.data.id)}
                className="h-5 w-5 p-0 text-sky-600 hover:text-red-400 hover:bg-red-950/30"
              >
                ✕
              </Button>
            )}
          </li>
        ) : (
          <li key={item.data.id} className="flex items-center justify-between px-3 py-1 rounded-md hover:bg-bg-muted/50">
            <span className="text-sm text-text-muted truncate max-w-[60%]">
              {item.data.nombre ?? '—'}
            </span>
            <div className="flex items-center gap-2">
              <EditableNumber value={item.data.monto} onChange={(v) => onUpdate(item.data.id, v)} positive />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.data.id)}
                className="h-5 w-5 p-0 text-text-subtle hover:text-red-400 hover:bg-red-950/30"
              >
                ✕
              </Button>
            </div>
          </li>
        ),
      )}
    </ul>
  )
}
