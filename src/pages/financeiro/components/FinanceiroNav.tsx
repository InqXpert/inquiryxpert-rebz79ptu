import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function FinanceiroNav() {
  const location = useLocation()
  const navItems = [
    { title: 'Dashboard', url: '/financeiro' },
    { title: 'Clientes', url: '/financeiro/clientes' },
    { title: 'Períodos', url: '/financeiro/periodos' },
    { title: 'Notas Fiscais', url: '/financeiro/notas-fiscais' },
    { title: 'Controle', url: '/financeiro/controle' },
  ]

  return (
    <nav className="flex space-x-4 border-b border-border pb-4 mb-6 overflow-x-auto no-scrollbar">
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.url ||
          (item.url !== '/financeiro' && location.pathname.startsWith(item.url))
        return (
          <Link
            key={item.url}
            to={item.url}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary whitespace-nowrap',
              isActive
                ? 'text-brand-navy border-b-2 border-brand-navy pb-4 -mb-[17px]'
                : 'text-muted-foreground',
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
