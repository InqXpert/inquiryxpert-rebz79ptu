import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Ajuda() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Ajuda e Suporte</h1>
        <p className="text-muted-foreground mt-1 text-sm">Acesse tutoriais e contato de suporte</p>
      </div>
      <Card className="border-none shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg text-primary">Central de Ajuda</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Página em construção.</p>
        </CardContent>
      </Card>
    </div>
  )
}
