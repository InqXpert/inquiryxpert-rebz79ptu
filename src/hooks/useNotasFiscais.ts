import { useState, useEffect, useCallback } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRealtime } from '@/hooks/use-realtime'
import { notasFiscaisService, type NotaFiscal } from '@/services/notasFiscaisService'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export const generateNFSchema = z.object({
  periodoId: z.string().min(1, 'Selecione um período fechado.'),
  dataVencimento: z.string().min(1, 'A data de vencimento é obrigatória.'),
})

export function useNotasFiscais() {
  const [notas, setNotas] = useState<NotaFiscal[]>([])
  const [clientes, setClientes] = useState<any[]>([])
  const [periodos, setPeriodos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ cliente_id: 'all', status: 'all' })

  const loadData = useCallback(async () => {
    try {
      const [nfData, clData, perData] = await Promise.all([
        notasFiscaisService.getList(filters.cliente_id, filters.status),
        notasFiscaisService.getClientesAtivos(),
        notasFiscaisService.getPeriodosFechados(),
      ])
      setNotas(nfData)
      setClientes(clData)
      setPeriodos(perData)
    } catch (err) {
      toast.error('Erro ao carregar notas fiscais.')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime('notas_fiscais', () => loadData())
  useRealtime('periodos_faturamento', () => loadData())

  const generateNF = async (periodoId: string, dataVencimento: string) => {
    try {
      generateNFSchema.parse({ periodoId, dataVencimento })

      const periodo = periodos.find((p) => p.id === periodoId)
      if (!periodo || !periodo.expand?.cliente_id) throw new Error('Período ou cliente inválido.')

      const cliente = periodo.expand.cliente_id
      const fatTotal = periodo.faturamento_total || 0
      const aliquotaImp = cliente.aliquota_imposto || 0
      const impostos = (fatTotal * aliquotaImp) / 100

      let retencao = 0
      if (cliente.retencao_na_fonte) {
        retencao = (fatTotal * (cliente.aliquota_retencao || 0)) / 100
      }

      const valorLiquido = fatTotal - impostos - retencao
      const nfNumber = `NF-${Date.now()}`

      await notasFiscaisService.create({
        numero_nf: nfNumber,
        cliente_id: cliente.id,
        periodo_id: periodo.id,
        data_emissao: new Date().toISOString(),
        valor_total: fatTotal,
        impostos: impostos + retencao,
        valor_liquido: valorLiquido,
        status: 'emitida',
        data_vencimento: new Date(dataVencimento).toISOString(),
      })

      await notasFiscaisService.updatePeriodoStatus(periodo.id, 'faturado')
      toast.success('Nota Fiscal gerada com sucesso!')
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message)
      } else {
        toast.error(getErrorMessage(err))
      }
      throw err
    }
  }

  const markAsSent = async (id: string) => {
    try {
      await notasFiscaisService.updateStatus(id, 'enviada')
      toast.success('Status atualizado para Enviada!')
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const registerPayment = async (id: string, periodoId: string) => {
    try {
      await notasFiscaisService.updateStatus(id, 'paga', {
        data_pagamento: new Date().toISOString(),
      })
      if (periodoId) {
        await notasFiscaisService.updatePeriodoStatus(periodoId, 'pago')
      }
      toast.success('Pagamento registrado!')
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const cancelNF = async (id: string) => {
    try {
      await notasFiscaisService.updateStatus(id, 'cancelada')
      toast.success('Nota Fiscal cancelada!')
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  return {
    notas,
    clientes,
    periodos,
    loading,
    filters,
    setFilters,
    generateNF,
    markAsSent,
    registerPayment,
    cancelNF,
  }
}
