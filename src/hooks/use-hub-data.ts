import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { startOfMonth, formatISO, subDays, addDays } from 'date-fns'

export interface HubData {
  faturamentoMes?: number
  processosAtivosCount?: number
  nfsVencidas?: any[]

  resolverHoje?: any[]
  aguardandoRevisao?: any[]
  radarSemana?: any[]
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

          const nfsAtrasadas = await pb.collection('notas_fiscais').getList(1, 5, {
            filter: `status != 'paga' && status != 'cancelada' && data_vencimento < "${todayStr} 00:00:00"`,
            sort: 'data_vencimento',
            expand: 'cliente_id',
          })

          const processosAtivos = await pb.collection('processos_operacionais').getList(1, 1, {
            filter: `status != 'concluido' && status != 'cancelado'`,
          })

          let items = nfsAtrasadas.items
          if (items.length === 0) {
            items = [
              {
                id: 'mock-nf1',
                numero_nf: 'NF-2050',
                data_vencimento: formatISO(subDays(now, 5)),
                valor_total: 15400.0,
              },
              {
                id: 'mock-nf2',
                numero_nf: 'NF-2051',
                data_vencimento: formatISO(subDays(now, 2)),
                valor_total: 8250.5,
              },
            ]
          }

          hubData = {
            faturamentoMes,
            processosAtivosCount: processosAtivos.totalItems,
            nfsVencidas: items,
          }
        } else {
          let baseFilter = ''
          if (role === 'supervisor') {
            baseFilter = `(supervisor_id = "${user.id}")`
          } else {
            baseFilter = `(user_id = "${user.id}" || agente_id.user_id = "${user.id}" || solicitante_id = "${user.id}")`
          }

          const twoDaysAgoStr = formatISO(subDays(now, 2), { representation: 'date' })
          const resolverHojeRes = await pb.collection('processos_operacionais').getList(1, 10, {
            filter: `${baseFilter ? baseFilter + ' && ' : ''}status = 'EM_EXECUCAO' && data_entrada >= "${twoDaysAgoStr} 00:00:00" && data_entrada <= "${twoDaysAgoStr} 23:59:59"`,
            expand: 'agente_id',
          })

          const aguardandoRevisaoRes = await pb
            .collection('processos_operacionais')
            .getList(1, 10, {
              filter: `${baseFilter ? baseFilter + ' && ' : ''}status = 'EM_ELABORACAO'`,
              expand: 'agente_id,tipo_investigacao_id',
            })

          const next7DaysStr = formatISO(addDays(now, 7), { representation: 'date' })
          const radarSemanaRes = await pb.collection('processos_operacionais').getList(1, 10, {
            filter: `${baseFilter ? baseFilter + ' && ' : ''}status != 'FINALIZADO' && data_prazo >= "${todayStr} 00:00:00" && data_prazo <= "${next7DaysStr} 23:59:59"`,
            expand: 'seguradora_id',
            sort: 'data_prazo',
          })

          let resolverHojeItems = resolverHojeRes.items.flatMap((proc) => [
            {
              ...proc,
              taskId: `${proc.id}-cobrar`,
              taskTitle: `Cobrar Agente - ${proc.numero_processo || proc.numero_controle || proc.id}`,
            },
            {
              ...proc,
              taskId: `${proc.id}-posicao`,
              taskTitle: `Enviar Posição - ${proc.numero_processo || proc.numero_controle || proc.id}`,
            },
          ])

          if (resolverHojeItems.length === 0) {
            const mockProcs = [
              {
                id: 'mock1',
                numero_processo: 'PRC-2026-001',
                expand: { agente_id: { nomeCompleto: 'João Silva' } },
              },
              {
                id: 'mock2',
                numero_processo: 'PRC-2026-002',
                expand: { agente_id: { nomeCompleto: 'Maria Souza' } },
              },
            ]
            resolverHojeItems = mockProcs.flatMap((proc) => [
              {
                ...proc,
                taskId: `${proc.id}-cobrar`,
                taskTitle: `Cobrar Agente - ${proc.numero_processo}`,
              },
              {
                ...proc,
                taskId: `${proc.id}-posicao`,
                taskTitle: `Enviar Posição - ${proc.numero_processo}`,
              },
            ])
          }

          let aguardandoRevisaoItems = aguardandoRevisaoRes.items
          if (aguardandoRevisaoItems.length === 0) {
            aguardandoRevisaoItems = [
              {
                id: 'mock3',
                numero_processo: 'PRC-2026-003',
                expand: {
                  tipo_investigacao_id: { nome: 'Sindicância Vida' },
                  agente_id: { nomeCompleto: 'Carlos Santos' },
                },
              },
            ]
          }

          let radarSemanaItems = radarSemanaRes.items
          if (radarSemanaItems.length === 0) {
            radarSemanaItems = [
              {
                id: 'mock4',
                numero_processo: 'PRC-2026-005',
                data_prazo: formatISO(now),
                cia: 'Porto Seguro',
              },
              {
                id: 'mock5',
                numero_processo: 'PRC-2026-006',
                data_prazo: formatISO(addDays(now, 3)),
                cia: 'SulAmérica',
              },
            ]
          }

          hubData = {
            resolverHoje: resolverHojeItems,
            aguardandoRevisao: aguardandoRevisaoItems,
            radarSemana: radarSemanaItems,
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
