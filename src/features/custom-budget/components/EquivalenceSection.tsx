import type { CustomSection, SectionCalculations } from '../types/customBudget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { EditableText } from './EditableText'
import { Counter } from './Counter'

interface EquivalenceSectionProps {
  section: CustomSection
  calculations: SectionCalculations
  onUpdate: (updates: Partial<CustomSection>) => void
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}

export function EquivalenceSection({
  section,
  calculations,
  onUpdate,
  onIncrement,
  onDecrement,
  onRemove,
}: EquivalenceSectionProps) {
  const unitLabel = section.unitLabel ?? 'unidad'

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
      <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800/50">
        <span className="text-sm text-gray-400 flex items-center gap-1">
          Precio por{' '}
          <EditableText
            value={unitLabel}
            onChange={(v) => onUpdate({ unitLabel: v })}
            className="normal-case tracking-normal"
          />
        </span>
        <EditableNumber
          value={section.unitPrice ?? 0}
          onChange={(v) => onUpdate({ unitPrice: v })}
        />
      </div>
      <Row label={`Total ${unitLabel}s`}>
        {calculations.totalUnidades ?? 0}
      </Row>
      <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800/50">
        <span className="text-sm text-gray-400">{unitLabel}s consumidos</span>
        <Counter
          value={section.consumed ?? 0}
          onChange={(v) => {
            if (v > (section.consumed ?? 0)) onIncrement()
            else onDecrement()
          }}
        />
      </div>
      <Row label={`${unitLabel}s restantes`}>
        {calculations.unidadesRestantes ?? 0}
      </Row>
      <Row label="Monto restante" highlight>
        $ {(calculations.montoRestante ?? 0).toLocaleString('es-AR')}
      </Row>
    </SectionCard>
  )
}
