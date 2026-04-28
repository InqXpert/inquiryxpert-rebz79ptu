import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getDashboardNotasFiscais } from '@/services/dashboardFinanceiro'
import { useRealtime } from '@/hooks/use-realtime'

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
