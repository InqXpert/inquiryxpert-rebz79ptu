import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, FileText, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-xl border shadow-sm">
        <div className="flex items-center gap-5">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center gap-6">
          <div className="flex gap-3">
            <Button disabled size="lg" className="shadow-sm">
              <Plus className="w-4 h-4 mr-2" /> Novo Processo
            </Button>
            <Button disabled variant="outline" size="lg" className="shadow-sm">
              <FileText className="w-4 h-4 mr-2" /> Nova Sindicância
            </Button>
          </div>
          <Skeleton className="h-[60px] w-[60px] rounded-full shrink-0" />
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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-6 rounded-xl border shadow-sm">
      <div className="flex items-center gap-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Olá, {user?.name || user?.nome || 'Usuário'}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-medium tabular-nums">
              {hours}:{minutes}:{seconds}
            </span>
            <span className="text-sm ml-2">{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center gap-6">
        <div className="flex gap-3">
          <Button asChild size="lg" className="shadow-sm" disabled={loading}>
            <Link to="/processos/novo">
              <Plus className="w-4 h-4 mr-2" /> Novo Processo
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="shadow-sm" disabled={loading}>
            <Link to="/sindicancia/nova">
              <FileText className="w-4 h-4 mr-2" /> Nova Sindicância
            </Link>
          </Button>
        </div>
        <Avatar className="h-[60px] w-[60px] border-2 border-primary/10 shrink-0">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="text-xl font-medium bg-primary/10 text-primary">
            {user?.name?.[0] || user?.nome?.[0] || 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
