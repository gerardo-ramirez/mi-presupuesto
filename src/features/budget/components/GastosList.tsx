import { cn } from '@/lib/utils'

interface GastosListItem {
  id: string
  nombre?: string
  monto: number
}

interface GastosListProps {
  items: GastosListItem[]
  onRemove: (id: string) => void
  className?: string
}

export function GastosList({ items, onRemove, className }: GastosListProps) {
  if (items.length === 0) return null

  return (
    <ul className={cn('space-y-1', className)}>
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-md bg-gray-800/60 text-sm"
        >
          <span className="text-gray-300 truncate">
            {item.nombre ? `${item.nombre} — ` : ''}
            <span className="font-mono text-amber-300">
              $ {item.monto.toLocaleString('es-AR')}
            </span>
          </span>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded shrink-0"
            aria-label="Eliminar gasto"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
