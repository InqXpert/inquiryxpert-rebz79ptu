import { Card, CardContent } from '@/components/ui/card'

export default function GestaoAgentesTermos() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Termos e Assinaturas</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie seus contratos e acordos de confidencialidade (NDA).
        </p>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card">
        <CardContent className="p-12 text-center text-muted-foreground">
          <p className="font-medium text-[15px]">Gerenciamento de termos em desenvolvimento.</p>
        </CardContent>
      </Card>
    </div>
  )
}
