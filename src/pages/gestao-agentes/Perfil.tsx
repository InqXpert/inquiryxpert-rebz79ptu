import { Card, CardContent } from '@/components/ui/card'

export default function GestaoAgentesPerfil() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Meu Perfil Profissional</h1>
        <p className="text-muted-foreground mt-1">
          Visualize seus dados cadastrais e área de atuação.
        </p>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card">
        <CardContent className="p-12 text-center text-muted-foreground">
          <p className="font-medium text-[15px]">Perfil restrito ao agente em desenvolvimento.</p>
        </CardContent>
      </Card>
    </div>
  )
}
