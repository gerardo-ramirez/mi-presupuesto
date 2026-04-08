import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconPicker } from './IconPicker'
import { EditableText } from './EditableText'

interface SectionCardProps {
  title: string
  icon: string
  children: React.ReactNode
  onRemove?: () => void
  onTitleChange?: (title: string) => void
  onIconChange?: (icon: string) => void
}

export function SectionCard({
  title,
  icon,
  children,
  onRemove,
  onTitleChange,
  onIconChange,
}: SectionCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 shadow-lg">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {onIconChange ? (
              <IconPicker value={icon} onChange={onIconChange} />
            ) : (
              <span className="text-base">{icon}</span>
            )}
            {onTitleChange ? (
              <EditableText value={title} onChange={onTitleChange} />
            ) : (
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-300">
                {title}
              </span>
            )}
          </div>
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-6 w-6 p-0 text-gray-600 hover:text-red-400 hover:bg-red-950/30"
              title="Eliminar sección"
            >
              ✕
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-1">{children}</CardContent>
    </Card>
  )
}
