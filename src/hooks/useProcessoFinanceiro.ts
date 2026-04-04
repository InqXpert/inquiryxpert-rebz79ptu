import { useState, useEffect } from 'react'
import { getPeriodoFaturamentoProcesso } from '@/services/processosFinanceiro'

export function useProcessoFinanceiro(processo: any) {
  const [statusFinanceiro, setStatusFinanceiro] = useState<{
    label: string
    className: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!processo) return

    if (processo.status !== 'FINALIZADO') {
      setStatusFinanceiro({
        label: 'Não Elegível',
        className: 'bg-muted text-muted-foreground',
      })
      return
    }

    const fetchPeriodo = async () => {
      setLoading(true)
      const clienteId = processo.seguradora_id || processo.cliente_id
      const dataSaida = processo.data_saida

      if (!clienteId || !dataSaida) {
        setStatusFinanceiro({
          label: 'Não Faturado',
          className: 'bg-destructive text-white',
        })
        setLoading(false)
        return
      }

      const periodo = await getPeriodoFaturamentoProcesso(clienteId, dataSaida)

      if (!periodo) {
        setStatusFinanceiro({
          label: 'Não Faturado',
          className: 'bg-destructive text-white',
        })
      } else {
        switch (periodo.status) {
          case 'aberto':
            setStatusFinanceiro({ label: 'Aberto', className: 'bg-accent text-brand-navy' })
            break
          case 'fechado':
            setStatusFinanceiro({
              label: 'Fechado',
              className: 'bg-secondary text-secondary-foreground',
            })
            break
          case 'faturado':
            setStatusFinanceiro({
              label: 'Faturado',
              className: 'bg-primary text-primary-foreground',
            })
            break
          case 'pago':
            setStatusFinanceiro({ label: 'Pago', className: 'bg-brand-teal text-white' })
            break
          default:
            setStatusFinanceiro({
              label: 'Desconhecido',
              className: 'bg-muted text-muted-foreground',
            })
        }
      }
      setLoading(false)
    }

    fetchPeriodo()
  }, [processo])

  return { statusFinanceiro, loading }
}
