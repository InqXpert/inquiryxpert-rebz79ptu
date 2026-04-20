import { Skeleton } from '@/components/ui/skeleton'
import { Clock, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusBreakdown {
  regular: { count: number; percentage: number }
  irregular: { count: number; percentage: number }
  analise: { count: number; percentage: number }
  condicionado: { count: number; percentage: number }
  total30Days: number
}

interface AdvancedMetrics {
  pendentesAtraso: number
  slaMedioDias: number
  concluidosMes: number
  taxaConclusao: number
  statusBreakdown: StatusBreakdown
}

export function PerformanceSection({
  loading,
  data,
}: {
  loading: boolean
  data?: AdvancedMetrics
}) {
  return (
    <section className={cn('space-y-4 pt-4', loading ? 'pointer-events-none opacity-80' : '')}>
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">Performance Pessoal</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">
            Pendentes/Atraso
          </span>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-8 h-8 text-2xl text-destructive" />
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl font-bold text-foreground">
                {data?.pendentesAtraso || 0}
              </span>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">
            SLA Médio (Dias)
          </span>
          <div className="flex items-center gap-2">
            <Clock className="w-8 h-8 text-2xl text-muted-foreground" />
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl font-bold text-foreground">{data?.slaMedioDias || 0}</span>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">
            Concluídos (Mês)
          </span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-2xl text-green-500" />
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl font-bold text-foreground">{data?.concluidosMes || 0}</span>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center">
            Taxa de Conclusão
          </span>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-2xl text-blue-500" />
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl font-bold text-foreground">
                {data?.taxaConclusao || 0}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm w-full">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          RESULTADO DOS PROCESSOS CONCLUIDOS (Ultimos 30 dias)
        </h3>

        {loading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-5 w-1/4 mt-4" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">REGULAR:</span>
              <span className="text-sm text-muted-foreground">
                {data?.statusBreakdown.regular.count || 0} (
                {data?.statusBreakdown.regular.percentage || 0}%)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">IRREGULAR:</span>
              <span className="text-sm text-muted-foreground">
                {data?.statusBreakdown.irregular.count || 0} (
                {data?.statusBreakdown.irregular.percentage || 0}%)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">ANALISE:</span>
              <span className="text-sm text-muted-foreground">
                {data?.statusBreakdown.analise.count || 0} (
                {data?.statusBreakdown.analise.percentage || 0}%)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">CONDICIONADO:</span>
              <span className="text-sm text-muted-foreground">
                {data?.statusBreakdown.condicionado.count || 0} (
                {data?.statusBreakdown.condicionado.percentage || 0}%)
              </span>
            </div>

            <div className="flex justify-between items-center border-t border-border pt-3 mt-3">
              <span className="text-sm font-semibold text-foreground">Total:</span>
              <span className="text-sm font-semibold text-foreground">
                {data?.statusBreakdown.total30Days || 0} processos concluidos
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
