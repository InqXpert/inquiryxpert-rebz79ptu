import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { useCurrentUser } from '@/hooks/use-current-user'
import { useProcessStats } from '@/hooks/use-process-stats'
import { usePerformanceMetrics } from '@/hooks/use-performance-metrics'
import { UserGreeting } from '@/components/UserGreeting'
import { WorkloadCards } from '@/components/WorkloadCards'
import { PerformanceSection } from '@/components/PerformanceSection'
import { InteractiveCalendar } from '@/components/InteractiveCalendar'
import { NotificationsPanel } from '@/components/NotificationsPanel'

export default function HubPage() {
  const { user } = useCurrentUser()

  const { stats, loading: statsLoading } = useProcessStats(user?.id)
  const { metrics, advancedMetrics, loading: metricsLoading } = usePerformanceMetrics(user?.id)

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans">
      <div className="flex-1 space-y-8">
        {/* Zone 1: Greeting & Quick Actions Header */}
        <UserGreeting />

        {/* Zone 2: Critical Alerts Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Bell className="w-5 h-5 text-destructive" /> Alertas Críticos
            </h2>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" asChild>
                <Link to="/processos">Meus Processos</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link to="/notificacoes">Notificações</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Atrasados
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-3xl font-black text-destructive">{stats.atrasados}</div>
                )}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Próximos Vencimentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-3xl font-black text-orange-500">
                    {stats.proximosVencimentos}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Alta Prioridade
                </CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-3xl font-black text-purple-500">{stats.altaPrioridade}</div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Zone 3: Workload Status Cards */}
        <WorkloadCards userId={user?.id} />

        {/* Zone 4: Personal Performance KPIs */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Meus KPIs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-muted/30 shadow-sm border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metricsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{metrics.pendentes}</div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-muted/30 shadow-sm border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  SLA Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metricsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">
                    {metrics.slaMedio}{' '}
                    <span className="text-sm font-normal text-muted-foreground">dias</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-muted/30 shadow-sm border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Concluídos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metricsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{metrics.totalConcluidos}</div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-muted/30 shadow-sm border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa de Eficiência
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metricsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{metrics.taxaSucesso}%</div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Zone 6: Performance Pessoal */}
        <PerformanceSection loading={metricsLoading} data={advancedMetrics} />
      </div>

      {/* Zone 5: Interactive Sidebar */}
      <div className="w-full lg:w-[320px] shrink-0 space-y-6 flex flex-col">
        <InteractiveCalendar />
        <NotificationsPanel />
      </div>
    </div>
  )
}
