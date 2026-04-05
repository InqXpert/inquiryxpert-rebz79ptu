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
    } catch (err: any) {
      let errorMessage = 'Erro ao carregar processo.'
      if (err?.status === 404 || err?.message?.includes('404')) {
        errorMessage = 'Processo não encontrado.'
      } else if (
        err?.status === 403 ||
        err?.message?.includes('403') ||
        err?.message?.includes('autho')
      ) {
        errorMessage = 'Acesso negado ao processo.'
      }
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadData()
  }, [loadData])

  const save = async (data: Partial<Processo>, customAction?: string, customAuditData?: any) => {
    if (!id || !processo) return null
    const updated = await updateProcesso(id, data)
    await createAuditLog(
      id,
      customAction || 'EDITADO',
      user?.id,
      processo,
      customAuditData || updated,
    )
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
