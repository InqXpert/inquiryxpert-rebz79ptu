import { UploadCloud } from 'lucide-react'

export function FileUploadZone() {
  return (
    <div className="w-full h-full min-h-[300px] border-dashed border-2 border-muted-foreground/30 bg-muted/20 rounded-xl flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Upload de Arquivos</h3>
        <p className="text-sm text-muted-foreground">
          Arraste e solte seus arquivos aqui ou clique para selecionar.
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-muted-foreground gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <UploadCloud className="w-8 h-8" />
        </div>
        <div>
          <p className="font-medium text-foreground">Clique para fazer upload</p>
          <p className="text-sm">SVG, PNG, JPG, PDF ou DOCX (max. 10MB)</p>
        </div>
      </div>
    </div>
  )
}
