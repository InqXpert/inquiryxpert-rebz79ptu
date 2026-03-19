import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import * as service from '@/services/procesosOperacionais'
import { ProcessoOperacional } from '@/types'

export function useOperacionalDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  // Mocking role if not present
  const userRole = user?.role || 'admin'
  const userId = user?.id || 'u1'

  const [processos, setProcessos] = useState<ProcessoOperacional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const defaultFilters = {
    status: 'Todos',
    cia: 'Todas',
    agente_prestador: 'Todos',
    data_entrada_from: '',
    data_entrada_to: '',
    search: '',
  }
  const [filters, setFiltersState] = useState(defaultFilters)
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 25, totalCount: 0 })

  const fetchProcessos = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let data = await service.fetchProcessos(filters)
      if (userRole === 'analista') {
        data = data.filter((p) => p.user_id === userId)
      }
      setProcessos(data)
      setPagination((p) => ({ ...p, totalCount: data.length }))
    } catch (err) {
      setError('Erro ao carregar processos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }, [filters, userRole, userId])

  useEffect(() => {
    fetchProcessos()
  }, [fetchProcessos])

  const setFilters = (newFilters: Partial<typeof filters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }))
    setPagination((p) => ({ ...p, currentPage: 1 }))
  }

  const clearFilters = () => {
    setFiltersState(defaultFilters)
    setPagination((p) => ({ ...p, currentPage: 1 }))
  }

  const updateProcesso = async (id: string, data: Partial<ProcessoOperacional>) => {
    const canEdit =
      userRole === 'admin' ||
      userRole === 'supervisor' ||
      processos.find((p) => p.id === id)?.user_id === userId
    if (!canEdit) {
      toast({
        title: 'Acesso Negado',
        description: 'Você não tem permissão para editar este processo.',
        variant: 'destructive',
      })
      return
    }
    try {
      const updated = await service.updateProcesso(id, data)
      setProcessos((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)))
      toast({ title: 'Sucesso', description: 'Processo atualizado com sucesso!' })
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao atualizar processo.', variant: 'destructive' })
    }
  }

  const deleteProcesso = async (id: string) => {
    if (userRole !== 'admin') {
      toast({
        title: 'Acesso Negado',
        description: 'Você não tem permissão para deletar.',
        variant: 'destructive',
      })
      return
    }
    try {
      await service.deleteProcesso(id)
      setProcessos((prev) => prev.filter((p) => p.id !== id))
      toast({ title: 'Sucesso', description: 'Processo deletado com sucesso!' })
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao deletar processo.', variant: 'destructive' })
    }
  }

  const canDelete = () => userRole === 'admin'
  const canExport = () => userRole === 'admin'
  const canImport = () => userRole === 'admin'

  return {
    processos,
    loading,
    error,
    filters,
    pagination,
    setPagination,
    fetchProcessos,
    setFilters,
    clearFilters,
    updateProcesso,
    deleteProcesso,
    canDelete,
    canExport,
    canImport,
  }
}
