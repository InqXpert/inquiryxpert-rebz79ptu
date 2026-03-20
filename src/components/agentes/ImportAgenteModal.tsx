import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UploadCloud,
  X,
  FileSpreadsheet,
  Loader2,
  Download,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import * as XLSX from 'xlsx'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useImportProvider } from '@/hooks/useImportProvider'

interface ImportAgenteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImportAgenteModal({ open, onOpenChange }: ImportAgenteModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [inlineError, setInlineError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  const { status, analyzeFile, analysis, reset } = useImportProvider()

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFile(null)
      setInlineError(null)
      reset()
    }
    onOpenChange(isOpen)
  }

  const validateAndSetFile = async (f: File) => {
    setInlineError(null)
    const isXlsx =
      f.name.toLowerCase().endsWith('.xlsx') ||
      f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const isCsv = f.name.toLowerCase().endsWith('.csv') || f.type === 'text/csv'

    if (!isXlsx && !isCsv) {
      setInlineError('Formato inválido. Use .xlsx ou .csv.')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setInlineError('Arquivo muito grande. Limite de 5MB.')
      return
    }
    setFile(f)
    await analyzeFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleImport = () => {
    if (!analysis?.parsed) return
    handleOpenChange(false)
    navigate('/agentes/novo', {
      state: { importedData: analysis.parsed, showImportSuccess: true },
    })
  }

  const downloadTemplate = () => {
    const headers = [
      'Nome',
      'CPF/CNPJ',
      'Email',
      'Telefone',
      'Endereco',
      'Cidade',
      'Estado',
      'CEP',
      'Especialidade',
      'Banco',
      'Agencia',
      'Conta',
      'Chave PIX',
      'Valor por Processo',
    ]
    const example = [
      'Carlos Oliveira',
      '123.456.789-00',
      'carlos@email.com',
      '(11) 99999-0000',
      'Rua Exemplo, 123',
      'São Paulo',
      'SP',
      '01000-000',
      'Investigacao Patrimonial',
      'Banco do Brasil',
      '1234',
      '12345-6',
      'carlos@email.com',
      150.0,
    ]
    const ws = XLSX.utils.aoa_to_sheet([headers, example])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Modelo')
    XLSX.writeFile(wb, 'modelo-importacao-agente.xlsx')
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[600px] p-6 sm:p-8 !rounded-2xl border-none shadow-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-primary">
            Importar Dados do Agente
          </DialogTitle>
          <DialogDescription className="text-[15px] font-medium text-muted-foreground mt-2">
            Selecione uma planilha .xlsx ou .csv com os dados do agente.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-6">
          <input
            type="file"
            accept=".xlsx,.csv"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                validateAndSetFile(e.target.files[0])
              }
            }}
          />

          {file ? (
            <div className="border-2 border-dashed border-secondary bg-secondary/5 rounded-2xl p-6 text-center transition-colors duration-200">
              <div className="flex flex-row justify-between items-center bg-background p-4 rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[15px] text-foreground font-bold">{file.name}</span>
                    <span className="text-[13px] text-muted-foreground font-medium mt-0.5">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                    reset()
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  disabled={status === 'loading'}
                  aria-label="Remover arquivo selecionado"
                  className="hover:text-destructive h-10 w-10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {status === 'loading' ? (
                <div className="mt-8 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-secondary mb-3" />
                  <span className="text-[15px] font-semibold text-muted-foreground">
                    Analisando planilha...
                  </span>
                </div>
              ) : analysis ? (
                <div className="mt-6 text-left bg-background p-5 rounded-xl border border-border/50 shadow-sm">
                  <div className="flex flex-col gap-3">
                    {analysis.matched.length > 0 && (
                      <div className="flex flex-row gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-[14px] text-foreground">
                          <strong>{analysis.matched.length}</strong> colunas mapeadas com sucesso.
                        </span>
                      </div>
                    )}
                    {analysis.missing.length > 0 && (
                      <div className="flex flex-row gap-3 items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span className="text-[14px] text-muted-foreground font-medium">
                          Ausentes: {analysis.missing.join(', ')}
                        </span>
                      </div>
                    )}
                    {analysis.unmatched.length > 0 && (
                      <div className="flex flex-row gap-3 items-start">
                        <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-[14px] text-muted-foreground font-medium">
                          Extras (nas observações): {analysis.unmatched.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border/50 my-4" />
                  <p className="text-[13px] text-muted-foreground font-semibold italic">
                    Os dados serão preenchidos automaticamente no formulário a seguir.
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={cn(
                'border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary',
                dragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-muted/10 hover:border-primary hover:bg-primary/5',
                status === 'loading' && 'opacity-50 pointer-events-none',
              )}
            >
              <UploadCloud className="w-12 h-12 text-muted-foreground mx-auto mb-5 opacity-60" />
              <p className="text-base font-bold text-foreground mb-2">
                Arraste o arquivo aqui ou clique para selecionar
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                Apenas .xlsx e .csv (Máx. 5MB)
              </p>
            </div>
          )}

          {inlineError && (
            <p className="text-[14px] font-bold text-destructive mt-4">{inlineError}</p>
          )}

          <div className="mt-4">
            <button
              type="button"
              onClick={downloadTemplate}
              className="text-[14px] text-primary hover:text-primary/80 hover:underline font-bold flex flex-row gap-2 items-center px-1 rounded-md transition-colors"
            >
              <Download className="w-4 h-4" /> Baixar modelo de planilha
            </button>
          </div>
        </div>

        <DialogFooter className="mt-8 pt-6 border-t border-border gap-3 flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={status === 'loading'}
            className="rounded-xl h-12 px-6 font-bold w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || status === 'loading'}
            className="rounded-xl h-12 px-8 font-bold shadow-sm w-full sm:w-auto"
          >
            {status === 'loading' && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            Importar e Preencher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
