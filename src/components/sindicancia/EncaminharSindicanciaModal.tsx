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
import { useNavigate } from 'react-router-dom'
import { useEncaminharSindicancia } from '@/hooks/use-encaminhar-sindicancia'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_EXTS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif']

export function EncaminharSindicanciaModal({ isOpen, onClose, processo, processos }: any) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    orientacoes,
    documentos,
    loading,
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
  } = useEncaminharSindicancia(onClose, (id) => navigate(`/sindicancia/${id}`))

  useEffect(() => {
    if (isOpen) {
      resetState()
      setSelectedId(processo?.id || '')
    }
  }, [isOpen, processo, resetState])

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      newFiles.forEach((f) => {
        if (f.size > MAX_FILE_SIZE) {
          toast.error(`Arquivo muito grande (max 10MB): ${f.name}`)
        } else {
          const ext = f.name.split('.').pop()?.toLowerCase() || ''
          if (!ALLOWED_EXTS.includes(ext)) {
            toast.error(`Tipo de arquivo não permitido: ${f.name}`)
          } else {
            handleDocumentosAdd(f)
          }
        }
      })
    }
  }

  const isFormValid = validateForm() && !!selectedId

  const submitSend = () => {
    if (!selectedId) {
      toast.error('Selecione um processo')
      return
    }
    setTouchedOrientacoes(true)
    setTouchedDocumentos(true)
    if (!validateForm()) return
    handleSend(selectedId)
  }

  const submitDraft = () => {
    if (!selectedId) {
      toast.error('Selecione um processo para salvar o rascunho')
      return
    }
    setTouchedOrientacoes(true)
    setTouchedDocumentos(true)
    if (!validateForm()) return
    handleDraft(selectedId)
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
            <span className="font-medium text-primary">Processando...</span>
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
              onChange={(e) => handleOrientacoesChange(e.target.value)}
              onBlur={() => setTouchedOrientacoes(true)}
              placeholder="Descreva as instruções detalhadas..."
              className={`min-h-[120px] font-mono text-sm ${touchedOrientacoes && orientacoes.length < 10 ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {touchedOrientacoes && orientacoes.length < 10 && (
              <p className="text-sm text-red-500">Minimo 10 caracteres</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Anexos (Max 5 arquivos, 10MB cada)</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer ${touchedDocumentos && documentos.length === 0 ? 'border-red-500' : 'border-muted-foreground/25'}`}
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
                onChange={onFilesSelected}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              />
            </div>
            {touchedDocumentos && documentos.length === 0 && (
              <p className="text-sm text-red-500">Selecione pelo menos 1 documento</p>
            )}

            {documentos.length > 0 && (
              <div className="space-y-2 mt-4">
                {documentos.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2 border rounded text-sm bg-background"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileIcon className="h-4 w-4 text-blue-500 shrink-0" />
                      <span className="truncate">{doc.filename}</span>
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => handleDocumentosRemove(doc.id)}
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
            onClick={submitDraft}
            disabled={loading || !isFormValid}
          >
            Salvar Rascunho
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={submitSend}
            disabled={loading || !isFormValid}
          >
            Enviar Processo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
