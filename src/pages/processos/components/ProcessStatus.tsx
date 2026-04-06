import { CheckCircle2 } from 'lucide-react'

export function ProcessStatus() {
  return (
    <div className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-foreground">Status do Processo</h4>
        <p className="text-sm text-muted-foreground">
          Todos os documentos obrigatórios foram enviados.
        </p>
      </div>
    </div>
  )
}
