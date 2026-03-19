import { ProcessoDocumento } from '@/types'
import { Button } from '@/components/ui/button'
import { Upload, FileText, Trash2, Download } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  documentos: ProcessoDocumento[]
  canUpload: boolean
  onUpload: (file: File) => void
  onDelete: (id: string) => void
}

export function TabDocumentos({ documentos, canUpload, onUpload, onDelete }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6 pt-4 animate-in fade-in">
      {canUpload && (
        <div
          className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center bg-muted/20 hover:bg-accent/10 hover:border-primary transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <h4 className="text-sm font-medium text-foreground">Clique ou arraste um arquivo</h4>
          <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, JPG ou PNG</p>
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-4">
          Arquivos Anexados ({documentos.length})
        </h4>
        {documentos.length === 0 ? (
          <p className="text-sm text-muted-foreground italic text-center py-4">
            Nenhum documento anexado.
          </p>
        ) : (
          documentos.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-primary/10 rounded-md shrink-0 text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate" title={doc.name}>
                    {doc.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {(doc.size / 1024).toFixed(1)} KB • {new Date(doc.created).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete(doc.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
