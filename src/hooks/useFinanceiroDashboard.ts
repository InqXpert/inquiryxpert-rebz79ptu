import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import pb from '@/lib/pocketbase/client'
import { getDashboardNotasFiscais } from '@/services/dashboardFinanceiro'
import { useRealtime } from '@/hooks/use-realtime'
import {
  getMetasGerais,
  getActualsGerais,
  getAllMetasIndividuais,
  getActualsIndividuais,
} from '@/services/metasFinanceiras'

export function useFinanceiroDashboard() {
  const [data, setData] = useState({
    faturadoMes: 0,
    receitaRecebida: 0,
    aReceber: 0,
    inadimplencia: 0,
    recentes: [] as any[],
    pendentesDocumentos: {
      count: 0,
      avgDays: 0,
    },
    metasGerais: null as any,
    topIndividuais: [] as any[],
  })
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)
      const notas = await getDashboardNotasFiscais()

      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      let faturadoMes = 0
      let receitaRecebida = 0
      let aReceber = 0
      let inadimplencia = 0

      // Fetch pendentes
      let pendentesCount = 0
      let avgDays = 0
      try {
        const pendentes = await pb.collection('processos_operacionais').getFullList({
          filter: "status = 'concluido_pendente_documentos' && documentos_recebidos = false",
        })
        pendentesCount = pendentes.length

        let totalDays = 0
        const now = new Date()
        pendentes.forEach((p) => {
          const d = p.data_entrada_pendencia
            ? new Date(p.data_entrada_pendencia)
            : new Date(p.updated)
          const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
          totalDays += Math.max(0, diff)
        })
        avgDays = pendentesCount > 0 ? Math.round(totalDays / pendentesCount) : 0
      } catch (err) {
        console.error('Erro ao buscar pendentes', err)
      }

      notas.forEach((nota) => {
        const valor = nota.valor_total || 0
        const status = nota.status || ''
        const dataEmissao = nota.data_emissao ? new Date(nota.data_emissao) : null
        const dataVencimento = nota.data_vencimento ? new Date(nota.data_vencimento) : null

        // Total Faturado Mês
        if (
          dataEmissao &&
          ['emitida', 'enviada', 'paga'].includes(status) &&
          dataEmissao.getMonth() === currentMonth &&
          dataEmissao.getFullYear() === currentYear
        ) {
          faturadoMes += valor
        }

        // Receita Recebida
        if (status === 'paga') {
          receitaRecebida += valor
        }

        // A Receber
        if (status === 'enviada') {
          aReceber += valor
        }

        // Inadimplência
        if (status !== 'paga' && status !== 'cancelada' && dataVencimento && dataVencimento < now) {
          inadimplencia += valor
        }
      })

      // Metas Financeiras
      const metaGeralRecord = await getMetasGerais(currentMonth + 1, currentYear)
      let metasGerais = null
      if (metaGeralRecord) {
        const actuals = await getActualsGerais(currentMonth + 1, currentYear)
        metasGerais = {
          receitaMeta: metaGeralRecord.meta_receita,
          receitaAtual: actuals.receita,
          receitaPct:
            metaGeralRecord.meta_receita > 0
              ? (actuals.receita / metaGeralRecord.meta_receita) * 100
              : 0,
          custoMeta: metaGeralRecord.meta_custo_operacional,
          custoAtual: actuals.custo,
          custoPct:
            metaGeralRecord.meta_custo_operacional > 0
              ? (actuals.custo / metaGeralRecord.meta_custo_operacional) * 100
              : 0,
          margemMeta: metaGeralRecord.meta_margem_liquida,
          margemAtual: actuals.margem,
          margemPct:
            metaGeralRecord.meta_margem_liquida > 0
              ? (actuals.margem / metaGeralRecord.meta_margem_liquida) * 100
              : 0,
        }
      }

      const metasInd = await getAllMetasIndividuais()
      // Filter the ones matching current month/year
      const activeInd = metasInd.filter(
        (m) => m.mes_inicio === currentMonth + 1 && m.ano_inicio === currentYear,
      )

      const topIndividuais = await Promise.all(
        activeInd.map(async (m) => {
          const actuals = await getActualsIndividuais(
            m.usuario_id,
            m.periodo,
            m.mes_inicio,
            m.ano_inicio,
          )
          const progresso = m.meta_receita > 0 ? (actuals.receita / m.meta_receita) * 100 : 0
          return {
            id: m.id,
            nome: m.expand?.usuario_id?.name || m.expand?.usuario_id?.email || 'Desconhecido',
            progresso: Math.min(progresso, 100),
            receita: actuals.receita,
            meta: m.meta_receita,
          }
        }),
      )
      topIndividuais.sort((a, b) => b.progresso - a.progresso)

      setData({
        faturadoMes,
        receitaRecebida,
        aReceber,
        inadimplencia,
        recentes: notas.slice(0, 5),
        pendentesDocumentos: {
          count: pendentesCount,
          avgDays,
        },
        metasGerais,
        topIndividuais: topIndividuais.slice(0, 3),
      })
    } catch (error) {
      console.error(error)
      toast.error('Erro ao carregar dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('notas_fiscais', () => {
    loadData()
  })
  useRealtime('processos_operacionais', () => {
    loadData()
  })

  return { data, loading }
}
