import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { AlertTriangle } from 'lucide-react'

export default function GestaoAgentesFaturamento() {
  const { user } = useAuth()

  if (user?.role === 'agente' || user?.role === 'analista') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-destructive/5 rounded-2xl border border-destructive/20 mt-10">
        <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold text-destructive">Acesso Negado</h2>
        <p className="text-muted-foreground mt-2">
          Você não possui permissão para visualizar esta página.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Faturamento</h1>
        <p className="text-muted-foreground mt-1">
          Controle de honorários, notas fiscais e pagamentos a prestadores.
        </p>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card">
        <CardContent className="p-12 text-center text-muted-foreground">
          <p className="font-medium text-[15px]">Módulo financeiro em desenvolvimento.</p>
        </CardContent>
      </Card>
    </div>
  )
}
