import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react'
import { useGestaoAgentes } from '@/hooks/useGestaoAgentes'
import { getDashboardStats } from '@/services/gestaoAgentes'
import { Skeleton } from '@/components/ui/skeleton'

export default function GestaoAgentesDashboard() {
  const { agenteId, loading, initAgente } = useGestaoAgentes()
  const [stats, setStats] = useState({ ativos: 0, concluidos: 0, pendentes: 0, prazos: 0 })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    initAgente()
  }, [initAgente])

  useEffect(() => {
    if (agenteId) {
      getDashboardStats(agenteId).then((data) => {
        setStats(data)
        setLoadingStats(false)
      })
    }
  }, [agenteId])

  if (loading || loadingStats) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#282c59]">Painel do Agente</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral das suas atividades e processos pendentes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border shadow-sm rounded-2xl bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                  Processos Ativos
                </p>
                <h3 className="text-3xl font-bold text-[#282c59]">{stats.ativos}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#2bc8cf]/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#2bc8cf]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm rounded-2xl bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                  Prazos Próximos
                </p>
                <h3 className="text-3xl font-bold text-[#282c59]">{stats.prazos}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm rounded-2xl bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                  Pendências de Áudio
                </p>
                <h3 className="text-3xl font-bold text-destructive">{stats.pendentes}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm rounded-2xl bg-card hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                  Processos Concluídos
                </p>
                <h3 className="text-3xl font-bold text-[#282c59]">{stats.concluidos}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#b1dad5]/50 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#282c59]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card">
        <CardHeader className="border-b border-border p-6">
          <CardTitle className="text-lg font-bold text-[#282c59]">Avisos e Notificações</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8 text-muted-foreground flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <p className="font-medium text-[15px]">Nenhuma notificação recente.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
