import type { BudgetData, BudgetCalculations } from '../types/budget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'

interface GaliciaSueldoSectionProps {
  data: Pick<BudgetData, 'dolarSueldo'>
  calculations: Pick<BudgetCalculations, 'pesosSueldo' | 'sueldo4' | 'sueldo5' | 'sueldo6'>
  onUpdate: <K extends keyof BudgetData>(key: K, value: BudgetData[K]) => void
}

export function GaliciaSueldoSection({ data, calculations, onUpdate }: GaliciaSueldoSectionProps) {
  return (
    <SectionCard title="Galicia — Sueldo" icon="💰">
      <Row label="Dólares">
        <EditableNumber value={data.dolarSueldo} onChange={(v) => onUpdate('dolarSueldo', v)} prefix="USD" />
      </Row>
      <Row label="Equivale en pesos">$ {calculations.pesosSueldo.toLocaleString('es-AR')}</Row>
      <Row label="A 4 meses" highlight>$ {Math.round(calculations.sueldo4).toLocaleString('es-AR')}</Row>
      <Row label="A 5 meses" highlight>$ {Math.round(calculations.sueldo5).toLocaleString('es-AR')}</Row>
      <Row label="A 6 meses" highlight>$ {Math.round(calculations.sueldo6).toLocaleString('es-AR')}</Row>
    </SectionCard>
  )
}
