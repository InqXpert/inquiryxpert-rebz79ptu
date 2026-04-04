import { ActionCard } from './ActionCard'
import { AttentionPanel } from './AttentionPanel'
import { PlusCircle, Bell, FileSearch, UserCheck } from 'lucide-react'
import { HubData } from '@/hooks/use-hub-data'

export function HubTatico({ data }: { data: HubData }) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActionCard to="/processos/novo" icon={PlusCircle} title="Novo Processo" primary />
          <ActionCard to="/processos/alertas" icon={Bell} title="Central de Alertas" />
          <ActionCard
            to="/processos?relatorio_status=enviado"
            icon={FileSearch}
            title="Revisar Relatórios"
          />
          <ActionCard to="/agentes" icon={UserCheck} title="Gestão de Agentes" />
        </div>
      </section>

      <section>
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Painéis de Atenção</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AttentionPanel
            title="🔥 Fogo Alto"
            borderColorClass="border-l-destructive"
            items={[{ label: 'Processos Vencidos', value: data.processosVencidosCount || 0 }]}
          />
          <AttentionPanel
            title="⚠️ Atenção"
            borderColorClass="border-l-[#f97316]"
            items={[{ label: 'Sem Atualização há 3 dias', value: data.semAtualizacaoCount || 0 }]}
          />
          <AttentionPanel
            title="📡 Radar da Equipe"
            borderColorClass="border-l-[#14b8a6]"
            items={[{ label: 'Agentes Ociosos', value: data.agentesOciososCount || 0 }]}
          />
        </div>
      </section>
    </div>
  )
}
