import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SortableItemProps {
  id: string
  children: React.ReactNode
}

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="relative group"
    >
      {/* Drag handle — centrado en el borde superior de la card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <button
          {...attributes}
          {...listeners}
          className={cn(
            'pointer-events-auto flex items-center gap-1 px-3 py-1 rounded-b-lg',
            'bg-gray-800 border border-t-0 border-gray-700',
            'text-gray-500 hover:text-gray-300 hover:border-gray-600 hover:bg-gray-700',
            'cursor-grab active:cursor-grabbing',
            'transition-all duration-150',
            // siempre visible levemente (para touch), más al hover
            'opacity-40 group-hover:opacity-100',
            isDragging && 'opacity-100 cursor-grabbing text-amber-400 border-amber-500/50 bg-amber-950/30',
          )}
          aria-label="Arrastrar para reordenar"
        >
          <GripHorizontal className="h-3 w-3" />
        </button>
      </div>

      {/* Contenido con efecto visual al arrastrar */}
      <div
        className={cn(
          'transition-[opacity,transform,box-shadow] duration-200',
          isDragging && [
            'opacity-40',
            'scale-[0.97]',
            'ring-2 ring-amber-500/50',
            'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
            'rounded-xl',
          ],
        )}
      >
        {children}
      </div>
    </div>
  )
}
