import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { SectionType } from '../types/customBudget.types'

interface AddSectionButtonProps {
  onAdd: (type: SectionType) => void
}

const OPTIONS: { type: SectionType; emoji: string; label: string; description: string }[] = [
  { type: 'simple', emoji: '💰', label: 'Simple', description: 'Monto + lista de gastos' },
  { type: 'equivalence', emoji: '📊', label: 'Equivalencia', description: 'Monto + unidades consumibles' },
  { type: 'conversion', emoji: '💱', label: 'Conversión', description: 'Divisa + divisiones' },
]

export function AddSectionButton({ onAdd }: AddSectionButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-500/50 bg-transparent text-sm"
        >
          + Agregar sección
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-gray-900 border-gray-700 w-56"
        align="center"
      >
        {OPTIONS.map(({ type, emoji, label, description }) => (
          <DropdownMenuItem
            key={type}
            onClick={() => onAdd(type)}
            className="flex flex-col items-start gap-0.5 cursor-pointer focus:bg-amber-500/20 focus:text-amber-300 py-2"
          >
            <span className="text-gray-200 font-medium text-sm">
              {emoji} {label}
            </span>
            <span className="text-gray-500 text-xs">{description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
