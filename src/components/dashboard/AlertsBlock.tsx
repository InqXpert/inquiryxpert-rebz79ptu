import { memo, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { useAlertas } from '@/hooks/useAlertas'
import { Alerta } from '@/types/alerta'
import { ShieldAlert, Clock, ClipboardList } from 'lucide-react'
import { useHubPage } from '@/contexts/hub-page-context'

export const AlertsBlock = memo(function AlertsBlock() {
  const { alertas, loading, error, dismissedIds } = useAlertas()
  const { selectedDate } = useHubPage()
  const navigate = useNavigate()

  if (error) {
    throw new Error(error)
  }

  const activeAlerts = useMemo(
    () => alertas.filter((a) => !dismissedIds.includes(a.id)),
    [alertas, dismissedIds],
  )

  const filterByDate = (list: Alerta[]) => {
    if (!selectedDate) return list
    return list.filter((item) => {
      if (!item.data) return false
      const d = new Date(item.data)
      return (
        d.getDate() === selectedDate.getDate() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getFullYear() === selectedDate.getFullYear()
      )
    })
  }

  const overdue = useMemo(() => activeAlerts.filter((a) => a.tipo === 'VENCIDO'), [activeAlerts])
  const upcoming = useMemo(
    () => activeAlerts.filter((a) => a.tipo === 'PROXIMO_VENCIMENTO'),
    [activeAlerts],
  )
  const priority = useMemo(
    () => activeAlerts.filter((a) => a.tipo === 'ALTA_PRIORIDADE'),
    [activeAlerts],
  )

  const filteredOverdue = useMemo(() => filterByDate(overdue), [overdue, selectedDate])
  const filteredUpcoming = useMemo(() => filterByDate(upcoming), [upcoming, selectedDate])
  const filteredPriority = useMemo(() => filterByDate(priority), [priority, selectedDate])

  const dateQuery = selectedDate ? `&date=${format(selectedDate, 'yyyy-MM-dd')}` : ''

  const renderItem = (item: Alerta, highlightClass: string, text: string) => (
    <div
      key={item.id}
      className="flex flex-row justify-between items-center text-sm text-muted-foreground"
    >
      <span className="font-mono text-foreground truncate mr-2" title={item.numeroProcesso}>
        {item.numeroProcesso}
      </span>
      <span className={`text-xs whitespace-nowrap ${highlightClass}`} title={item.mensagem}>
        {text}
      </span>
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
          <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-500" /> Alertas Críticos
        </h2>
        {selectedDate && (
          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            Filtrando por: {format(selectedDate, 'dd/MM/yyyy')}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Vencidos */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-red-600 dark:border-red-500 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center mb-3">
            <ShieldAlert className="w-5 h-5 mr-2 text-red-600 dark:text-red-500" />
            <h3 className="text-lg font-semibold text-foreground">Vencidos</h3>
          </div>
          {filteredOverdue.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo vencido</p>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredOverdue
                .slice(0, 3)
                .map((item) => renderItem(item, 'text-red-600 dark:text-red-500', `Vencido`))}
              <Link
                to={`/processos/alertas?tipo=VENCIDO${dateQuery}`}
                className="text-sm text-red-600 dark:text-red-500 cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos ({filteredOverdue.length}) &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Próximos */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-orange-600 dark:border-orange-500 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center mb-3">
            <Clock className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-500" />
            <h3 className="text-lg font-semibold text-foreground">Próximos do Vencimento</h3>
          </div>
          {filteredUpcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo próximo</p>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredUpcoming
                .slice(0, 3)
                .map((item) => renderItem(item, 'text-orange-600 dark:text-orange-500', `Atenção`))}
              <Link
                to={`/processos/alertas?tipo=PROXIMO_VENCIMENTO${dateQuery}`}
                className="text-sm text-orange-600 dark:text-orange-500 cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos ({filteredUpcoming.length}) &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Prioritários */}
        <div className="bg-card rounded-lg p-4 border-l-4 border-fuchsia-600 dark:border-fuchsia-500 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center mb-3">
            <ClipboardList className="w-5 h-5 mr-2 text-fuchsia-600 dark:text-fuchsia-500" />
            <h3 className="text-lg font-semibold text-foreground">Prioritários</h3>
          </div>
          {filteredPriority.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">Nenhum processo prioritário</p>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredPriority
                .slice(0, 3)
                .map((item) =>
                  renderItem(item, 'text-fuchsia-600 dark:text-fuchsia-500 uppercase', 'Alta'),
                )}
              <Link
                to={`/processos/alertas?tipo=ALTA_PRIORIDADE${dateQuery}`}
                className="text-sm text-fuchsia-600 dark:text-fuchsia-500 cursor-pointer hover:underline mt-2 block font-medium"
              >
                Ver Todos ({filteredPriority.length}) &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-6">
        <button
          onClick={() => navigate('/processos/alertas')}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          Central de Alertas
        </button>
        <button
          onClick={() => navigate('/processos')}
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-semibold hover:bg-secondary/80 transition-colors w-full sm:w-auto border border-border"
        >
          Ir para Processos
        </button>
      </div>
    </div>
  )
})
