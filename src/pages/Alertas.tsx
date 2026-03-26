import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Alertas() {
  return (
    <div className="w-full px-4 md:px-8 py-6 md:py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard de Alertas</h1>
        <p className="text-muted-foreground">Monitoramento e notificações do sistema.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alertas Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nenhum alerta crítico no momento.</p>
        </CardContent>
      </Card>
    </div>
  )
}
