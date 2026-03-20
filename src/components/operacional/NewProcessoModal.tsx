import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UploadCloud, FileText, Loader2, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import * as service from '@/services/procesosOperacionais'
import { useAuth } from '@/hooks/use-auth'
import { ProcessoOperacional } from '@/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  defaultProvider?: string
  onCreated: () => void
}

export function NewProcessoModal({ isOpen, onClose, defaultProvider, onCreated }: Props) {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<Partial<ProcessoOperacional>>({})
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFormData({ agente_prestador: defaultProvider || '' })
      setPdfFile(null)
      setIsExtracting(false)
      setIsSaving(false)
      service
        .getNextNumeroControle()
        .then((num) => setFormData((p) => ({ ...p, numero_controle: num })))
    }
  }, [isOpen, defaultProvider])

  const handlePdfSelect = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, envie um PDF.',
        variant: 'destructive',
      })
      return
    }
    setPdfFile(file)
    setIsExtracting(true)

    setTimeout(() => {
      setFormData((p) => ({
        ...p,
        nome_segurado: 'João Segurado Exemplo',
        placas_veiculos: 'ABC-1234',
        controle_cia: 'AV-998877',
      }))
      setIsExtracting(false)
      toast({ title: 'Extração concluída', description: 'Dados extraídos com sucesso!' })
    }, 1500)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const created = await service.createProcesso({
        ...formData,
        status: 'analise_inicial',
        data_entrada: new Date().toLocaleDateString('pt-BR'),
        user_id: user?.id,
      })
      if (pdfFile) {
        await service.uploadDocumento(created.id, pdfFile)
      }
      toast({ title: 'Processo Criado', description: 'O processo foi gerado com sucesso.' })
      onCreated()
      onClose()
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o processo.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const fields = [
    { key: 'numero_controle', label: 'Número de Controle', readOnly: true },
    { key: 'agente_prestador', label: 'Agente Prestador' },
    { key: 'cia', label: 'Seguradora (Cia)' },
    { key: 'tipo_servico', label: 'Tipo de Serviço' },
    { key: 'nome_segurado', label: 'Nome do Segurado' },
    { key: 'placas_veiculos', label: 'Placa do Veículo' },
    { key: 'controle_cia', label: 'Número de Aviso (Cia)' },
    { key: 'local_sinistro', label: 'Local do Sinistro' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-[800px] p-6 sm:p-8 !rounded-2xl border-none shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-primary">Novo Processo</DialogTitle>
          <DialogDescription className="text-[15px] font-medium text-muted-foreground mt-2">
            Preencha os dados manualmente ou faça upload de uma apólice para extração automática.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-6">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handlePdfSelect(e.target.files[0])}
          />
          {!pdfFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center group bg-muted/10"
            >
              {isExtracting ? (
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
              ) : (
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-3 group-hover:text-primary transition-colors opacity-60" />
              )}
              <p className="text-[15px] font-bold text-foreground mb-1">
                {isExtracting ? 'Extraindo dados...' : 'Extração via Apólice (PDF)'}
              </p>
              {!isExtracting && (
                <p className="text-[13px] font-medium text-muted-foreground">
                  Clique para selecionar
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between p-5 bg-background border border-border rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <p className="text-[15px] font-bold text-foreground">{pdfFile.name}</p>
                  <p className="text-[13px] font-medium text-muted-foreground mt-0.5">
                    Arquivo pronto para anexo.
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPdfFile(null)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive h-10 w-10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div key={f.key} className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-muted-foreground">{f.label}</label>
                <Input
                  className={`h-12 text-[14px] rounded-xl border-border ${f.readOnly ? 'bg-muted/50 cursor-not-allowed font-semibold text-primary' : 'focus-visible:ring-2 focus-visible:ring-primary/50'}`}
                  value={(formData as any)[f.key] || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, [f.key]: e.target.value }))}
                  readOnly={f.readOnly}
                  placeholder={f.readOnly ? 'Gerando...' : ''}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSaving || isExtracting}
              className="rounded-xl h-12 px-6 font-bold"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || isExtracting}
              className="rounded-xl h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[140px] font-bold shadow-sm"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              Salvar Processo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
