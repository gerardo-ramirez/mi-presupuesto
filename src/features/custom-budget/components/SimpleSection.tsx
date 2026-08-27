import { Separator as UiSeparator } from '@/components/ui/separator'
import type { CustomSection, SectionCalculations } from '../types/customBudget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { ExpenseList } from './ExpenseList'
import { AddExpenseForm } from './AddExpenseForm'
import { AddSeparatorForm } from './AddSeparatorForm'
import { shareText } from '@/lib/share'
import { buildSimpleShareMessage } from '../utils/shareMessage'

interface SimpleSectionProps {
  section: CustomSection
  calculations: SectionCalculations
  onUpdate: (updates: Partial<CustomSection>) => void
  onAddExpense: (monto: number, nombre?: string) => void
  onRemoveExpense: (expenseId: string) => void
  onUpdateExpense: (expenseId: string, monto: number) => void
  onUpdateExpenseName: (expenseId: string, nombre: string) => void
  onAddSeparator: (label: string) => void
  onRemoveSeparator: (separatorId: string) => void
  onUpdateSeparatorLabel: (separatorId: string, label: string) => void
  onRemove: () => void
  onComplete: () => void
}

export function SimpleSection({
  section,
  calculations,
  onUpdate,
  onAddExpense,
  onRemoveExpense,
  onUpdateExpense,
  onUpdateExpenseName,
  onAddSeparator,
  onRemoveSeparator,
  onUpdateSeparatorLabel,
  onRemove,
  onComplete,
}: SimpleSectionProps) {
  const disponible = calculations.disponible ?? 0
  const excedido = disponible < 0
  return (
    <SectionCard
      title={section.title}
      icon={section.icon}
      onRemove={onRemove}
      onTitleChange={(title) => onUpdate({ title })}
      onIconChange={(icon) => onUpdate({ icon })}
      onComplete={onComplete}
      isCompleted={section.completed}
      onShare={() => shareText(buildSimpleShareMessage(section, calculations), section.title)}
    >
      <Row label="Monto total">
        <EditableNumber value={section.totalAmount} onChange={(v) => onUpdate({ totalAmount: v })} />
      </Row>
      <UiSeparator className="bg-bg-muted my-1" />
      <ExpenseList
        expenses={section.expenses}
        separators={section.separators}
        onRemove={onRemoveExpense}
        onUpdate={onUpdateExpense}
        onUpdateName={onUpdateExpenseName}
        onRemoveSeparator={onRemoveSeparator}
        onUpdateSeparatorLabel={onUpdateSeparatorLabel}
      />
      <AddExpenseForm onAdd={onAddExpense} withName />
      <AddSeparatorForm onAdd={onAddSeparator} />
      <UiSeparator className="bg-bg-muted my-1" />
      <Row label="Gastado">
        $ {(calculations.totalGastado ?? 0).toLocaleString('es-AR')}
      </Row>
      <Row label="Disponible" remaining>
        $ {disponible.toLocaleString('es-AR')}
      </Row>
      {excedido && (
        <Row label="Te pasaste del monto total" danger>
          - $ {Math.abs(disponible).toLocaleString('es-AR')}
        </Row>
      )}
    </SectionCard>
  )
}
