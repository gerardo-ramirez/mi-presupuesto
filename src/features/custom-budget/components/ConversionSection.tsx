import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import type { CustomSection, SectionCalculations } from '../types/customBudget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { EditableText } from './EditableText'
import { DivisionManager } from './DivisionManager'

interface ConversionSectionProps {
  section: CustomSection
  calculations: SectionCalculations
  currencyName: string
  onUpdate: (updates: Partial<CustomSection>) => void
  onAddDivision: (parts: number) => void
  onRemoveDivision: (index: number) => void
  onRemove: () => void
}

export function ConversionSection({
  section,
  calculations,
  currencyName,
  onUpdate,
  onAddDivision,
  onRemoveDivision,
  onRemove,
}: ConversionSectionProps) {
  const [showExtra, setShowExtra] = useState(!!(section.extraLabel || (section.extraAmount ?? 0) > 0))
  const equivalencia = calculations.equivalenciaPesos ?? 0

  return (
    <SectionCard
      title={section.title}
      icon={section.icon}
      onRemove={onRemove}
      onTitleChange={(title) => onUpdate({ title })}
      onIconChange={(icon) => onUpdate({ icon })}
    >
      {/* Toggle useCurrency */}
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          type="button"
          onClick={() => onUpdate({ useCurrency: !section.useCurrency })}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
            section.useCurrency ? 'bg-amber-500' : 'bg-gray-700'
          }`}
        >
          <span
            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
              section.useCurrency ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="text-xs text-gray-400">Usar tipo de cambio</span>
      </div>

      {section.useCurrency ? (
        <>
          <Row label={`Monto en ${currencyName}`}>
            <EditableNumber
              value={section.currencyAmount ?? 0}
              onChange={(v) => onUpdate({ currencyAmount: v })}
              prefix="USD"
            />
          </Row>
          <Row label="Equivale en pesos" highlight>
            $ {equivalencia.toLocaleString('es-AR')}
          </Row>
        </>
      ) : (
        <Row label="Monto en pesos">
          <EditableNumber
            value={section.totalAmount}
            onChange={(v) => onUpdate({ totalAmount: v })}
          />
        </Row>
      )}

      {/* Extra amount */}
      {showExtra ? (
        <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-800/50">
          <span className="text-sm text-gray-400 flex items-center gap-1">
            <EditableText
              value={section.extraLabel || 'Extra'}
              onChange={(v) => onUpdate({ extraLabel: v })}
              className="normal-case tracking-normal"
            />
          </span>
          <EditableNumber
            value={section.extraAmount ?? 0}
            onChange={(v) => onUpdate({ extraAmount: v })}
          />
        </div>
      ) : (
        <div className="px-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => { setShowExtra(true); onUpdate({ extraLabel: 'Extra', extraAmount: 0 }) }}
            className="h-6 text-xs text-gray-600 hover:text-amber-400 px-0"
          >
            + Agregar monto extra
          </Button>
        </div>
      )}

      {(section.extraAmount ?? 0) > 0 && (
        <Row label="Total" highlight>
          $ {(calculations.totalConExtra ?? 0).toLocaleString('es-AR')}
        </Row>
      )}

      <Separator className="bg-gray-800 my-2" />

      <DivisionManager
        divisions={section.divisions ?? []}
        divisionLabel={section.divisionLabel ?? 'partes'}
        equivalencia={equivalencia}
        onAdd={onAddDivision}
        onRemove={onRemoveDivision}
        onLabelChange={(v) => onUpdate({ divisionLabel: v })}
      />
    </SectionCard>
  )
}
