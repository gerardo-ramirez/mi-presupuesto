import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ICONS = [
  { emoji: '💰', label: 'Dinero' },
  { emoji: '🏦', label: 'Banco' },
  { emoji: '📚', label: 'Estudio' },
  { emoji: '🚗', label: 'Auto' },
  { emoji: '⛽', label: 'Nafta' },
  { emoji: '🛒', label: 'Compras' },
  { emoji: '🏖️', label: 'Vacaciones' },
  { emoji: '📁', label: 'General' },
]

interface IconPickerProps {
  value: string
  onChange: (v: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-7 w-14 bg-transparent border-none text-base px-1 focus:ring-0 focus:ring-offset-0">
        <SelectValue>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-gray-900 border-gray-700">
        {ICONS.map(({ emoji, label }) => (
          <SelectItem
            key={emoji}
            value={emoji}
            className="text-gray-200 focus:bg-amber-500/20 focus:text-amber-300 cursor-pointer"
          >
            {emoji} {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
