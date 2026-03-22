import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react'

export default function GestaoAgentesDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Painel do Agente</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral das suas atividades e processos pendentes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border shadow-sm rounded-2xl bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                  Processos Ativos
                </p>
                <h3 className="text-3xl font-bold text-foreground">12</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm rounded-2xl bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                  Prazos Próximos
                </p>
                <h3 className="text-3xl font-bold text-foreground">3</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm rounded-2xl bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                  Pendências de Áudio
                </p>
                <h3 className="text-3xl font-bold text-foreground">1</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm rounded-2xl bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                  Processos Concluídos
                </p>
                <h3 className="text-3xl font-bold text-foreground">45</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card">
        <CardHeader className="border-b border-border p-6">
          <CardTitle className="text-lg font-bold">Avisos e Notificações</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8 text-muted-foreground">
            <p className="font-medium">Nenhuma notificação recente.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
