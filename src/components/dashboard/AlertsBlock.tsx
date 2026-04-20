import { memo, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { useProcessAlerts, ProcessoAlert } from '@/hooks/use-process-alerts'
import { AlertCircle, Clock, ClipboardList } from 'lucide-react'
import { useHubPage } from '@/contexts/hub-page-context'

export const AlertsBlock = memo(function AlertsBlock() {
  const { overdue, upcoming, priority, loading, error } = useProcessAlerts()
  const { selectedDate } = useHubPage()
  const navigate = useNavigate()

  if (error) {
    throw error
  }

  const filterByDate = (list: ProcessoAlert[]) => {
    if (!selectedDate) return list
    return list.filter((item) => {
      if (!item.data_prazo) return false
      const d = new Date(item.data_prazo)
      return (
        d.getDate() === selectedDate.getDate() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getFullYear() === selectedDate.getFullYear()
      )
    })
  }

  const filteredOverdue = useMemo(() => filterByDate(overdue), [overdue, selectedDate])
  const filteredUpcoming = useMemo(() => filterByDate(upcoming), [upcoming, selectedDate])
  const filteredPriority = useMemo(() => filterByDate(priority), [priority, selectedDate])

  const dateQuery = selectedDate ? `&date=${format(selectedDate, 'yyyy-MM-dd')}` : ''

  const renderItem = (item: ProcessoAlert, highlightClass: string, text: string) => (
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
      <span className={`text-xs whitespace-nowrap ${highlightClass}`}>{text}</span>
    </div>
  )

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-sm mb-6 border border-border">
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
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm mb-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-destructive" /> Alertas Críticos
        </h2>
        {selectedDate && (
          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            Filtrando por: {format(selectedDate, 'dd/MM/yyyy')}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Atrasados */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-5 h-5 mr-2 text-destructive" />
            <h3 className="text-lg font-semibold text-foreground">Atrasados</h3>
          </div>
          {filteredOverdue.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo atrasado</p>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredOverdue
                .slice(0, 3)
                .map((item) =>
                  renderItem(
                    item,
                    'text-destructive',
                    `(${item.dias_atrasado} ${item.dias_atrasado === 1 ? 'dia' : 'dias'})`,
                  ),
                )}
              <Link
                to={`/processos?filter=overdue${dateQuery}`}
                className="text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Próximos */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-l-accent shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center mb-3">
            <Clock className="w-5 h-5 mr-2 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Próximos</h3>
          </div>
          {filteredUpcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo próximo</p>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredUpcoming
                .slice(0, 3)
                .map((item) =>
                  renderItem(
                    item,
                    'text-accent',
                    `(em ${item.dias_para_vencer} ${item.dias_para_vencer === 1 ? 'dia' : 'dias'})`,
                  ),
                )}
              <Link
                to={`/processos?filter=upcoming${dateQuery}`}
                className="text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Prioritários */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center mb-3">
            <ClipboardList className="w-5 h-5 mr-2 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Prioritários</h3>
          </div>
          {filteredPriority.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo prioritário</p>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredPriority
                .slice(0, 3)
                .map((item) =>
                  renderItem(item, 'text-primary uppercase', item.prioridade || 'alta'),
                )}
              <Link
                to={`/processos?filter=priority${dateQuery}`}
                className="text-sm text-primary cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-6">
        <button
          onClick={() => navigate('/processos')}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          Meus Processos
        </button>
        <button
          onClick={() => navigate('/notificacoes')}
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          Notificações
        </button>
      </div>
    </div>
  )
})
