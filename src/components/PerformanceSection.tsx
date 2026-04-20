import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <section
      className={cn('space-y-4 pt-4 border-t', loading ? 'pointer-events-none opacity-80' : '')}
    >
      <h2 className="text-xl font-bold tracking-tight">Performance Pessoal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Pendentes/Atraso
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-black text-destructive">
                {data?.pendentesAtraso || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              SLA Médio (Dias)
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-black">{data?.slaMedioDias || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Concluídos (Mês)
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-black text-green-500">{data?.concluidosMes || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Taxa de Conclusão
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-3xl font-black text-blue-500">{data?.taxaConclusao || 0}%</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            RESULTADO DOS PROCESSOS CONCLUIDOS (Ultimos 30 dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-5 w-1/4 mt-4" />
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-border/50">
                <span className="font-medium">REGULAR:</span>
                <span className="text-muted-foreground">
                  {data?.statusBreakdown.regular.count || 0} (
                  {data?.statusBreakdown.regular.percentage || 0}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border/50">
                <span className="font-medium">IRREGULAR:</span>
                <span className="text-muted-foreground">
                  {data?.statusBreakdown.irregular.count || 0} (
                  {data?.statusBreakdown.irregular.percentage || 0}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border/50">
                <span className="font-medium">ANALISE:</span>
                <span className="text-muted-foreground">
                  {data?.statusBreakdown.analise.count || 0} (
                  {data?.statusBreakdown.analise.percentage || 0}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-border/50">
                <span className="font-medium">CONDICIONADO:</span>
                <span className="text-muted-foreground">
                  {data?.statusBreakdown.condicionado.count || 0} (
                  {data?.statusBreakdown.condicionado.percentage || 0}%)
                </span>
              </div>
              <div className="pt-2 font-bold text-foreground">
                Total: {data?.statusBreakdown.total30Days || 0} processos concluidos
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
