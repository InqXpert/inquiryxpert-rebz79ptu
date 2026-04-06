import { FileText, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DocumentList() {
  return (
    <div className="w-full h-full border border-border bg-card rounded-xl flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Documentos Anexados</h3>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate text-foreground">
                    documento_comprovante_{item}.pdf
                  </p>
                  <p className="text-xs text-muted-foreground">Adicionado há 2 dias • 2.4 MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
