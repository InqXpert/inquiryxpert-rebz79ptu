import { useNavigate } from 'react-router-dom'
import { Plus, BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProcessosList } from '@/hooks/useProcessosList'
import { ProcessosListTable } from '@/components/operacional/ProcessosListTable'
import { ProcessosListFilters } from '@/components/operacional/ProcessosListFilters'
import { useAuth } from '@/hooks/use-auth'
import { useAlertas } from '@/hooks/useAlertas'
import { cn } from '@/lib/utils'

export default function Processos() {
  const state = useProcessosList()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { alertas, dismissedIds } = useAlertas()

  const canViewAlerts = user?.role && ['c-level', 'admin', 'supervisor'].includes(user.role)

  const activeAlerts = alertas.filter((a) => !dismissedIds.includes(a.id))
  const alertsCount = activeAlerts.length

  const hasVencido = activeAlerts.some((a) => a.tipo === 'VENCIDO')
  const hasProximoVencimento = activeAlerts.some((a) => a.tipo === 'PROXIMO_VENCIMENTO')

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8 animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-brand-navy dark:text-white mb-1">
            Processos
          </h1>
          <p className="text-[14px] text-brand-gray dark:text-brand-light font-medium">
            Acompanhamento de investigações
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {canViewAlerts && (
            <Button
              onClick={() => navigate('/processos/alertas')}
              variant={alertsCount > 0 ? 'default' : 'outline'}
              className={cn(
                'font-bold shadow-sm transition-all duration-300 relative',
                alertsCount === 0 && 'bg-white dark:bg-transparent',
                alertsCount > 0 &&
                  hasVencido &&
                  'bg-red-600 text-white hover:bg-red-700 animate-pulse dark:bg-red-600 dark:text-white dark:hover:bg-red-700',
                alertsCount > 0 &&
                  hasProximoVencimento &&
                  !hasVencido &&
                  'bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600',
              )}
            >
              <BellRing className="w-4 h-4 mr-2" />
              Central de Alertas
              {alertsCount > 0 && (
                <span
                  className={cn(
                    'ml-2 inline-flex items-center justify-center rounded-full h-5 min-w-[20px] px-1.5 text-[11px] font-bold',
                    hasVencido && 'bg-white text-red-600',
                    hasProximoVencimento && !hasVencido && 'bg-white text-orange-500',
                    !hasVencido &&
                      !hasProximoVencimento &&
                      'bg-white text-brand-navy dark:bg-brand-navy dark:text-brand-cyan',
                  )}
                >
                  {alertsCount}
                </span>
              )}
            </Button>
          )}
          <Button
            onClick={() => navigate('/processos/novo')}
            className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Processo
          </Button>
        </div>
      </div>

      <div className="sticky top-0 z-20 bg-background/95 dark:bg-brand-navy/95 backdrop-blur-md py-4 px-4 md:px-6 -mx-4 md:-mx-6 mb-6">
        <ProcessosListFilters {...state} />
      </div>

      <ProcessosListTable
        processos={state.data}
        loading={state.loading}
        hasMore={state.hasMore}
        onLoadMore={state.loadMore}
        rawCount={state.rawCount}
      />
    </div>
  )
}
