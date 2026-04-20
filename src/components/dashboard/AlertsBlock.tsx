import { Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useProcessAlerts, ProcessoAlert } from '@/hooks/use-process-alerts'
import { AlertCircle, Clock, ClipboardList } from 'lucide-react'

export function AlertsBlock() {
  const { overdue, upcoming, priority, loading } = useProcessAlerts()
  const navigate = useNavigate()

  const renderOverdueItem = (item: ProcessoAlert) => (
    <div
      key={item.id}
      className="flex justify-between items-center text-sm border-b border-border/50 last:border-0 py-2.5"
    >
      <span
        className="font-medium text-foreground truncate mr-2"
        title={item.numero_processo || item.numero_controle || item.id}
      >
        {item.numero_processo || item.numero_controle || item.id}
      </span>
      <span className="text-destructive font-semibold text-xs whitespace-nowrap">
        ({item.dias_atrasado} {item.dias_atrasado === 1 ? 'dia atrasado' : 'dias atrasados'})
      </span>
    </div>
  )

  const renderUpcomingItem = (item: ProcessoAlert) => (
    <div
      key={item.id}
      className="flex justify-between items-center text-sm border-b border-border/50 last:border-0 py-2.5"
    >
      <span
        className="font-medium text-foreground truncate mr-2"
        title={item.numero_processo || item.numero_controle || item.id}
      >
        {item.numero_processo || item.numero_controle || item.id}
      </span>
      <span className="text-orange-500 font-semibold text-xs whitespace-nowrap">
        (vence em {item.dias_para_vencer} {item.dias_para_vencer === 1 ? 'dia' : 'dias'})
      </span>
    </div>
  )

  const renderPriorityItem = (item: ProcessoAlert) => (
    <div
      key={item.id}
      className="flex justify-between items-center text-sm border-b border-border/50 last:border-0 py-2.5"
    >
      <span
        className="font-medium text-foreground truncate mr-2"
        title={item.numero_processo || item.numero_controle || item.id}
      >
        {item.numero_processo || item.numero_controle || item.id}
      </span>
      <span className="text-blue-500 font-semibold text-xs uppercase whitespace-nowrap bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded-full">
        {item.prioridade || 'alta'}
      </span>
    </div>
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-none shadow-sm rounded-2xl">
              <CardHeader className="pb-3 border-b border-border/50">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button disabled variant="default" className="font-semibold px-6">
            Meus Processos
          </Button>
          <Button disabled variant="secondary" className="font-semibold px-6">
            Notificações
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Atrasados */}
        <Card className="border-none shadow-sm rounded-2xl flex flex-col hover:shadow-md transition-shadow">
          <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <CardTitle className="text-base font-bold text-destructive">ATRASADOS</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex flex-col">
            <div className="flex-1 mb-4">
              {overdue.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  Nenhum processo atrasado
                </p>
              ) : (
                <div className="space-y-1">{overdue.map(renderOverdueItem)}</div>
              )}
            </div>
            <Button variant="outline" className="w-full text-xs font-semibold" asChild>
              <Link to="/processos?filter=overdue">Ver Todos &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Próximos */}
        <Card className="border-none shadow-sm rounded-2xl flex flex-col hover:shadow-md transition-shadow">
          <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <CardTitle className="text-base font-bold text-orange-600">PRÓXIMOS</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex flex-col">
            <div className="flex-1 mb-4">
              {upcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  Nenhum processo próximo
                </p>
              ) : (
                <div className="space-y-1">{upcoming.map(renderUpcomingItem)}</div>
              )}
            </div>
            <Button variant="outline" className="w-full text-xs font-semibold" asChild>
              <Link to="/processos?filter=upcoming">Ver Todos &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Prioritários */}
        <Card className="border-none shadow-sm rounded-2xl flex flex-col hover:shadow-md transition-shadow">
          <CardHeader className="pb-3 border-b border-border/50 flex flex-row items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-base font-bold text-blue-600">PRIORITÁRIOS</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex flex-col">
            <div className="flex-1 mb-4">
              {priority.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">
                  Nenhum processo prioritário
                </p>
              ) : (
                <div className="space-y-1">{priority.map(renderPriorityItem)}</div>
              )}
            </div>
            <Button variant="outline" className="w-full text-xs font-semibold" asChild>
              <Link to="/processos?filter=priority">Ver Todos &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <Button
          variant="default"
          className="font-semibold px-6"
          onClick={() => navigate('/processos')}
        >
          Meus Processos
        </Button>
        <Button
          variant="secondary"
          className="font-semibold px-6"
          onClick={() => navigate('/notificacoes')}
        >
          Notificações
        </Button>
      </div>
    </div>
  )
}
