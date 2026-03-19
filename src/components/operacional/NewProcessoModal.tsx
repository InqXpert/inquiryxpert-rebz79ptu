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

    // Mock OCR Extraction
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
      <DialogContent className="max-w-[700px] p-[24px] !rounded-[8px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">Novo Processo</DialogTitle>
          <DialogDescription>
            Preencha os dados manualmente ou faça upload de uma apólice para extração automática.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
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
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-accent/30 transition-colors mb-6 flex flex-col items-center justify-center group"
            >
              {isExtracting ? (
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
              ) : (
                <UploadCloud className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
              )}
              <p className="text-sm font-medium text-foreground">
                {isExtracting ? 'Extraindo dados...' : 'Extração via Apólice (PDF)'}
              </p>
              {!isExtracting && (
                <p className="text-xs text-muted-foreground">Clique para selecionar</p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-xl mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{pdfFile.name}</p>
                  <p className="text-xs text-muted-foreground">Arquivo pronto para anexo.</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPdfFile(null)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-muted-foreground">{f.label}</label>
                <Input
                  className={`h-10 text-[13px] rounded-lg ${f.readOnly ? 'bg-muted/50 cursor-not-allowed font-semibold' : ''}`}
                  value={(formData as any)[f.key] || ''}
                  onChange={(e) => setFormData((p) => ({ ...p, [f.key]: e.target.value }))}
                  readOnly={f.readOnly}
                  placeholder={f.readOnly ? 'Gerando...' : ''}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} disabled={isSaving || isExtracting}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || isExtracting}
              className="bg-primary hover:bg-primary/90 text-white min-w-[120px]"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Salvar Processo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
