import { EditableText } from './EditableText'
import { EditableNumber } from './EditableNumber'

interface CurrencyBarProps {
  currencyName: string
  currencyValue: number
  onNameChange: (name: string) => void
  onValueChange: (value: number) => void
}

export function CurrencyBar({
  currencyName,
  currencyValue,
  onNameChange,
  onValueChange,
}: CurrencyBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-base">💵</span>
        <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase">
          Tipo de cambio
        </span>
        <EditableText value={currencyName} onChange={onNameChange} />
      </div>
      <EditableNumber value={currencyValue} onChange={onValueChange} />
    </div>
  )
}
