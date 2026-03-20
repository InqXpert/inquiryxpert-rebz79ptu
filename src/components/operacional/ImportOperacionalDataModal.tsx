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
      <DialogContent className="max-w-[650px] p-6 sm:p-8 !rounded-2xl border-none shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-primary">
            Importar Dados Operacionais
          </DialogTitle>
          <DialogDescription className="text-[15px] font-medium text-muted-foreground mt-2">
            Selecione uma planilha .xlsx ou .csv com os dados dos processos.
          </DialogDescription>
        </DialogHeader>

        {state === 'idle' && (
          <div className="space-y-3">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
              }}
              tabIndex={0}
              className={cn(
                'border-2 border-dashed border-border rounded-2xl p-12 text-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 bg-muted/10',
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
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-5 opacity-60" />
              <p className="text-base font-bold text-foreground mb-2">
                Arraste o arquivo aqui ou clique para selecionar
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Aceita .xlsx, .xls e .csv (Máx 10MB)
              </p>
            </div>
            {inlineError && (
              <p className="text-[14px] font-medium text-destructive mt-3">{inlineError}</p>
            )}
          </div>
        )}

        {file && state !== 'idle' && (
          <div className="bg-background p-5 rounded-2xl flex items-center justify-between border border-border shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-[15px] font-bold text-foreground truncate max-w-[300px]">
                  {file.name}
                </p>
                <p className="text-[13px] font-medium text-muted-foreground mt-0.5">
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
                className="hover:text-destructive h-10 w-10"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {state === 'loading' && (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 mx-auto animate-spin text-primary" />
            <p className="mt-5 text-[15px] font-semibold text-muted-foreground">Lendo arquivo...</p>
          </div>
        )}

        {state === 'parsed' && parsedData && (
          <div className="mb-6">
            <ImportResultSummary data={parsedData} />
          </div>
        )}

        {state === 'importing' && (
          <div className="space-y-3 py-6">
            <div className="flex justify-between text-[14px] font-bold text-primary">
              <span>Importando processos...</span>
              <span>{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2.5 rounded-full"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}

        {state === 'error' && errorMsg && (
          <div className="mt-4 p-4 bg-destructive/10 rounded-xl border border-destructive/20 mb-6">
            <p className="text-[14px] font-semibold text-destructive">{errorMsg}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-border gap-4">
          <button
            type="button"
            onClick={downloadTemplate}
            className="text-[14px] text-primary hover:text-primary/80 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1 transition-colors w-full sm:w-auto text-left sm:text-center"
          >
            Baixar modelo de planilha
          </button>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={state === 'loading' || state === 'importing'}
              className="rounded-xl h-12 px-6 flex-1 sm:flex-none font-bold"
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmImport}
              disabled={state !== 'parsed'}
              className="rounded-xl h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-sm flex-1 sm:flex-none"
            >
              {state === 'importing' && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              Confirmar e Importar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
