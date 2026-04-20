import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { differenceInDays, parseISO } from 'date-fns'

export function usePerformanceMetrics(userId?: string) {
  const [metrics, setMetrics] = useState({
    pendentes: 0,
    slaMedio: 0,
    totalConcluidos: 0,
    taxaSucesso: 0,
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
      } catch (err) {
        console.error('Error fetching performance metrics:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [userId])

  return { metrics, loading }
}
