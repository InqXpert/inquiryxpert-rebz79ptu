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

interface ImportProviderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImportProviderModal({ open, onOpenChange }: ImportProviderModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [inlineError, setInlineError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  const { status, parseFile, reset } = useImportProvider()

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFile(null)
      setInlineError(null)
      reset()
    }
    onOpenChange(isOpen)
  }

  const validateAndSetFile = (f: File) => {
    setInlineError(null)
    const isXlsx =
      f.name.toLowerCase().endsWith('.xlsx') ||
      f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const isCsv = f.name.toLowerCase().endsWith('.csv') || f.type === 'text/csv'

    if (!isXlsx && !isCsv) {
      setInlineError('Formato invalido. Use .xlsx ou .csv.')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setInlineError('Arquivo muito grande. Limite de 5MB.')
      return
    }
    setFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleImport = async () => {
    if (!file) return
    const parsed = await parseFile(file)
    if (parsed) {
      handleOpenChange(false)
      navigate('/prestadores/novo', { state: { importedData: parsed, showImportSuccess: true } })
    }
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
    XLSX.writeFile(wb, 'modelo-importacao-prestador.xlsx')
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[520px] p-[24px]">
        <DialogHeader>
          <DialogTitle>Importar Dados do Prestador</DialogTitle>
          <DialogDescription>
            Selecione uma planilha .xlsx ou .csv com os dados do prestador.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
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
            <div className="border-2 border-dashed border-green-400 bg-green-50 rounded-[12px] p-[24px] text-center transition-colors duration-200">
              <div className="flex flex-row justify-between items-center bg-white p-[12px] rounded-lg border border-green-200 shadow-sm">
                <div className="flex items-center gap-[12px]">
                  <FileSpreadsheet className="w-[20px] h-[20px] text-green-600" />
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] text-foreground font-medium">{file.name}</span>
                    <span className="text-[12px] text-muted-foreground">
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
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  disabled={status === 'loading'}
                  aria-label="Remover arquivo selecionado"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="mt-[24px] text-left">
                <div className="flex flex-col gap-[8px]">
                  <div className="flex flex-row gap-[8px] items-center">
                    <CheckCircle2 className="w-[14px] h-[14px] text-green-600" />
                    <span className="text-[13px] text-foreground">Campos Encontrados</span>
                  </div>
                  <div className="flex flex-row gap-[8px] items-center">
                    <AlertTriangle className="w-[14px] h-[14px] text-yellow-600" />
                    <span className="text-[13px] text-muted-foreground">
                      Especialidade (não encontrada)
                    </span>
                  </div>
                </div>
                <div className="border-t border-border my-[12px]" />
                <p className="text-[12px] text-muted-foreground italic">
                  Os dados serão preenchidos automaticamente no formulário a seguir.
                </p>
              </div>
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
                'border-2 border-dashed rounded-[12px] p-[40px_24px] text-center transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary',
                dragOver
                  ? 'border-primary bg-accent/30'
                  : 'border-border bg-transparent hover:border-primary hover:bg-accent/30',
                status === 'loading' && 'opacity-50 pointer-events-none',
              )}
            >
              <UploadCloud className="w-[40px] h-[40px] text-muted-foreground mx-auto mb-[16px]" />
              <p className="text-[15px] font-medium text-foreground mb-[4px]">
                Arraste o arquivo aqui ou clique para selecionar
              </p>
              <p className="text-[13px] text-muted-foreground">Apenas .xlsx e .csv (Máx. 5MB)</p>
            </div>
          )}

          {inlineError && (
            <p className="text-sm font-medium text-destructive mt-3">{inlineError}</p>
          )}

          <div className="mt-[16px]">
            <button
              type="button"
              onClick={downloadTemplate}
              className="text-[13px] text-primary hover:underline font-medium flex flex-row gap-[6px] items-center"
            >
              <Download className="w-[14px] h-[14px]" /> Baixar modelo de planilha
            </button>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={status === 'loading'}
          >
            Cancelar
          </Button>
          <Button onClick={handleImport} disabled={!file || status === 'loading'}>
            {status === 'loading' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Importar e Preencher
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
