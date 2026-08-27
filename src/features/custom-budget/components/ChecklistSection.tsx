import { Separator } from '@/components/ui/separator'
import type { CustomSection, SectionCalculations } from '../types/customBudget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { ChecklistExpenseList } from './ChecklistExpenseList'
import { AddExpenseForm } from './AddExpenseForm'
import { shareText } from '@/lib/share'
import { buildChecklistShareMessage } from '../utils/shareMessage'

interface ChecklistSectionProps {
  section: CustomSection
  calculations: SectionCalculations
  onUpdate: (updates: Partial<CustomSection>) => void
  onAddExpense: (monto: number, nombre?: string) => void
  onRemoveExpense: (expenseId: string) => void
  onUpdateExpense: (expenseId: string, monto: number) => void
  onToggleExpenseDone: (expenseId: string) => void
  onRemove: () => void
  onComplete: () => void
}

export function ChecklistSection({
  section,
  calculations,
  onUpdate,
  onAddExpense,
  onRemoveExpense,
  onUpdateExpense,
  onToggleExpenseDone,
  onRemove,
  onComplete,
}: ChecklistSectionProps) {
  const totalExpenses = section.expenses.reduce((acc, e) => acc + e.monto, 0)
  const excedido = totalExpenses > section.totalAmount
  const exceso = totalExpenses - section.totalAmount

  return (
    <SectionCard
      title={section.title}
      icon={section.icon}
      onRemove={onRemove}
      onTitleChange={(title) => onUpdate({ title })}
      onIconChange={(icon) => onUpdate({ icon })}
      onComplete={onComplete}
      isCompleted={section.completed}
      onShare={() => shareText(buildChecklistShareMessage(section, calculations), section.title)}
    >
      <Row label="Monto total">
        <EditableNumber value={section.totalAmount} onChange={(v) => onUpdate({ totalAmount: v })} />
      </Row>
      <Separator className="bg-bg-muted my-1" />
      <ChecklistExpenseList
        expenses={section.expenses}
        onRemove={onRemoveExpense}
        onUpdate={onUpdateExpense}
        onToggleDone={onToggleExpenseDone}
      />
      <AddExpenseForm onAdd={onAddExpense} withName />
      <Separator className="bg-bg-muted my-1" />
      <Row label="Gastado" highlight>
        $ {(calculations.totalGastado ?? 0).toLocaleString('es-AR')}
      </Row>
      <Row label="Disponible">
        $ {(calculations.disponible ?? 0).toLocaleString('es-AR')}
      </Row>
      {excedido && (
        <Row label="Te pasaste del monto total" danger>
          - $ {exceso.toLocaleString('es-AR')}
        </Row>
      )}
    </SectionCard>
  )
}
