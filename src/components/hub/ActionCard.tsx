import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActionCardProps {
  to: string
  icon: LucideIcon
  title: string
  primary?: boolean
  onClick?: () => void
}

export function ActionCard({ to, icon: Icon, title, primary, onClick }: ActionCardProps) {
  const content = (
    <div
      className={cn(
        'group flex flex-col items-center justify-center h-full bg-white p-[12px] md:p-[16px] lg:p-[24px] rounded-lg border border-border transition-all duration-200 animate-fade-in shadow-sm hover:shadow-md hover:border-primary',
        primary ? 'bg-primary text-white border-primary' : 'text-brand-navy',
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center mb-4',
          primary ? 'bg-white' : 'bg-primary/10',
        )}
      >
        <Icon className={cn('w-6 h-6', primary ? 'text-primary' : 'text-primary')} />
      </div>
      <h3
        className={cn(
          'text-[16px] font-bold text-center',
          primary ? 'text-white' : 'text-brand-navy',
        )}
      >
        {title}
      </h3>
    </div>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="w-full h-full block text-left">
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
