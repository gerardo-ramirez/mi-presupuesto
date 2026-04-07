import type { BudgetData, BudgetCalculations } from '../types/budget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'

interface GaliciaAutoSectionProps {
  data: Pick<BudgetData, 'dolarAuto' | 'autoViejoVendido'>
  calculations: Pick<BudgetCalculations, 'pesosAuto' | 'totalPresupuestoAuto'>
  onUpdate: <K extends keyof BudgetData>(key: K, value: BudgetData[K]) => void
}

export function GaliciaAutoSection({ data, calculations, onUpdate }: GaliciaAutoSectionProps) {
  return (
    <SectionCard title="Galicia — Auto" icon="🚗">
      <Row label="Dólares">
        <EditableNumber value={data.dolarAuto} onChange={(v) => onUpdate('dolarAuto', v)} prefix="USD" />
      </Row>
      <Row label="Equivale en pesos">$ {calculations.pesosAuto.toLocaleString('es-AR')}</Row>
      <Row label="Auto viejo vendido">
        <EditableNumber value={data.autoViejoVendido} onChange={(v) => onUpdate('autoViejoVendido', v)} />
      </Row>
      <Row label="Total presupuesto auto" highlight>
        $ {calculations.totalPresupuestoAuto.toLocaleString('es-AR')}
      </Row>
    </SectionCard>
  )
}
