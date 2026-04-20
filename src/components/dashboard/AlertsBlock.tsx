import { Link, useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { useProcessAlerts, ProcessoAlert } from '@/hooks/use-process-alerts'
import { AlertCircle, Clock, ClipboardList } from 'lucide-react'

export function AlertsBlock() {
  const { overdue, upcoming, priority, loading } = useProcessAlerts()
  const navigate = useNavigate()

  const renderOverdueItem = (item: ProcessoAlert) => (
    <div
      key={item.id}
      className="flex flex-row justify-between items-center text-sm text-muted-foreground"
    >
      <span
        className="font-mono text-foreground truncate mr-2"
        title={item.numero_processo || item.numero_controle || item.id}
      >
        {item.numero_processo || item.numero_controle || item.id}
      </span>
      <span className="text-xs text-destructive whitespace-nowrap">
        ({item.dias_atrasado} {item.dias_atrasado === 1 ? 'dia atrasado' : 'dias atrasados'})
      </span>
    </div>
  )

  const renderUpcomingItem = (item: ProcessoAlert) => (
    <div
      key={item.id}
      className="flex flex-row justify-between items-center text-sm text-muted-foreground"
    >
      <span
        className="font-mono text-foreground truncate mr-2"
        title={item.numero_processo || item.numero_controle || item.id}
      >
        {item.numero_processo || item.numero_controle || item.id}
      </span>
      <span className="text-xs text-accent whitespace-nowrap">
        (vence em {item.dias_para_vencer} {item.dias_para_vencer === 1 ? 'dia' : 'dias'})
      </span>
    </div>
  )

  const renderPriorityItem = (item: ProcessoAlert) => (
    <div
      key={item.id}
      className="flex flex-row justify-between items-center text-sm text-muted-foreground"
    >
      <span
        className="font-mono text-foreground truncate mr-2"
        title={item.numero_processo || item.numero_controle || item.id}
      >
        {item.numero_processo || item.numero_controle || item.id}
      </span>
      <span className="text-xs text-primary uppercase whitespace-nowrap">
        {item.prioridade || 'alta'}
      </span>
    </div>
  )

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg p-4 border-l-4 border-border">
              <div className="flex items-center mb-3">
                <Skeleton className="w-5 h-5 mr-2 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Skeleton className="h-10 w-full sm:w-36 rounded-md" />
          <Skeleton className="h-10 w-full sm:w-36 rounded-md" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Atrasados */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-l-destructive">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-5 h-5 mr-2 text-destructive" />
            <h3 className="text-lg font-semibold text-foreground">Atrasados</h3>
          </div>
          {overdue.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo atrasado</p>
          ) : (
            <div className="flex flex-col gap-2">
              {overdue.map(renderOverdueItem)}
              <Link
                to="/processos?filter=overdue"
                className="text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Próximos */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-l-accent">
          <div className="flex items-center mb-3">
            <Clock className="w-5 h-5 mr-2 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Próximos</h3>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo próximo</p>
          ) : (
            <div className="flex flex-col gap-2">
              {upcoming.map(renderUpcomingItem)}
              <Link
                to="/processos?filter=upcoming"
                className="text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Prioritários */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-l-primary">
          <div className="flex items-center mb-3">
            <ClipboardList className="w-5 h-5 mr-2 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Prioritários</h3>
          </div>
          {priority.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo prioritário</p>
          ) : (
            <div className="flex flex-col gap-2">
              {priority.map(renderPriorityItem)}
              <Link
                to="/processos?filter=priority"
                className="text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button
          onClick={() => navigate('/processos')}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 w-full sm:w-auto"
        >
          Meus Processos
        </button>
        <button
          onClick={() => navigate('/notificacoes')}
          className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 w-full sm:w-auto"
        >
          Notificações
        </button>
      </div>
    </div>
  )
}
