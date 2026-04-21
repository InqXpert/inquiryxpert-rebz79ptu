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

export function useEncaminharSindicancia(onSuccess?: (id: string) => void) {
  const { user } = useAuth()
  const [orientacoes, setOrientacoes] = useState('')
  const [documentos, setDocumentos] = useState<DocumentoType[]>([])
  const [loading, setLoading] = useState(false)

  const validateForm = useCallback(
    (processoId: string, agenteId: string) => {
      if (!processoId) {
        toast.error('Selecione um processo')
        return false
      }
      if (!agenteId) {
        toast.error('Selecione um agente')
        return false
      }
      if (orientacoes.length < 10) {
        toast.error('As orientações devem ter no mínimo 10 caracteres')
        return false
      }
      return true
    },
    [orientacoes],
  )

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
  }

  const handleDocumentosRemove = (id: string) => {
    setDocumentos((prev) => prev.filter((doc) => doc.id !== id))
  }

  const handleSend = async (
    processoId: string,
    agente: any,
    method: 'email' | 'whatsapp' | 'both',
  ) => {
    if (!validateForm(processoId, agente?.id)) return false
    setLoading(true)
    try {
      const emailDest = agente?.email || 'agente@exemplo.com'
      const wppDest = agente?.telefone || '5511999999999'

      const formData = new FormData()
      formData.append('processo_id', processoId)
      if (user?.id) formData.append('user_id', user.id)
      formData.append('orientacoes', orientacoes)
      formData.append('email_destinatario', emailDest)
      formData.append('whatsapp_destinatario', wppDest)

      documentos.forEach((doc) => {
        if (doc.file) formData.append('documentos', doc.file)
      })

      let wppRes: any = { success: false }
      if (method === 'whatsapp' || method === 'both') {
        wppRes = await sendSindicanciaWhatsapp({
          whatsapp_destinatario: wppDest,
          orientacoes,
          processo_id: processoId,
        })
      }

      formData.append('email_enviado', 'false')
      formData.append('whatsapp_enviado', wppRes?.success ? 'true' : 'false')

      const record = await createEncaminhamento(formData)

      if (record?.id && (method === 'email' || method === 'both')) {
        const emailRes = await sendSindicanciaEmail({
          id: record.id,
          processo_id: processoId,
          orientacoes,
          email_destinatario: emailDest,
          user_id: user?.id || '',
        })

        await updateEncaminhamento(record.id, {
          email_enviado: emailRes.success,
        })

        if (emailRes.success) {
          toast.success('Email enviado com sucesso!')
        } else {
          toast.error('Email não foi enviado. Tente novamente.')
        }
      }

      if (method === 'whatsapp') {
        toast.success(
          wppRes?.success ? 'WhatsApp enviado com sucesso!' : 'Falha ao enviar WhatsApp',
        )
      } else if (method === 'both') {
        toast.success('Sindicância encaminhada com sucesso!')
      }

      if (onSuccess && record?.id) onSuccess(record.id)
      return true
    } catch (err: any) {
      console.error(err)
      toast.error('Erro ao salvar encaminhamento')
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleDraft = async (processoId: string, agenteId: string) => {
    if (!processoId) {
      toast.error('Selecione um processo para salvar o rascunho')
      return false
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('processo_id', processoId)
      if (user?.id) formData.append('user_id', user.id)
      formData.append('orientacoes', orientacoes)
      documentos.forEach((doc) => {
        if (doc.file) formData.append('documentos', doc.file)
      })

      await createRascunho(formData)
      toast.success('Rascunho salvo com sucesso!')
      if (onSuccess) onSuccess('draft')
      return true
    } catch (err: any) {
      console.error(err)
      toast.error('Erro ao salvar rascunho')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    orientacoes,
    setOrientacoes,
    documentos,
    loading,
    handleDocumentosAdd,
    handleDocumentosRemove,
    handleSend,
    handleDraft,
  }
}
