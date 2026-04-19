import { useState, useCallback } from 'react'
import { DocumentoType } from '@/types/sindicancia'
import {
  createEncaminhamento,
  updateEncaminhamento,
  createRascunho,
  sendSindicanciaEmail,
  sendSindicanciaWhatsapp,
} from '@/services/sindicanciaService'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

export function useEncaminharSindicancia(onClose: () => void, onSuccess?: (id: string) => void) {
  const { user } = useAuth()
  const [orientacoes, setOrientacoes] = useState('')
  const [documentos, setDocumentos] = useState<DocumentoType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [touchedOrientacoes, setTouchedOrientacoes] = useState(false)
  const [touchedDocumentos, setTouchedDocumentos] = useState(false)

  const validateForm = useCallback(() => {
    return orientacoes.length >= 10 && documentos.length >= 1
  }, [orientacoes, documentos])

  const handleOrientacoesChange = (text: string) => {
    setOrientacoes(text)
    setTouchedOrientacoes(true)
  }

  const handleDocumentosAdd = (file: File) => {
    const newDoc: DocumentoType = {
      id: crypto.randomUUID(),
      filename: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      file,
    }
    setDocumentos((prev) => [...prev, newDoc])
    setTouchedDocumentos(true)
  }

  const handleDocumentosRemove = (id: string) => {
    setDocumentos((prev) => prev.filter((doc) => doc.id !== id))
    setTouchedDocumentos(true)
  }

  const handleSend = async (selectedId: string) => {
    if (!validateForm()) return false
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('processo_id', selectedId)
      if (user?.id) formData.append('user_id', user.id)
      formData.append('orientacoes', orientacoes)
      documentos.forEach((doc) => {
        if (doc.file) formData.append('documentos', doc.file)
      })

      const wppRes = await sendSindicanciaWhatsapp({
        whatsapp_destinatario: '5511999999999',
        orientacoes,
        processo_id: selectedId,
      })

      formData.append('email_enviado', 'false')
      formData.append('whatsapp_enviado', wppRes?.success ? 'true' : 'false')
      formData.append('email_destinatario', 'agente@exemplo.com')
      formData.append('whatsapp_destinatario', '5511999999999')

      const record = await createEncaminhamento(formData)

      if (record?.id) {
        const emailRes = await sendSindicanciaEmail({
          id: record.id,
          processo_id: selectedId,
          orientacoes,
          email_destinatario: 'agente@exemplo.com',
          user_id: user?.id || '',
        })

        await updateEncaminhamento(record.id, {
          email_enviado: emailRes.success,
        })

        if (emailRes.success) {
          toast.success('Email enviado com sucesso!')
        } else {
          toast.error('Email nao foi enviado. Tente novamente.')
        }
      }

      toast.success('Processo enviado com sucesso!')
      onClose()
      if (onSuccess && record?.id) onSuccess(record.id)
      return true
    } catch (err: any) {
      console.error(err)
      setError('Erro ao salvar encaminhamento')
      toast.error('Erro ao salvar encaminhamento', {
        action: {
          label: 'Tentar novamente',
          onClick: () => handleSend(selectedId),
        },
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleDraft = async (selectedId: string) => {
    if (!selectedId) {
      toast.error('Selecione um processo para salvar o rascunho')
      return false
    }
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('processo_id', selectedId)
      if (user?.id) formData.append('user_id', user.id)
      formData.append('orientacoes', orientacoes)
      documentos.forEach((doc) => {
        if (doc.file) formData.append('documentos', doc.file)
      })

      await createRascunho(formData)
      toast.success('Rascunho salvo com sucesso!')
      onClose()
      return true
    } catch (err: any) {
      console.error(err)
      setError('Erro ao salvar rascunho')
      toast.error('Erro ao salvar rascunho', {
        action: {
          label: 'Tentar novamente',
          onClick: () => handleDraft(selectedId),
        },
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  const resetState = useCallback(() => {
    setOrientacoes('')
    setDocumentos([])
    setLoading(false)
    setError(null)
    setTouchedOrientacoes(false)
    setTouchedDocumentos(false)
  }, [])

  return {
    orientacoes,
    documentos,
    loading,
    error,
    touchedOrientacoes,
    touchedDocumentos,
    validateForm,
    handleOrientacoesChange,
    handleDocumentosAdd,
    handleDocumentosRemove,
    handleSend,
    handleDraft,
    resetState,
    setTouchedOrientacoes,
    setTouchedDocumentos,
  }
}
