import { SectionCard } from './SectionCard'
import { Row } from './Row'
import { EditableNumber } from './EditableNumber'

interface DolarSectionProps {
  precioDolar: number
  onPrecioDolarChange: (v: number) => void
}

export function DolarSection({ precioDolar, onPrecioDolarChange }: DolarSectionProps) {
  return (
    <SectionCard title="Tipo de Cambio" icon="💵">
      <Row label="Precio USD" highlight>
        <EditableNumber value={precioDolar} onChange={onPrecioDolarChange} />
      </Row>
    </SectionCard>
  )
}
