import { useState, useEffect, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'

export function useWorkloadStats(userId?: string) {
  const [counts, setCounts] = useState({
    emAnalise: 0,
    emExecucao: 0,
    emElaboracao: 0,
    concluidos: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchStats = useCallback(async () => {
    if (!userId) return
    try {
      setLoading(true)
      setError(null)

      const [analise, execucao, elaboracao, concluidos] = await Promise.all([
        pb.collection('processos_operacionais').getList(1, 1, {
          filter: `user_id = "${userId}" && status = "EM_ANALISE"`,
          fields: 'id',
        }),
        pb.collection('processos_operacionais').getList(1, 1, {
          filter: `user_id = "${userId}" && status = "EM_EXECUCAO"`,
          fields: 'id',
        }),
        pb.collection('processos_operacionais').getList(1, 1, {
          filter: `user_id = "${userId}" && status = "EM_ELABORACAO"`,
          fields: 'id',
        }),
        pb.collection('processos_operacionais').getList(1, 1, {
          filter: `user_id = "${userId}" && status = "CONCLUIDO"`,
          fields: 'id',
        }),
      ])

      setCounts({
        emAnalise: analise.totalItems,
        emExecucao: execucao.totalItems,
        emElaboracao: elaboracao.totalItems,
        concluidos: concluidos.totalItems,
      })
    } catch (err: any) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  useRealtime(
    'processos_operacionais',
    () => {
      fetchStats()
    },
    !!userId,
  )

  return { counts, loading, error }
}
