import { useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadFile = async (data: {
    processo_id: string
    agente_id: string
    file: File
    tipo_arquivo: 'foto' | 'audio' | 'documento' | 'despesas'
  }) => {
    setIsUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('processo_id', data.processo_id)
      formData.append('agente_id', data.agente_id)

      // Sanitize filename removing special characters
      const safeName = data.file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      formData.append('arquivo', data.file, safeName)
      formData.append('nome_arquivo', safeName)
      formData.append('tipo_arquivo', data.tipo_arquivo)
      formData.append('tamanho_bytes', data.file.size.toString())
      formData.append('status', 'enviado')

      // Simulate progress updates for UX
      const interval = setInterval(() => {
        setProgress((p) => Math.min(p + 15, 90))
      }, 150)

      const record = await pb.collection('arquivos_processo').create(formData)

      clearInterval(interval)
      setProgress(100)

      toast.success('Arquivo enviado com sucesso.')
      return { error: null, record }
    } catch (err: any) {
      setProgress(0)
      const errorMsg = getErrorMessage(err)
      toast.error(`Não foi possível enviar arquivo: ${errorMsg}`)
      return { error: err, record: null }
    } finally {
      setTimeout(() => setIsUploading(false), 500)
    }
  }

  return { uploadFile, isUploading, progress }
}
