import type { BudgetData, BudgetCalculations, ElementoComprado } from '../types/budget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { GastosList } from './GastosList'
import { AddGastoForm } from './AddGastoForm'
import { Separator } from '@/components/ui/separator'

interface FiwindSectionProps {
  data: Pick<BudgetData, 'gastosGenerales'>
  elementosComprados: ElementoComprado[]
  calculations: Pick<BudgetCalculations, 'totalElementosComprados' | 'gastosDisponible'>
  onUpdate: <K extends keyof BudgetData>(key: K, value: BudgetData[K]) => void
  onAddElemento: (nombre: string, monto: number) => void
  onRemoveElemento: (id: string) => void
}

export function FiwindSection({
  data,
  elementosComprados,
  calculations,
  onUpdate,
  onAddElemento,
  onRemoveElemento,
}: FiwindSectionProps) {
  return (
    <SectionCard title="Fiwind — Gastos Generales" icon="🧾">
      <Row label="Presupuesto">
        <EditableNumber value={data.gastosGenerales} onChange={(v) => onUpdate('gastosGenerales', v)} />
      </Row>
      <Separator className="bg-gray-800 my-2" />
      <GastosList items={elementosComprados} onRemove={onRemoveElemento} />
      <AddGastoForm
        onAdd={(monto, nombre) => onAddElemento(nombre ?? '', monto)}
        withName
      />
      <Separator className="bg-gray-800 my-2" />
      <Row label="Gastado">$ {calculations.totalElementosComprados.toLocaleString('es-AR')}</Row>
      <Row label="Disponible" highlight>
        $ {calculations.gastosDisponible.toLocaleString('es-AR')}
      </Row>
    </SectionCard>
  )
}
