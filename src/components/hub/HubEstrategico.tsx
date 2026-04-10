import { ActionCard } from './ActionCard'
import { LayoutDashboard, FileText, Users } from 'lucide-react'
import { HubData } from '@/hooks/use-hub-data'
import { format, parseISO } from 'date-fns'

export function HubEstrategico({ data }: { data: HubData }) {
  const faturamento = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    data.faturamentoMes || 0,
  )

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            to="/dashboard-executivo"
            icon={LayoutDashboard}
            title="Dashboard Executivo"
            description="Visão geral de negócios e indicadores"
          />
          <ActionCard
            to="/financeiro/notas-fiscais"
            icon={FileText}
            title="Faturamento e NFs"
            description="Gerenciamento de notas fiscais e faturas"
          />
          <ActionCard
            to="/gestao-usuarios"
            icon={Users}
            title="Gestão de Usuários"
            description="Administrar acessos e permissões"
          />
        </div>
      </section>

      <section>
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Painel de Atenção</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fogo Alto */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border border-l-4 border-l-destructive">
            <h3 className="text-lg font-bold text-foreground mb-4">🔥 Requer ação urgente</h3>
            <div className="space-y-4">
              {data.nfsVencidas?.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma nota vencida.</p>
              )}
              {data.nfsVencidas?.map((nf) => (
                <div
                  key={nf.id}
                  className="flex items-center justify-between gap-4 p-3 bg-muted/20 rounded-md border border-border/50"
                >
                  <div>
                    <p className="font-semibold text-sm">NF: {nf.numero_nf}</p>
                    <p className="text-xs text-muted-foreground">
                      Venceu em: {format(parseISO(nf.data_vencimento), 'dd/MM/yyyy')}
                    </p>
                  </div>
                  <span className="font-bold text-destructive">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      nf.valor_total || 0,
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Radar */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border border-l-4 border-l-primary">
            <h3 className="text-lg font-bold text-foreground mb-4">📡 Radar</h3>
            <div className="space-y-4 flex flex-col justify-center h-[calc(100%-2rem)]">
              <div className="flex items-center justify-between gap-4 py-2 border-b">
                <span className="text-sm font-medium text-muted-foreground">Processos Ativos</span>
                <span className="text-xl font-bold text-foreground">
                  {data.processosAtivosCount || 0}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Faturamento do Mês
                </span>
                <span className="text-xl font-bold text-foreground">{faturamento}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
