import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SectionCardProps {
  title: string
  icon: string
  children: React.ReactNode
  className?: string
}

export function SectionCard({ title, icon, children, className }: SectionCardProps) {
  return (
    <Card className={cn('bg-gray-900 border-gray-800', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500">
          <span>{icon}</span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">{children}</CardContent>
    </Card>
  )
}
