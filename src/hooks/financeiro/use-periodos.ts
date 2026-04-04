import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import {
  getPeriodos,
  getClientesAtivos,
  createPeriodo,
  fecharPeriodo,
  deletarPeriodo,
} from '@/services/financeiro/periodos'
import { useRealtime } from '@/hooks/use-realtime'

export function usePeriodos() {
  const [periodos, setPeriodos] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [clienteFilter, setClienteFilter] = useState('all')
  const { toast } = useToast()

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const [p, c] = await Promise.all([
        getPeriodos(statusFilter, clienteFilter),
        getClientesAtivos(),
      ])
      setPeriodos(p)
      setClientes(c)
    } catch (err) {
      console.error(err)
      setError(true)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar períodos.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [statusFilter, clienteFilter, toast])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime('periodos_faturamento', () => {
    loadData()
  })

  const handleCreate = async (data: {
    cliente_id: string
    data_inicio: string
    data_fim: string
  }) => {
    try {
      await createPeriodo(data)
      toast({ description: 'Período criado com sucesso!' })
      return true
    } catch (err) {
      console.error(err)
      toast({ title: 'Erro', description: 'Falha ao criar período.', variant: 'destructive' })
      return false
    }
  }

  const handleClose = async (id: string) => {
    try {
      await fecharPeriodo(id)
      toast({ description: 'Período fechado com sucesso!' })
    } catch (err) {
      console.error(err)
      toast({ title: 'Erro', description: 'Falha ao fechar período.', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deletarPeriodo(id)
      toast({ description: 'Período deletado com sucesso!' })
    } catch (err) {
      console.error(err)
      toast({ title: 'Erro', description: 'Falha ao deletar período.', variant: 'destructive' })
    }
  }

  return {
    periodos,
    clientes,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    clienteFilter,
    setClienteFilter,
    handleCreate,
    handleClose,
    handleDelete,
    loadData,
  }
}
