import { useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

export default function GestaoAgentesProcessoDetail() {
  const { id } = useParams()

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Detalhes do Processo</h1>
        <p className="text-muted-foreground mt-1">Visualizando processo ID: {id}</p>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card">
        <CardContent className="p-12 text-center text-muted-foreground">
          <p className="font-medium text-[15px]">
            Página de detalhes restrita ao agente em desenvolvimento.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
