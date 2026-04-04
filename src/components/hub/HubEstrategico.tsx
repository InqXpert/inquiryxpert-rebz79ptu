import { ActionCard } from './ActionCard'
import { AttentionPanel } from './AttentionPanel'
import { LayoutDashboard, FileText, Users } from 'lucide-react'
import { HubData } from '@/hooks/use-hub-data'

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
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Painéis de Atenção</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttentionPanel
            title="🔥 Fogo Alto"
            borderColorClass="border-l-destructive"
            items={[{ label: 'Inadimplência (NFs Vencidas)', value: data.inadimplenciaCount || 0 }]}
          />
          <AttentionPanel
            title="📡 Radar"
            borderColorClass="border-l-primary"
            items={[
              { label: 'Processos Ativos', value: data.processosAtivosCount || 0 },
              { label: 'Faturamento do Mês', value: faturamento },
            ]}
          />
        </div>
      </section>
    </div>
  )
}
