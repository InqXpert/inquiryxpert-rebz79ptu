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

  return { data, loading }
}
