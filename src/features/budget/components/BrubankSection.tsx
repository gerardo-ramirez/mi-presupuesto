import type { BrubankGasto } from '../types/budget.types'
import type { BudgetCalculations } from '../types/budget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { GastosList } from './GastosList'
import { AddGastoForm } from './AddGastoForm'
import { Separator } from '@/components/ui/separator'

interface BrubankSectionProps {
  brubank: number
  brubankGastos: BrubankGasto[]
  calculations: Pick<BudgetCalculations, 'totalBrubankGastado' | 'brubankRestante'>
  onBrubankChange: (v: number) => void
  onAddGasto: (monto: number) => void
  onRemoveGasto: (id: string) => void
}

export function BrubankSection({
  brubank,
  brubankGastos,
  calculations,
  onBrubankChange,
  onAddGasto,
  onRemoveGasto,
}: BrubankSectionProps) {
  return (
    <SectionCard title="Brubank" icon="🏦">
      <Row label="Saldo">
        <EditableNumber value={brubank} onChange={onBrubankChange} />
      </Row>
      <Separator className="bg-gray-800 my-2" />
      <GastosList items={brubankGastos} onRemove={onRemoveGasto} />
      <AddGastoForm onAdd={onAddGasto} withName={false} />
      <Separator className="bg-gray-800 my-2" />
      <Row label="Gastado">$ {calculations.totalBrubankGastado.toLocaleString('es-AR')}</Row>
      <Row label="Disponible" highlight>
        $ {calculations.brubankRestante.toLocaleString('es-AR')}
      </Row>
    </SectionCard>
  )
}
