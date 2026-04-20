import { useState, useEffect, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { ProcessoOperacional } from '@/types'
import { differenceInDays, startOfDay, addDays } from 'date-fns'
import { toast } from 'sonner'
import { useRealtime } from '@/hooks/use-realtime'

export type ProcessoAlert = ProcessoOperacional & {
  dias_atrasado?: number
  dias_para_vencer?: number
}

export function useProcessAlerts() {
  const { user } = useAuth()
  const [overdue, setOverdue] = useState<ProcessoAlert[]>([])
  const [upcoming, setUpcoming] = useState<ProcessoAlert[]>([])
  const [priority, setPriority] = useState<ProcessoAlert[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAlerts = useCallback(async () => {
    if (!user) return
    try {
      const today = startOfDay(new Date())
      const sevenDaysFromNow = addDays(today, 7)

      const todayStr = today.toISOString().split('T')[0]
      const sevenDaysStr = sevenDaysFromNow.toISOString().split('T')[0]

      let userFilter = ''
      if (user.role !== 'admin' && user.role !== 'c-level') {
        userFilter = ` && (user_id = "${user.id}" || supervisor_id = "${user.id}" || agente_id.user_id = "${user.id}")`
      }

      const baseFilter = `status != "concluido" && status != "FINALIZADO"` + userFilter

      const [overdueRes, upcomingRes, priorityRes] = await Promise.all([
        pb.collection('processos_operacionais').getList(1, 3, {
          filter: `data_prazo < "${todayStr} 00:00:00" && data_prazo != "" && ${baseFilter}`,
          sort: 'data_prazo',
        }),
        pb.collection('processos_operacionais').getList(1, 3, {
          filter: `data_prazo >= "${todayStr} 00:00:00" && data_prazo <= "${sevenDaysStr} 23:59:59" && data_prazo != "" && ${baseFilter}`,
          sort: 'data_prazo',
        }),
        pb.collection('processos_operacionais').getList(1, 100, {
          filter: `${baseFilter}`,
        }),
      ])

      const processedOverdue = overdueRes.items.map((p) => {
        const dias = differenceInDays(today, startOfDay(new Date(p.data_prazo)))
        return { ...p, dias_atrasado: dias > 0 ? dias : 0 } as ProcessoAlert
      })

      const processedUpcoming = upcomingRes.items.map((p) => {
        const dias = differenceInDays(startOfDay(new Date(p.data_prazo)), today)
        return { ...p, dias_para_vencer: dias >= 0 ? dias : 0 } as ProcessoAlert
      })

      const sortedPriority = priorityRes.items
        .sort((a: any, b: any) => {
          const pA = a.prioridade === 'alta' ? 3 : a.prioridade === 'media' ? 2 : 1
          const pB = b.prioridade === 'alta' ? 3 : b.prioridade === 'media' ? 2 : 1
          if (pA !== pB) return pB - pA
          const dateA = a.data_prazo ? new Date(a.data_prazo).getTime() : Infinity
          const dateB = b.data_prazo ? new Date(b.data_prazo).getTime() : Infinity
          return dateA - dateB
        })
        .slice(0, 3)

      setOverdue(processedOverdue)
      setUpcoming(processedUpcoming)
      setPriority(sortedPriority as ProcessoAlert[])
    } catch (err) {
      console.error(err)
      toast.error('Não foi possível carregar alertas')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts])

  useRealtime('processos_operacionais', () => {
    fetchAlerts()
  })

  return { overdue, upcoming, priority, loading }
}
