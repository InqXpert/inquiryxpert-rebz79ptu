import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActionCardProps {
  to: string
  icon: LucideIcon
  title: string
  description?: string
  primary?: boolean
  onClick?: () => void
}

export function ActionCard({
  to,
  icon: Icon,
  title,
  description,
  primary,
  onClick,
}: ActionCardProps) {
  const content = (
    <div
      className={cn(
        'group flex flex-col h-full bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200',
        primary
          ? 'bg-primary text-primary-foreground border-primary hover:border-primary/90'
          : 'hover:border-primary',
      )}
    >
      <div className={cn('p-3 rounded-lg w-fit mb-4', primary ? 'bg-white/20' : 'bg-primary/10')}>
        <Icon className={cn('w-6 h-6', primary ? 'text-white' : 'text-primary')} />
      </div>
      <h3 className={cn('text-lg font-semibold', primary ? 'text-white' : 'text-foreground')}>
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            'text-sm mt-1',
            primary ? 'text-primary-foreground/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="w-full h-full text-left block">
        {content}
      </button>
    )
  }

  return (
    <Link to={to} className="block w-full h-full">
      {content}
    </Link>
  )
}
