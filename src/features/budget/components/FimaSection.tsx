import type { BudgetData, BudgetCalculations } from '../types/budget.types'
import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'
import { Counter } from './Counter'
import { Separator } from '@/components/ui/separator'

interface FimaSectionProps {
  data: Pick<BudgetData, 'fima' | 'montoNafta' | 'precioTanque' | 'tanquesCargados' | 'paraClasesJony' | 'precioClase' | 'clasesCursadas'>
  calculations: Pick<BudgetCalculations, 'naftaRestante' | 'tanquesTotales' | 'tanquesRestantes' | 'clasesTotales' | 'clasesRestantes' | 'clasesMontoRestante'>
  onUpdate: <K extends keyof BudgetData>(key: K, value: BudgetData[K]) => void
}

export function FimaSection({ data, calculations, onUpdate }: FimaSectionProps) {
  return (
    <SectionCard title="FIMA" icon="💼">
      <Row label="Saldo total" highlight>
        <EditableNumber value={data.fima} onChange={(v) => onUpdate('fima', v)} />
      </Row>

      <Separator className="bg-gray-800 my-3" />
      <p className="text-xs uppercase tracking-widest text-gray-600 px-3 pb-1">⛽ Nafta</p>

      <Row label="Monto asignado">
        <EditableNumber value={data.montoNafta} onChange={(v) => onUpdate('montoNafta', v)} />
      </Row>
      <Row label="Precio por tanque">
        <EditableNumber value={data.precioTanque} onChange={(v) => onUpdate('precioTanque', v)} />
      </Row>
      <Row label="Tanques totales">{calculations.tanquesTotales}</Row>
      <Counter
        value={data.tanquesCargados}
        onChange={(v) => onUpdate('tanquesCargados', v)}
        label="Tanques cargados"
        className="px-3 py-2"
      />
      <Row label="Tanques restantes">{calculations.tanquesRestantes}</Row>
      <Row label="Monto restante" remaining>
        $ {calculations.naftaRestante.toLocaleString('es-AR')}
      </Row>

      <Separator className="bg-gray-800 my-3" />
      <p className="text-xs uppercase tracking-widest text-gray-600 px-3 pb-1">🎸 Clases Jony</p>

      <Row label="Monto asignado">
        <EditableNumber value={data.paraClasesJony} onChange={(v) => onUpdate('paraClasesJony', v)} />
      </Row>
      <Row label="Precio por clase">
        <EditableNumber value={data.precioClase} onChange={(v) => onUpdate('precioClase', v)} />
      </Row>
      <Row label="Clases totales">{calculations.clasesTotales}</Row>
      <Counter
        value={data.clasesCursadas}
        onChange={(v) => onUpdate('clasesCursadas', v)}
        label="Clases cursadas"
        className="px-3 py-2"
      />
      <Row label="Clases restantes">{calculations.clasesRestantes}</Row>
      <Row label="Monto restante" remaining>
        $ {calculations.clasesMontoRestante.toLocaleString('es-AR')}
      </Row>
    </SectionCard>
  )
}
