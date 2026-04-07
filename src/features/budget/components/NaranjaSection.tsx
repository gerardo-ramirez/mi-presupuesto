import type { BudgetData, BudgetCalculations } from '../types/budget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { Counter } from './Counter'
import { Separator } from '@/components/ui/separator'

interface NaranjaSectionProps {
  data: Pick<BudgetData, 'naranjaPesos' | 'costoSesion' | 'sesionesCursadas' | 'dolaresNaranja' | 'costoVisa'>
  calculations: Pick<BudgetCalculations, 'sesionesDisponibles' | 'sesionesRestantes' | 'mesesVisa'>
  onUpdate: <K extends keyof BudgetData>(key: K, value: BudgetData[K]) => void
}

export function NaranjaSection({ data, calculations, onUpdate }: NaranjaSectionProps) {
  return (
    <SectionCard title="Naranja X" icon="🟠">
      <Row label="Pesos disponibles">
        <EditableNumber value={data.naranjaPesos} onChange={(v) => onUpdate('naranjaPesos', v)} />
      </Row>
      <Row label="Costo sesión">
        <EditableNumber value={data.costoSesion} onChange={(v) => onUpdate('costoSesion', v)} />
      </Row>
      <Row label="Sesiones disponibles">{calculations.sesionesDisponibles}</Row>
      <Counter
        value={data.sesionesCursadas}
        onChange={(v) => onUpdate('sesionesCursadas', v)}
        label="Sesiones cursadas"
        className="px-3 py-2"
      />
      <Row label="Restantes" highlight>{calculations.sesionesRestantes}</Row>
      <Separator className="bg-gray-800 my-2" />
      <Row label="Dólares">
        <EditableNumber value={data.dolaresNaranja} onChange={(v) => onUpdate('dolaresNaranja', v)} prefix="USD" />
      </Row>
      <Row label="Costo Visa (USD/mes)">
        <EditableNumber value={data.costoVisa} onChange={(v) => onUpdate('costoVisa', v)} prefix="USD" />
      </Row>
      <Row label="Meses equivalentes" highlight>{calculations.mesesVisa.toFixed(1)}</Row>
    </SectionCard>
  )
}
