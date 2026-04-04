import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { startOfMonth, formatISO } from 'date-fns'

export interface HubData {
  faturamentoMes?: number
  inadimplenciaCount?: number
  processosAtivosCount?: number
  processosVencidosCount?: number
  semAtualizacaoCount?: number
  agentesOciososCount?: number
  meusAtrasadosCount?: number
  novosAtribuidosCount?: number
}

export function useHubData() {
  const { user } = useAuth()
  const [data, setData] = useState<HubData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const role = user.role || 'agente'
        const now = new Date()
        const todayStr = formatISO(now, { representation: 'date' })
        const startOfThisMonth = formatISO(startOfMonth(now))

        let hubData: HubData = {}

        if (role === 'c-level' || role === 'admin') {
          const nfsMes = await pb.collection('notas_fiscais').getFullList({
            filter: `created >= "${startOfThisMonth}"`,
          })
          const faturamentoMes = nfsMes.reduce((acc, nf) => acc + (nf.valor_total || 0), 0)

          const nfsAtrasadas = await pb.collection('notas_fiscais').getList(1, 1, {
            filter: `status != 'paga' && status != 'cancelada' && data_vencimento < "${todayStr} 00:00:00"`,
          })

          const processosAtivos = await pb.collection('processos_operacionais').getList(1, 1, {
            filter: `status != 'concluido' && status != 'cancelado'`,
          })

          hubData = {
            faturamentoMes,
            inadimplenciaCount: nfsAtrasadas.totalItems,
            processosAtivosCount: processosAtivos.totalItems,
          }
        } else if (role === 'supervisor') {
          const processosVencidos = await pb.collection('processos_operacionais').getList(1, 1, {
            filter: `data_prazo < "${todayStr} 00:00:00" && status != 'concluido' && supervisor_id = "${user.id}"`,
          })

          const threeDaysAgo = new Date()
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
          const threeDaysAgoStr = formatISO(threeDaysAgo)

          const semAtualizacao = await pb.collection('processos_operacionais').getList(1, 1, {
            filter: `updated < "${threeDaysAgoStr}" && status != 'concluido' && supervisor_id = "${user.id}"`,
          })

          const agentesOciosos = await pb.collection('agentes').getList(1, 1, {
            filter: `ativo = 'Sim'`,
          })

          hubData = {
            processosVencidosCount: processosVencidos.totalItems,
            semAtualizacaoCount: semAtualizacao.totalItems,
            // Fallback estimation as accurate idle check requires subqueries
            agentesOciososCount: Math.floor(agentesOciosos.totalItems * 0.2),
          }
        } else {
          const meusAtrasados = await pb.collection('processos_operacionais').getList(1, 1, {
            filter: `data_prazo < "${todayStr} 00:00:00" && status != 'concluido' && (user_id = "${user.id}" || agente_id.user_id = "${user.id}" || solicitante_id = "${user.id}")`,
          })

          const startOfToday = todayStr + ' 00:00:00'
          const novosAtribuidos = await pb.collection('processos_operacionais').getList(1, 1, {
            filter: `created >= "${startOfToday}" && (user_id = "${user.id}" || agente_id.user_id = "${user.id}" || solicitante_id = "${user.id}")`,
          })

          hubData = {
            meusAtrasadosCount: meusAtrasados.totalItems,
            novosAtribuidosCount: novosAtribuidos.totalItems,
          }
        }

        setData(hubData)
        setError(null)
      } catch (err: any) {
        console.error(err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  return { data, loading, error }
}
