import { Card, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-react'

export default function GestaoAgentesRelatorios() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#282c59]">Relatórios</h1>
        <p className="text-muted-foreground mt-1">
          Envie e acompanhe a aprovação dos seus relatórios de investigação.
        </p>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card min-h-[400px] flex items-center justify-center">
        <CardContent className="p-12 text-center text-muted-foreground flex flex-col items-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <FileText className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <p className="font-bold text-lg text-[#282c59] mb-2">Central de Relatórios</p>
          <p className="font-medium text-[15px] max-w-md">
            Este módulo está em desenvolvimento. Em breve você poderá criar e editar seus relatórios
            com validação automática de campos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
