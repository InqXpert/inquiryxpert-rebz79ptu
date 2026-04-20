import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useDigitalClock } from '@/hooks/use-digital-clock'

export function UserGreeting() {
  const { user, avatarUrl, loading, error } = useCurrentUser()
  const { hours, minutes, seconds, time } = useDigitalClock()

  useEffect(() => {
    if (error) {
      toast.error('Não foi possível carregar usuário')
    }
  }, [error])

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 shadow-sm mb-6">
        <div className="flex flex-col gap-1 w-full lg:w-auto items-center lg:items-start">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">
          <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full" />
          <div className="flex flex-row gap-2 w-full lg:w-auto">
            <Skeleton className="h-10 w-full lg:w-32 rounded-md" />
            <Skeleton className="h-10 w-full lg:w-36 rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  // Format date with capitalized words for days and months
  const dateStr = format(time, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
  const formattedDate = dateStr
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 shadow-sm mb-6">
      <div className="flex flex-col gap-1 w-full lg:w-auto items-center lg:items-start text-center lg:text-left">
        <h1 className="text-2xl font-bold text-foreground">
          Olá, {user?.name || user?.nome || 'Usuário'}
        </h1>
        <span className="text-sm text-muted-foreground">{formattedDate}</span>
        <span className="text-lg font-mono text-primary font-semibold">
          {hours}:{minutes}:{seconds}
        </span>
      </div>

      <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">
        <Avatar className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-primary">
          <AvatarImage src={avatarUrl} className="object-cover" />
          <AvatarFallback className="flex items-center justify-center bg-secondary text-secondary-foreground w-full h-full">
            {user?.name?.[0] || user?.nome?.[0] || 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-row gap-2 w-full lg:w-auto">
          <Link
            to="/processos/novo"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 text-center"
          >
            Novo Processo
          </Link>
          <Link
            to="/sindicancia/nova"
            className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 text-center"
          >
            Nova Sindicância
          </Link>
        </div>
      </div>
    </div>
  )
}
