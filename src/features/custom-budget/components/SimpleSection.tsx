import { Separator } from '@/components/ui/separator'
import type { CustomSection, SectionCalculations } from '../types/customBudget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { ExpenseList } from './ExpenseList'
import { AddExpenseForm } from './AddExpenseForm'

interface SimpleSectionProps {
  section: CustomSection
  calculations: SectionCalculations
  onUpdate: (updates: Partial<CustomSection>) => void
  onAddExpense: (monto: number, nombre?: string) => void
  onRemoveExpense: (expenseId: string) => void
  onRemove: () => void
}

export function SimpleSection({
  section,
  calculations,
  onUpdate,
  onAddExpense,
  onRemoveExpense,
  onRemove,
}: SimpleSectionProps) {
  return (
    <SectionCard
      title={section.title}
      icon={section.icon}
      onRemove={onRemove}
      onTitleChange={(title) => onUpdate({ title })}
      onIconChange={(icon) => onUpdate({ icon })}
    >
      <Row label="Monto total">
        <EditableNumber value={section.totalAmount} onChange={(v) => onUpdate({ totalAmount: v })} />
      </Row>
      <Separator className="bg-gray-800 my-1" />
      <ExpenseList expenses={section.expenses} onRemove={onRemoveExpense} />
      <AddExpenseForm onAdd={onAddExpense} withName />
      <Separator className="bg-gray-800 my-1" />
      <Row label="Gastado">
        $ {(calculations.totalGastado ?? 0).toLocaleString('es-AR')}
      </Row>
      <Row label="Disponible" remaining>
        $ {(calculations.disponible ?? 0).toLocaleString('es-AR')}
      </Row>
    </SectionCard>
  )
}
