import { ProcessoDocumento } from '@/types'
import { Button } from '@/components/ui/button'
import { Upload, File, Download, Trash2 } from 'lucide-react'
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
    <div className="pt-2">
      {canUpload && (
        <div
          className="border-2 border-dashed border-border rounded-[6px] p-[20px] text-center bg-muted/30 hover:border-[hsl(210_60%_25%)] hover:bg-accent/10 transition-colors cursor-pointer mb-[24px]"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-[24px] h-[24px] text-muted-foreground mx-auto mb-[8px]" />
          <h4 className="text-[13px] font-medium text-foreground">Clique ou arraste um arquivo</h4>
          <p className="text-[11px] text-muted-foreground mt-[4px]">PDF, DOC, DOCX, JPG ou PNG</p>
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        </div>
      )}

      <div className="space-y-[8px]">
        {documentos.length === 0 ? (
          <p className="text-[13px] text-muted-foreground italic py-4">Nenhum documento anexado.</p>
        ) : (
          documentos.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-row justify-between items-center p-[8px_12px] bg-muted rounded-[6px]"
            >
              <div className="flex items-center gap-[12px] overflow-hidden">
                <File className="w-[16px] h-[16px] text-muted-foreground shrink-0" />
                <div className="min-w-0 flex flex-col justify-center">
                  <p className="text-[13px] font-medium text-foreground truncate" title={doc.name}>
                    {doc.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-[2px]">
                    {(doc.size / 1024).toFixed(1)} KB • {new Date(doc.created).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[8px] shrink-0 ml-[16px]">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-[32px] w-[32px] text-muted-foreground hover:text-foreground"
                >
                  <Download className="w-[16px] h-[16px]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-[32px] w-[32px] text-muted-foreground hover:text-destructive hover:border-destructive"
                  onClick={() => onDelete(doc.id)}
                >
                  <Trash2 className="w-[16px] h-[16px]" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
