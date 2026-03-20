import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2, FileSpreadsheet } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useImportOperacionalData } from '@/hooks/useImportOperacionalData'
import { downloadTemplate } from '@/services/procesosOperacionais'
import { ImportResultSummary } from './ImportResultSummary'
import { useToast } from '@/hooks/use-toast'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Props {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function ImportOperacionalDataModal({ isOpen, onClose, onComplete }: Props) {
  const { state, errorMsg, parsedData, progress, processFile, confirmImport, reset } =
    useImportOperacionalData()
  const [file, setFile] = useState<File | null>(null)
  const [inlineError, setInlineError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (state === 'success') {
      toast({
        title: 'Sucesso',
        description: `${parsedData?.rowsToImport.length} processos importados com sucesso!`,
      })
      onComplete()
      reset()
      setFile(null)
      setInlineError('')
    }
  }, [state, parsedData, toast, onComplete, reset])

  const handleClose = () => {
    reset()
    setFile(null)
    setInlineError('')
    onClose()
  }

  const onFileSelect = (f: File) => {
    setInlineError('')
    if (f.size > 10 * 1024 * 1024) {
      setInlineError('Arquivo muito grande. Limite de 10MB.')
      return
    }
    const ext = f.name.split('.').pop()?.toLowerCase()
    if (!['xlsx', 'xls', 'csv'].includes(ext || '')) {
      setInlineError('Formato invalido. Use .xlsx, .xls ou .csv.')
      return
    }
    setFile(f)
    processFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (state === 'loading' || state === 'importing') return
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-[600px] p-[24px] !rounded-[8px]">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-bold text-foreground">
            Importar Dados Operacionais
          </DialogTitle>
          <DialogDescription className="text-[13px] text-muted-foreground">
            Selecione uma planilha .xlsx ou .csv com os dados dos processos.
          </DialogDescription>
        </DialogHeader>

        {state === 'idle' && (
          <div className="space-y-2">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
              }}
              tabIndex={0}
              className={cn(
                'border-2 border-dashed border-border rounded-[6px] p-[40px] text-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2',
                'hover:border-primary hover:bg-primary/5 focus-visible:ring-primary',
              )}
            >
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
              />
              <Upload className="w-[32px] h-[32px] mx-auto text-muted-foreground mb-4" />
              <p className="text-[14px] font-medium text-foreground mb-1">
                Arraste o arquivo aqui ou clique para selecionar
              </p>
              <p className="text-[12px] text-muted-foreground">
                Aceita .xlsx, .xls e .csv (Máx 10MB)
              </p>
            </div>
            {inlineError && <p className="text-[13px] text-destructive mt-2">{inlineError}</p>}
          </div>
        )}

        {file && state !== 'idle' && (
          <div className="bg-muted p-4 rounded-[6px] flex items-center justify-between border border-border">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-primary" />
              <div>
                <p className="text-[13px] font-medium text-foreground">{file.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            {state === 'error' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setFile(null)
                  reset()
                }}
                aria-label="Remover arquivo selecionado"
                className="hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {state === 'loading' && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
            <p className="mt-4 text-[13px] text-muted-foreground">Lendo arquivo...</p>
          </div>
        )}

        {state === 'parsed' && parsedData && <ImportResultSummary data={parsedData} />}

        {state === 'importing' && (
          <div className="space-y-2 py-4">
            <div className="flex justify-between text-[13px] font-medium text-muted-foreground">
              <span>Importando processos...</span>
              <span>{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}

        {state === 'error' && errorMsg && (
          <p className="text-[13px] text-destructive mt-4 p-3 bg-destructive/10 rounded-[6px] border border-destructive/20">
            {errorMsg}
          </p>
        )}

        <div className="flex justify-between items-center mt-[24px]">
          <button
            type="button"
            onClick={downloadTemplate}
            className="text-[13px] text-primary hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
          >
            Baixar modelo de planilha
          </button>
          <div className="flex gap-[12px]">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={state === 'loading' || state === 'importing'}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmImport}
              disabled={state !== 'parsed'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {state === 'importing' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirmar e Importar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
