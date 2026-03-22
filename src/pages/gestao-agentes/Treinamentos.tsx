import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap } from 'lucide-react'

export default function GestaoAgentesTreinamentos() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#282c59]">
          Biblioteca de Treinamentos
        </h1>
        <p className="text-muted-foreground mt-1">
          Acesse manuais, vídeos e documentações de melhores práticas.
        </p>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card min-h-[400px] flex items-center justify-center">
        <CardContent className="p-12 text-center text-muted-foreground flex flex-col items-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <GraduationCap className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <p className="font-bold text-lg text-[#282c59] mb-2">Central de Treinamentos</p>
          <p className="font-medium text-[15px] max-w-md">
            Área de capacitação em desenvolvimento. Aqui você encontrará os treinamentos
            obrigatórios e materiais de apoio.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
