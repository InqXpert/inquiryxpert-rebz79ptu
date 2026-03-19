import { useState, useCallback } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import * as service from '@/services/procesosOperacionais'
import { ProcessoOperacional, ProcessoHistorico, ProcessoDocumento } from '@/types'

export function useProcessoDetail() {
  const { user } = useAuth()
  const { toast } = useToast()
  const userRole = user?.role || 'admin'
  const userId = user?.id || 'u1'
  const userName = user?.name || 'Administrador'

  const [processo, setProcesso] = useState<ProcessoOperacional | null>(null)
  const [historico, setHistorico] = useState<ProcessoHistorico[]>([])
  const [documentos, setDocumentos] = useState<ProcessoDocumento[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProcessoDetail = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const [procData, histData, docData] = await Promise.all([
        service.fetchProcessoById(id),
        service.fetchHistorico(id),
        service.fetchDocumentos(id),
      ])
      if (!procData) throw new Error('Not found')
      setProcesso(procData)
      setHistorico(histData)
      setDocumentos(docData)
    } catch (err) {
      setError('Erro ao carregar detalhes do processo.')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProcesso = async (data: Partial<ProcessoOperacional>) => {
    if (!processo) return
    try {
      const updated = await service.updateProcesso(processo.id, data)
      setProcesso({ ...processo, ...updated })
      toast({ title: 'Sucesso', description: 'Processo atualizado com sucesso!' })
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao atualizar processo.', variant: 'destructive' })
    }
  }

  const addObservacao = async (observacao: string) => {
    if (!processo) return
    try {
      const updated = await service.addObservacao(processo.id, observacao, userName)
      setProcesso(updated)
      // Refresh history mock logic
      setHistorico((prev) => [
        {
          id: Math.random().toString(),
          processo_id: processo.id,
          tipo_evento: 'observacao_adicionada',
          descricao: 'Observação adicionada',
          user_name: userName,
          created: new Date().toISOString(),
        },
        ...prev,
      ])
      toast({ title: 'Sucesso', description: 'Observação adicionada com sucesso!' })
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao adicionar observação.', variant: 'destructive' })
    }
  }

  const addPosicao = async (posicaoNumber: number, data: string) => {
    if (!processo) return
    try {
      const updated = await service.addPosicao(processo.id, posicaoNumber, data)
      setProcesso(updated)
      toast({ title: 'Sucesso', description: 'Posição adicionada com sucesso!' })
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao adicionar posição.', variant: 'destructive' })
    }
  }

  const uploadDocumento = async (file: File) => {
    if (!processo) return
    try {
      const doc = await service.uploadDocumento(processo.id, file)
      setDocumentos((prev) => [doc, ...prev])
      toast({ title: 'Sucesso', description: 'Documento enviado com sucesso!' })
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao enviar documento.', variant: 'destructive' })
    }
  }

  const deleteDocumento = async (documentoId: string) => {
    try {
      await service.deleteDocumento(documentoId)
      setDocumentos((prev) => prev.filter((d) => d.id !== documentoId))
      toast({ title: 'Sucesso', description: 'Documento deletado com sucesso!' })
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao deletar documento.', variant: 'destructive' })
    }
  }

  const canEditProcesso = () =>
    userRole === 'admin' || userRole === 'supervisor' || processo?.user_id === userId
  const canDeleteProcesso = () => userRole === 'admin'
  const canAddObservacao = () => true
  const canAddPosicao = () => true
  const canUploadDocumento = () => true

  return {
    processo,
    historico,
    documentos,
    loading,
    error,
    fetchProcessoDetail,
    updateProcesso,
    addObservacao,
    addPosicao,
    uploadDocumento,
    deleteDocumento,
    canEditProcesso,
    canDeleteProcesso,
    canAddObservacao,
    canAddPosicao,
    canUploadDocumento,
  }
}
