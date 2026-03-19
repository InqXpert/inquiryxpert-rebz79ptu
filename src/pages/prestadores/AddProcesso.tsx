import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { UploadCloud, X, FileText } from 'lucide-react'

export default function AddProcesso() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[800px] mx-auto p-[32px]">
      <h1 className="text-[24px] font-bold mb-[4px] text-foreground">Novo Processo</h1>
      <p className="text-[14px] text-muted-foreground mb-[32px]">
        Preencha os detalhes para iniciar um novo processo para este prestador.
      </p>

      <div className="bg-card border border-border rounded-[16px] p-[32px]">
        <div className="mb-6">
          <label className="text-[13px] font-medium text-foreground mb-[6px] block">
            Título do Processo
          </label>
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Ex: Investigação Patrimonial"
          />
        </div>

        <div className="mb-6">
          <label className="text-[13px] font-medium text-foreground mb-[6px] block">
            Orientações e Detalhes
          </label>
          <textarea
            className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
            placeholder="Descreva os detalhes da solicitação..."
          />
        </div>

        <div className="mb-6">
          <label className="text-[13px] font-medium text-foreground mb-[6px] block">
            Anexar Documentos
          </label>
          <div className="border-2 border-dashed border-border rounded-[12px] p-[32px] text-center bg-muted/30 hover:border-primary hover:bg-accent/50 transition-colors cursor-pointer group">
            <UploadCloud className="w-[32px] h-[32px] text-muted-foreground mb-[8px] mx-auto group-hover:text-primary transition-colors" />
            <p className="text-[14px] text-foreground font-medium">
              Clique para selecionar ou arraste os arquivos
            </p>
            <p className="text-[12px] text-muted-foreground">PDF, JPG, PNG (Máx 10MB)</p>
          </div>

          <div className="flex flex-row justify-between items-center p-[8px_12px] bg-muted rounded-[8px] mt-[8px]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-[13px] text-foreground">documento_inicial.pdf</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground">2.4 MB</span>
              <Button variant="ghost" size="icon" className="hover:text-destructive w-8 h-8">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-[12px] justify-end mt-[24px]">
          <Button variant="ghost" className="h-[44px]" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button variant="outline" className="h-[44px] px-[24px]">
            Salvar Rascunho
          </Button>
          <Button className="bg-primary text-white h-[44px] px-[24px] hover:brightness-110">
            Salvar e Enviar
          </Button>
        </div>
      </div>
    </div>
  )
}
