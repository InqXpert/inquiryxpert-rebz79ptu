import pb from '@/lib/pocketbase/client'
import { ProcessoOperacional, NotificacaoAgente } from '@/types'
import { startOfMonth, subDays, format, differenceInHours } from 'date-fns'

export interface DashboardStats {
  totalProcessos: number
  emAndamentoCount: number
  concluidosMesCount: number
  taxaConclusao: number
  taxaConclusaoTrend: 'up' | 'down' | 'neutral'
  tempoMedioHoras: number
  tempoMedioTrend: 'up' | 'down' | 'neutral'
  statusChart: { name: string; value: number; fill: string }[]
  trendChart: { date: string; concluidos: number }[]
  recentes: ProcessoOperacional[]
  unreadMessages: number
  agenteName: string
}

export const fetchDashboardStats = async (agenteId: string): Promise<DashboardStats> => {
  const [processosRes, notificacoesRes, agenteRes] = await Promise.all([
    pb.collection('processos_operacionais').getFullList<ProcessoOperacional>({
      filter: `agente_id = "${agenteId}"`,
      sort: '-created',
    }),
    pb.collection('notificacoes_agente').getList<NotificacaoAgente>(1, 1, {
      filter: `agente_id = "${agenteId}" && lida = false && tipo = 'mensagem'`,
    }),
    pb.collection('agentes').getOne(agenteId),
  ])

  const processos = processosRes

  const emAndamentoStatuses = ['em_elaboracao', 'em_execucao', 'analise_inicial', 'em_andamento']
  const pendenteStatuses = ['pendente', 'bloqueado_sem_audio']
  const concluidoStatuses = ['concluido', 'finalizado']

  const emAndamento = processos.filter((p) => emAndamentoStatuses.includes(p.status))
  const concluidos = processos.filter((p) => concluidoStatuses.includes(p.status))
  const pendentesCount = processos.filter((p) => pendenteStatuses.includes(p.status)).length

  const startOfCurrentMonth = startOfMonth(new Date())
  const concluidosMes = concluidos.filter((p) => new Date(p.updated) >= startOfCurrentMonth)

  const now = new Date()
  const thirtyDaysAgo = subDays(now, 30)
  const sixtyDaysAgo = subDays(now, 60)

  const processosLast30 = processos.filter((p) => new Date(p.created) >= thirtyDaysAgo)
  const concluidosLast30 = processosLast30.filter((p) => concluidoStatuses.includes(p.status))
  const taxa30 =
    processosLast30.length > 0 ? (concluidosLast30.length / processosLast30.length) * 100 : 0

  const processosPrev30 = processos.filter(
    (p) => new Date(p.created) >= sixtyDaysAgo && new Date(p.created) < thirtyDaysAgo,
  )
  const concluidosPrev30 = processosPrev30.filter((p) => concluidoStatuses.includes(p.status))
  const taxaPrev30 =
    processosPrev30.length > 0 ? (concluidosPrev30.length / processosPrev30.length) * 100 : 0

  const taxaTrend = taxa30 > taxaPrev30 ? 'up' : taxa30 < taxaPrev30 ? 'down' : 'neutral'
  const taxaConclusao = processos.length > 0 ? (concluidos.length / processos.length) * 100 : 0

  const calcTempoMedio = (procs: ProcessoOperacional[]) => {
    if (procs.length === 0) return 0
    const sumHours = procs.reduce(
      (acc, p) => acc + differenceInHours(new Date(p.updated), new Date(p.created)),
      0,
    )
    return sumHours / procs.length
  }

  const tempoMedioTotal = calcTempoMedio(concluidos)
  const tempoMedio30 = calcTempoMedio(concluidosLast30)
  const tempoMedioPrev30 = calcTempoMedio(concluidosPrev30)
  const tempoMedioTrend =
    tempoMedio30 < tempoMedioPrev30 ? 'down' : tempoMedio30 > tempoMedioPrev30 ? 'up' : 'neutral'

  const statusChart = [
    { name: 'Em Andamento', value: emAndamento.length, fill: '#00A8B5' },
    { name: 'Concluído', value: concluidos.length, fill: '#2bc8cf' },
    { name: 'Pendente', value: pendentesCount, fill: '#f5a623' },
  ].filter((s) => s.value > 0)

  const trendChartMap = new Map<string, number>()
  for (let i = 29; i >= 0; i--) {
    trendChartMap.set(format(subDays(now, i), 'yyyy-MM-dd'), 0)
  }
  concluidosLast30.forEach((p) => {
    const d = format(new Date(p.updated), 'yyyy-MM-dd')
    if (trendChartMap.has(d)) {
      trendChartMap.set(d, trendChartMap.get(d)! + 1)
    }
  })
  const trendChart = Array.from(trendChartMap.entries()).map(([date, count]) => ({
    date: format(new Date(date), 'dd/MM'),
    concluidos: count,
  }))

  return {
    totalProcessos: processos.length,
    emAndamentoCount: emAndamento.length,
    concluidosMesCount: concluidosMes.length,
    taxaConclusao,
    taxaConclusaoTrend: taxaTrend,
    tempoMedioHoras: tempoMedioTotal,
    tempoMedioTrend,
    statusChart,
    trendChart,
    recentes: processos.slice(0, 5),
    unreadMessages: notificacoesRes.totalItems,
    agenteName: agenteRes.nomeCompleto || agenteRes.nome || 'Agente',
  }
}
