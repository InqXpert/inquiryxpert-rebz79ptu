import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, X, FileSpreadsheet, Loader2 } from 'lucide-react'
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
      <DialogContent className="max-w-md">
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
              'border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
              dragOver
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50',
              status === 'loading' && 'opacity-50 pointer-events-none',
            )}
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
            <p className="font-medium text-foreground mb-1">
              Arraste o arquivo aqui ou clique para selecionar
            </p>
            <p className="text-sm text-muted-foreground">Apenas .xlsx e .csv (Máx. 5MB)</p>
          </div>

          {inlineError && (
            <p className="text-sm font-medium text-destructive mt-3">{inlineError}</p>
          )}

          {file && (
            <div className="flex items-center justify-between p-3 border rounded-md mt-4 bg-muted/30">
              <div className="flex flex-col text-left overflow-hidden">
                <span className="font-medium text-sm truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setFile(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                aria-label="Remover arquivo selecionado"
                disabled={status === 'loading'}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={downloadTemplate}
              className="text-sm text-primary hover:underline font-medium flex items-center"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1" /> Baixar modelo de planilha
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
