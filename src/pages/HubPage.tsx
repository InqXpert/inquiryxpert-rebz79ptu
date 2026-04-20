import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar as CalendarIcon, Bell } from 'lucide-react'
import { formatISO, startOfDay, endOfDay, format } from 'date-fns'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { NotificacaoAgente } from '@/services/notificacoes_agente'

import { useCurrentUser } from '@/hooks/use-current-user'
import { useProcessStats } from '@/hooks/use-process-stats'
import { usePerformanceMetrics } from '@/hooks/use-performance-metrics'
import { cn } from '@/lib/utils'
import { UserGreeting } from '@/components/UserGreeting'
import { WorkloadCards } from '@/components/WorkloadCards'

export default function HubPage() {
  const { user } = useCurrentUser()

  const { stats, loading: statsLoading } = useProcessStats(user?.id)
  const { metrics, loading: metricsLoading } = usePerformanceMetrics(user?.id)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [dateProcesses, setDateProcesses] = useState<any[]>([])

  const [notifications, setNotifications] = useState<NotificacaoAgente[]>([])

  useEffect(() => {
    if (!user?.id) return
    const fetchNotifs = async () => {
      try {
        const res = await pb.collection('notificacoes_agente').getList<NotificacaoAgente>(1, 15, {
          filter: `agente_id.user_id = "${user.id}"`,
          sort: '-created',
        })
        setNotifications(res.items)
      } catch (err) {
        console.error('Error fetching notifications:', err)
      }
    }
    fetchNotifs()
  }, [user?.id])

  useRealtime('notificacoes_agente', () => {
    if (!user?.id) return
    pb.collection('notificacoes_agente')
      .getList<NotificacaoAgente>(1, 15, {
        filter: `agente_id.user_id = "${user.id}"`,
        sort: '-created',
      })
      .then((res) => setNotifications(res.items))
      .catch(console.error)
  })

  useEffect(() => {
    if (!selectedDate) {
      setDateProcesses([])
      return
    }
    const fetchForDate = async () => {
      const start = formatISO(startOfDay(selectedDate), { representation: 'date' }) + ' 00:00:00'
      const end = formatISO(endOfDay(selectedDate), { representation: 'date' }) + ' 23:59:59'
      try {
        const res = await pb.collection('processos_operacionais').getList(1, 10, {
          filter: `data_prazo >= "${start}" && data_prazo <= "${end}"`,
          sort: '-created',
        })
        setDateProcesses(res.items)
      } catch (e) {
        console.error('Error fetching date processes:', e)
      }
    }
    fetchForDate()
  }, [selectedDate])

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
      </div>

      {/* Zone 5: Interactive Sidebar */}
      <div className="w-full lg:w-[320px] shrink-0 space-y-6 flex flex-col">
        {/* Calendar Widget */}
        <Card className="shadow-sm overflow-hidden border-none ring-1 ring-border">
          <CardHeader className="p-4 border-b bg-card">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" /> Calendário
            </CardTitle>
          </CardHeader>
          <div className="p-3 flex justify-center bg-card">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md pointer-events-auto"
            />
          </div>
          <div className="p-4 border-t bg-muted/40 max-h-[250px] overflow-y-auto">
            <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              {selectedDate
                ? `Processos para ${format(selectedDate, 'dd/MM')}`
                : 'Selecione uma data'}
            </h4>
            {dateProcesses.length === 0 ? (
              <p className="text-sm text-muted-foreground/80 py-2 text-center">
                Nenhum prazo neste dia.
              </p>
            ) : (
              <ul className="space-y-2">
                {dateProcesses.map((p) => (
                  <li
                    key={p.id}
                    className="text-sm flex flex-col gap-1 bg-background p-2.5 rounded-md border shadow-sm hover:border-primary/30 transition-colors"
                  >
                    <Link
                      to={`/processos/${p.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {p.numero_controle || p.numero_processo || 'Processo sem número'}
                    </Link>
                    <span className="text-xs text-muted-foreground font-medium">{p.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        {/* Notifications Feed */}
        <Card className="shadow-sm border-none ring-1 ring-border flex-1 flex flex-col max-h-[500px]">
          <CardHeader className="p-4 border-b bg-card shrink-0">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              Notificações
              <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full ml-auto">
                {notifications.filter((n) => !n.lida).length || 0}
              </span>
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1 bg-card">
            <div className="p-3 space-y-2.5">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground/80 p-4 text-center">
                  Tudo limpo por aqui.
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      'p-3 rounded-md border text-sm transition-colors',
                      n.lida
                        ? 'bg-muted/30 border-transparent'
                        : 'bg-primary/5 border-primary/20 shadow-sm',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-foreground leading-tight">{n.titulo}</p>
                      {!n.lida && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{n.descricao}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-2 font-medium">
                      {format(new Date(n.created), "dd/MM 'às' HH:mm")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}
