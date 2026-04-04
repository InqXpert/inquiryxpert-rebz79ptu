import { useState, useEffect, useCallback } from 'react'
import {
  fetchProcessoById,
  updateProcesso,
  deleteProcesso,
  createAuditLog,
} from '@/services/processosService'
import type { Processo } from '@/types/processo'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

export function useProcessoDetalhes(id: string | undefined) {
  const [processo, setProcesso] = useState<Processo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const loadData = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try {
      const data = await fetchProcessoById(id)
      setProcesso(data)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar processo.')
      toast.error('Erro ao carregar processo.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadData()
  }, [loadData])

  const save = async (data: Partial<Processo>) => {
    if (!id || !processo) return null
    const updated = await updateProcesso(id, data)
    await createAuditLog(id, 'EDITADO', user?.id, processo, updated)
    setProcesso(updated)
    return updated
  }

  const remove = async () => {
    if (!id || !processo) return false
    await createAuditLog(id, 'DELETADO', user?.id, processo, null)
    await deleteProcesso(id)
    return true
  }

  return { processo, loading, error, save, remove, reload: loadData }
}
