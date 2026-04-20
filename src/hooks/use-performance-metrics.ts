import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { differenceInDays, parseISO, startOfMonth, endOfMonth, subDays, isBefore } from 'date-fns'
import { toast } from 'sonner'

export function usePerformanceMetrics(userId?: string) {
  const [metrics, setMetrics] = useState({
    pendentes: 0,
    slaMedio: 0,
    totalConcluidos: 0,
    taxaSucesso: 0,
  })

  const [advancedMetrics, setAdvancedMetrics] = useState({
    pendentesAtraso: 0,
    slaMedioDias: 0,
    concluidosMes: 0,
    taxaConclusao: 0,
    statusBreakdown: {
      regular: { count: 0, percentage: 0 },
      irregular: { count: 0, percentage: 0 },
      analise: { count: 0, percentage: 0 },
      condicionado: { count: 0, percentage: 0 },
      total30Days: 0,
    },
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchMetrics = async () => {
      setLoading(true)
      try {
        const concluidosRes = await pb.collection('processos_operacionais').getFullList({
          filter: `status ~ 'concluido' || status ~ 'finalizado'`,
          fields: 'created,data_conclusao,data_prazo',
        })

        const pendentesRes = await pb.collection('processos_operacionais').getList(1, 1, {
          filter: `status != 'concluido' && status != 'finalizado'`,
        })

        const pendentes = pendentesRes.totalItems
        const totalConcluidos = concluidosRes.length

        let slaTotal = 0
        let sucessoCount = 0

        concluidosRes.forEach((p) => {
          if (p.created && p.data_conclusao) {
            const created = parseISO(p.created)
            const conclusao = parseISO(p.data_conclusao)
            const diff = Math.max(0, differenceInDays(conclusao, created))
            slaTotal += diff
          }
          if (p.data_conclusao && p.data_prazo) {
            const conclusao = parseISO(p.data_conclusao)
            const prazo = parseISO(p.data_prazo)
            if (conclusao <= prazo) {
              sucessoCount++
            }
          } else if (!p.data_prazo) {
            sucessoCount++
          }
        })

        const slaMedio = totalConcluidos > 0 ? Math.round(slaTotal / totalConcluidos) : 0
        const taxaSucesso =
          totalConcluidos > 0 ? Math.round((sucessoCount / totalConcluidos) * 100) : 0

        setMetrics({
          pendentes,
          slaMedio,
          totalConcluidos,
          taxaSucesso,
        })

        // NEW: Advanced metrics for the current user
        const allUserProcs = await pb.collection('processos_operacionais').getFullList({
          filter: `user_id = "${userId}"`,
          fields: 'id,status,created,data_prazo,resultado',
        })

        const now = new Date()
        const startOfCurrentMonth = startOfMonth(now)
        const endOfCurrentMonth = endOfMonth(now)
        const thirtyDaysAgo = subDays(now, 30)

        let pendentesAtraso = 0
        let slaTotalDias = 0
        let slaCount = 0
        let concluidosMes = 0
        let concludedTotal = 0

        let regularCount = 0
        let irregularCount = 0
        let analiseCount = 0
        let condicionadoCount = 0
        let total30DaysConcluded = 0

        allUserProcs.forEach((p) => {
          const isConcluido = p.status?.toUpperCase() === 'CONCLUIDO'
          const createdDate = p.created ? parseISO(p.created) : null
          const prazoDate = p.data_prazo ? parseISO(p.data_prazo) : null

          if (isConcluido) {
            concludedTotal++
            if (
              createdDate &&
              createdDate >= startOfCurrentMonth &&
              createdDate <= endOfCurrentMonth
            ) {
              concluidosMes++
            }
            if (createdDate && createdDate >= thirtyDaysAgo) {
              total30DaysConcluded++
              const res = p.resultado?.toUpperCase() || ''
              if (res === 'REGULAR') regularCount++
              else if (res === 'IRREGULAR') irregularCount++
              else if (res === 'ANALISE') analiseCount++
              else if (res === 'CONDICIONADO') condicionadoCount++
            }
          } else {
            if (prazoDate && isBefore(prazoDate, now)) {
              pendentesAtraso++
            }
          }

          if (createdDate && prazoDate) {
            const diff = differenceInDays(prazoDate, createdDate)
            slaTotalDias += diff
            slaCount++
          }
        })

        const slaMedioDias = slaCount > 0 ? Math.round(slaTotalDias / slaCount) : 0
        const taxaConclusao =
          allUserProcs.length > 0 ? Math.round((concludedTotal / allUserProcs.length) * 100) : 0
        const calcPercent = (count: number, total: number) =>
          total > 0 ? Math.round((count / total) * 100) : 0

        setAdvancedMetrics({
          pendentesAtraso,
          slaMedioDias,
          concluidosMes,
          taxaConclusao,
          statusBreakdown: {
            regular: {
              count: regularCount,
              percentage: calcPercent(regularCount, total30DaysConcluded),
            },
            irregular: {
              count: irregularCount,
              percentage: calcPercent(irregularCount, total30DaysConcluded),
            },
            analise: {
              count: analiseCount,
              percentage: calcPercent(analiseCount, total30DaysConcluded),
            },
            condicionado: {
              count: condicionadoCount,
              percentage: calcPercent(condicionadoCount, total30DaysConcluded),
            },
            total30Days: total30DaysConcluded,
          },
        })
      } catch (err) {
        console.error('Error fetching performance metrics:', err)
        toast.error('Nao foi possivel carregar performance')
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [userId])

  return { metrics, advancedMetrics, loading }
}
