import { ActionCard } from './ActionCard'
import { PlusCircle, Search, Bell, FileText } from 'lucide-react'
import { HubData } from '@/hooks/use-hub-data'
import { differenceInDays, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function HubTatico({ data }: { data: HubData }) {
  const handleSearchFocus = () => {
    const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
    if (searchInput) searchInput.focus()
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard to="/processos/novo" icon={PlusCircle} title="Novo Processo" primary />
          <ActionCard to="#" onClick={handleSearchFocus} icon={Search} title="Buscar Processo" />
          <ActionCard to="/processos/alertas" icon={Bell} title="Central de Alertas" />
        </div>
      </section>

      <section>
        <h2 className="text-[18px] font-bold text-[#1e293b] mt-8 mb-4">Painel de Atenção</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Para Resolver HOJE */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Para Resolver HOJE 🚨</h3>
            <div className="space-y-4">
              {data.resolverHoje?.length === 0 && (
                <p className="text-sm text-muted-foreground">Tudo em dia!</p>
              )}
              {data.resolverHoje?.map((proc, i) => {
                const isCobrar = i % 2 === 0
                return (
                  <div
                    key={proc.id}
                    className={`p-4 rounded-md border-l-4 shadow-sm bg-card border ${isCobrar ? 'border-l-destructive' : 'border-l-[#f97316]'}`}
                  >
                    <p className="font-semibold text-sm mb-1">
                      {isCobrar ? 'Cobrar Agente' : 'Enviar Posição'} -{' '}
                      {proc.numero_processo || proc.numero_controle || 'Processo'}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3 truncate">
                      Agente: {proc.expand?.agente_id?.nomeCompleto || 'N/A'}
                    </p>
                    <Button
                      size="sm"
                      asChild
                      variant="outline"
                      className="w-full h-8 text-xs font-bold"
                    >
                      <Link to={`/processos/${proc.id}`}>Tratar</Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Aguardando sua Revisão */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Aguardando sua Revisão 📄</h3>
            <div className="space-y-4">
              {data.aguardandoRevisao?.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma revisão pendente.</p>
              )}
              {data.aguardandoRevisao?.map((proc) => (
                <div
                  key={proc.id}
                  className="p-4 rounded-md border-l-4 shadow-sm bg-card border border-l-[#14b8a6]"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-5 h-5 text-[#14b8a6] shrink-0" />
                    <div className="overflow-hidden">
                      <p className="font-semibold text-sm truncate">
                        {proc.expand?.tipo_investigacao_id?.nome || 'Investigação'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {proc.expand?.agente_id?.nomeCompleto || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    asChild
                    className="w-full h-8 text-xs font-bold bg-primary text-primary-foreground"
                  >
                    <Link to={`/processos/${proc.id}`}>Revisar Agora</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Radar da Semana */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Radar da Semana 📅</h3>
            <div className="space-y-4">
              {data.radarSemana?.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum vencimento próximo.</p>
              )}
              {data.radarSemana?.map((proc) => {
                const diff = differenceInDays(parseISO(proc.data_prazo), new Date())
                const isUrgent = diff <= 1
                return (
                  <div
                    key={proc.id}
                    className={`p-4 rounded-md border-l-4 shadow-sm bg-card border ${isUrgent ? 'border-l-destructive' : 'border-l-primary'}`}
                  >
                    <p className="font-semibold text-sm mb-1">
                      {proc.numero_processo || proc.numero_controle || 'Processo'}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2 truncate">
                      {proc.expand?.seguradora_id?.nome || proc.cia || 'Seguradora'}
                    </p>
                    <div
                      className={`text-xs font-bold ${isUrgent ? 'text-destructive' : 'text-primary'}`}
                    >
                      {diff < 0
                        ? `Vencido há ${Math.abs(diff)} dias`
                        : diff === 0
                          ? 'Vence HOJE'
                          : `Vence em ${diff} dias`}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
