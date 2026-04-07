import type { BudgetData, BudgetCalculations } from '../types/budget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'

interface RipioSectionProps {
  data: Pick<BudgetData, 'ripioPorDia'>
  calculations: Pick<BudgetCalculations, 'diasRipio' | 'diasTranscurridos' | 'totalRipioObjetivo' | 'totalRipioAcumulado'>
  onUpdate: <K extends keyof BudgetData>(key: K, value: BudgetData[K]) => void
}

export function RipioSection({ data, calculations, onUpdate }: RipioSectionProps) {
  const progreso = calculations.diasRipio > 0
    ? Math.round((calculations.diasTranscurridos / calculations.diasRipio) * 100)
    : 0

  return (
    <SectionCard title="Ripio" icon="🪨">
      <Row label="Ahorro por día">
        <EditableNumber value={data.ripioPorDia} onChange={(v) => onUpdate('ripioPorDia', v)} />
      </Row>
      <Row label="Período">25/03/2026 → 01/12/2026</Row>
      <Row label="Días totales">{calculations.diasRipio}</Row>
      <Row label="Días transcurridos">{calculations.diasTranscurridos} ({progreso}%)</Row>
      <Row label="Objetivo total">$ {calculations.totalRipioObjetivo.toLocaleString('es-AR')}</Row>
      <Row label="Acumulado a hoy" highlight>
        $ {calculations.totalRipioAcumulado.toLocaleString('es-AR')}
      </Row>
    </SectionCard>
  )
}
