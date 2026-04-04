import { ActionCard } from './ActionCard'
import { AttentionPanel } from './AttentionPanel'
import { PlusCircle, Search } from 'lucide-react'
import { HubData } from '@/hooks/use-hub-data'

export function HubOperacional({ data }: { data: HubData }) {
  const handleSearchFocus = () => {
    const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
    if (searchInput) {
      searchInput.focus()
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard
            to="/processos/novo"
            icon={PlusCircle}
            title="Novo Processo"
            description="Criar um novo processo operacional"
            primary
          />
          <ActionCard
            to="#"
            onClick={handleSearchFocus}
            icon={Search}
            title="Buscar Processo"
            description="Pesquisar por placa, segurado ou número"
          />
        </div>
      </section>

      <section>
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Painéis de Atenção</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttentionPanel
            title="⚠️ Minhas Pendências"
            borderColorClass="border-l-destructive"
            items={[{ label: 'Meus Processos Atrasados', value: data.meusAtrasadosCount || 0 }]}
          />
          <AttentionPanel
            title="📥 Caixa de Entrada"
            borderColorClass="border-l-primary"
            items={[{ label: 'Novos Processos Atribuídos', value: data.novosAtribuidosCount || 0 }]}
          />
        </div>
      </section>
    </div>
  )
}
