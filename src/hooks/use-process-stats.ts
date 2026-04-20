import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { addHours, formatISO } from 'date-fns'

export function useProcessStats(userId?: string) {
  const [stats, setStats] = useState({
    emAnalise: 0,
    emExecucao: 0,
    emElaboracao: 0,
    concluidos: 0,
    atrasados: 0,
    proximosVencimentos: 0,
    altaPrioridade: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchStats = async () => {
      setLoading(true)
      try {
        const now = new Date()
        const nowStr = formatISO(now, { representation: 'date' }) + ' 00:00:00'
        const in48h = formatISO(addHours(now, 48), { representation: 'date' }) + ' 23:59:59'

        const [
          analiseRes,
          execucaoRes,
          elaboracaoRes,
          concluidosRes,
          atrasadosRes,
          proximosRes,
          prioridadeRes,
        ] = await Promise.all([
          pb.collection('processos_operacionais').getList(1, 1, { filter: `status ~ 'analis'` }),
          pb.collection('processos_operacionais').getList(1, 1, { filter: `status ~ 'execu'` }),
          pb.collection('processos_operacionais').getList(1, 1, { filter: `status ~ 'elabora'` }),
          pb
            .collection('processos_operacionais')
            .getList(1, 1, { filter: `status ~ 'concluido' || status ~ 'finalizado'` }),
          pb
            .collection('processos_operacionais')
            .getList(1, 1, {
              filter: `data_prazo < "${nowStr}" && status != 'concluido' && status != 'finalizado'`,
            }),
          pb
            .collection('processos_operacionais')
            .getList(1, 1, {
              filter: `data_prazo >= "${nowStr}" && data_prazo <= "${in48h}" && status != 'concluido' && status != 'finalizado'`,
            }),
          pb
            .collection('processos_operacionais')
            .getList(1, 1, {
              filter: `prioridade = 'alta' && status != 'concluido' && status != 'finalizado'`,
            }),
        ])

        setStats({
          emAnalise: analiseRes.totalItems,
          emExecucao: execucaoRes.totalItems,
          emElaboracao: elaboracaoRes.totalItems,
          concluidos: concluidosRes.totalItems,
          atrasados: atrasadosRes.totalItems,
          proximosVencimentos: proximosRes.totalItems,
          altaPrioridade: prioridadeRes.totalItems,
        })
      } catch (err) {
        console.error('Error fetching process stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [userId])

  return { stats, loading }
}
