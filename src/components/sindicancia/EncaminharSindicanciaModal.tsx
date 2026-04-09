import React, { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { UploadCloud, X, File as FileIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  createEncaminhamento,
  createRascunho,
  sendSindicanciaEmail,
  sendSindicanciaWhatsapp,
} from '@/services/sindicancia'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_EXTS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif']

export function EncaminharSindicanciaModal({ isOpen, onClose, processo, processos }: any) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orientacoes, setOrientacoes] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setOrientacoes('')
      setFiles([])
      setSelectedId(processo?.id || '')
      setLoading(false)
    }
  }, [isOpen, processo])

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const validFiles: File[] = []
      newFiles.forEach((f) => {
        if (f.size > MAX_FILE_SIZE) {
          toast.error(`Arquivo muito grande (max 10MB): ${f.name}`)
        } else {
          const ext = f.name.split('.').pop()?.toLowerCase() || ''
          if (!ALLOWED_EXTS.includes(ext)) {
            toast.error(`Tipo de arquivo não permitido: ${f.name}`)
          } else {
            validFiles.push(f)
          }
        }
      })
      if (validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles].slice(0, 5))
      }
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    if (!selectedId) {
      toast.error('Selecione um processo')
      return false
    }
    if (orientacoes.length < 10) {
      toast.error('Minimo 10 caracteres')
      return false
    }
    return true
  }

  const handleSend = async () => {
    if (!validateForm()) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('processo_id', selectedId)
      formData.append('user_id', user.id)
      formData.append('orientacoes', orientacoes)
      files.forEach((f) => formData.append('documentos', f))

      const emailRes = await sendSindicanciaEmail({
        email_destinatario: 'agente@exemplo.com',
        orientacoes,
        processo_id: selectedId,
      })

      const wppRes = await sendSindicanciaWhatsapp({
        whatsapp_destinatario: '5511999999999',
        orientacoes,
        processo_id: selectedId,
      })

      formData.append('email_enviado', emailRes.success ? 'true' : 'false')
      formData.append('whatsapp_enviado', wppRes.success ? 'true' : 'false')
      formData.append('email_destinatario', 'agente@exemplo.com')
      formData.append('whatsapp_destinatario', '5511999999999')

      const record = await createEncaminhamento(formData)
      toast.success('Sindicância encaminhada com sucesso!')
      onClose()
      navigate(`/sindicancia/${record.id}`)
    } catch (err: any) {
      toast.error(err.message || 'Erro ao enviar sindicância')
    } finally {
      setLoading(false)
    }
  }

  const handleDraft = async () => {
    if (!selectedId) {
      toast.error('Selecione um processo para salvar o rascunho')
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('processo_id', selectedId)
      formData.append('user_id', user.id)
      formData.append('orientacoes', orientacoes)
      files.forEach((f) => formData.append('documentos', f))

      await createRascunho(formData)
      toast.success('Rascunho salvo com sucesso!')
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar rascunho')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Encaminhar Sindicância</DialogTitle>
          <DialogDescription>
            Forneça as instruções e documentos para a execução da sindicância.
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-black/80 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <span className="font-medium text-primary">Enviando...</span>
          </div>
        )}

        <div className="space-y-4 py-4 relative">
          {!processo && (
            <div className="space-y-2">
              <Label>Processo</Label>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um processo ativo" />
                </SelectTrigger>
                <SelectContent>
                  {processos?.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.numero_controle || p.id} - {p.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Orientações de Execução</Label>
            <Textarea
              value={orientacoes}
              onChange={(e) => setOrientacoes(e.target.value)}
              placeholder="Descreva as instruções detalhadas..."
              className="min-h-[120px] font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label>Anexos (Max 5 arquivos, 10MB cada)</Label>
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                Arraste arquivos ou clique para selecionar
              </p>
              <input
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFiles}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              />
            </div>

            {files.length > 0 && (
              <div className="space-y-2 mt-4">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 border rounded text-sm bg-background"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileIcon className="h-4 w-4 text-blue-500 shrink-0" />
                      <span className="truncate">{file.name}</span>
                      <span className="text-muted-foreground shrink-0 text-xs">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => removeFile(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="secondary"
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={handleDraft}
            disabled={loading}
          >
            Salvar Rascunho
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSend}
            disabled={loading}
          >
            Enviar Processo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
