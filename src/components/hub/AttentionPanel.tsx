import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface AttentionPanelProps {
  title: string
  items: { label: string; value: number | string | ReactNode }[]
  borderColorClass: string
}

export function AttentionPanel({ title, items, borderColorClass }: AttentionPanelProps) {
  return (
    <div
      className={cn(
        'bg-white p-6 rounded-lg shadow-sm border border-border border-l-4',
        borderColorClass,
      )}
    >
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
            <span className="text-xl font-bold text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
