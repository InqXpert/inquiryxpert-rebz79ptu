import { ActionCard } from './ActionCard'
import { Plus, Search, Bell } from 'lucide-react'
import { HubData } from '@/hooks/use-hub-data'
import { differenceInDays, parseISO, startOfDay } from 'date-fns'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function HubTatico({ data }: { data: HubData }) {
  const handleSearchFocus = () => {
    const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement
    if (searchInput) searchInput.focus()
  }

  return (
    <div className="space-y-8">
      <section className="animate-fade-in">
        <h2 className="text-[18px] font-bold text-brand-navy mt-8 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard to="/processos/novo" icon={Plus} title="Novo Processo" primary />
          <ActionCard to="#" onClick={handleSearchFocus} icon={Search} title="Buscar Processo" />
          <ActionCard to="/processos/alertas" icon={Bell} title="Central de Alertas" />
        </div>
      </section>

      <section>
        <h2 className="text-[18px] font-bold text-brand-navy mt-8 mb-4 animate-fade-in">
          Painel de Atenção
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Para Resolver HOJE */}
          <div className="bg-white border border-border rounded-lg p-[12px] md:p-[16px] lg:p-[20px] border-l-4 border-l-destructive shadow-sm animate-fade-in">
            <h3 className="text-[16px] font-bold text-brand-navy mb-4">🚨 Para Resolver HOJE</h3>
            <div className="flex flex-col gap-[12px]">
              {data.resolverHoje?.length === 0 && (
                <p className="text-sm text-muted-foreground">Tudo em dia!</p>
              )}
              {data.resolverHoje?.map((task) => (
                <div
                  key={task.taskId || task.id}
                  className="flex flex-col border-b border-border/50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-bold text-[14px] text-brand-navy mb-1">
                    {task.taskTitle}
                  </span>
                  <span className="text-[12px] text-muted-foreground mb-3">
                    Agente: {task.expand?.agente_id?.nomeCompleto || 'N/A'}
                  </span>
                  <Link
                    to={`/processos/${task.id}`}
                    className="bg-white border border-border text-brand-navy px-[16px] py-[8px] rounded-[6px] hover:bg-secondary hover:text-secondary-foreground transition-colors duration-150 text-center font-medium text-[14px] inline-block"
                  >
                    Tratar
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Aguardando sua Revisão */}
          <div
            className="bg-white border border-border rounded-lg p-[12px] md:p-[16px] lg:p-[20px] border-l-4 border-l-brand-teal shadow-sm animate-fade-in"
            style={{ animationDelay: '100ms' }}
          >
            <h3 className="text-[16px] font-bold text-brand-navy mb-4">
              📄 Aguardando sua Revisão
            </h3>
            <div className="flex flex-col gap-[12px]">
              {data.aguardandoRevisao?.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma revisão pendente.</p>
              )}
              {data.aguardandoRevisao?.map((proc) => (
                <div
                  key={proc.id}
                  className="flex flex-col border-b border-border/50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-bold text-[14px] text-brand-navy mb-1">
                    Tipo: {proc.expand?.tipo_investigacao_id?.nome || 'N/A'}
                  </span>
                  <span className="text-[12px] text-muted-foreground mb-3">
                    Agente: {proc.expand?.agente_id?.nomeCompleto || 'N/A'}
                  </span>
                  <Link
                    to={`/processos/${proc.id}`}
                    className="bg-primary text-white px-[20px] py-[10px] rounded-[6px] font-bold text-[14px] hover:opacity-90 transition-opacity duration-150 text-center inline-block"
                  >
                    Revisar Agora
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Radar da Semana */}
          <div
            className="bg-white border border-border rounded-lg p-[12px] md:p-[16px] lg:p-[20px] border-l-4 border-l-primary shadow-sm animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <h3 className="text-[16px] font-bold text-brand-navy mb-4">🗓️ Radar da Semana</h3>
            <div className="flex flex-col gap-[12px]">
              {data.radarSemana?.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum vencimento próximo.</p>
              )}
              {data.radarSemana?.map((proc) => {
                const diff = differenceInDays(
                  startOfDay(parseISO(proc.data_prazo)),
                  startOfDay(new Date()),
                )
                const isUrgent = diff <= 0
                return (
                  <div
                    key={proc.id}
                    className="flex flex-col border-b border-border/50 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-bold text-[14px] text-brand-navy mb-1">
                      {proc.numero_processo || proc.numero_controle || 'Processo'}
                    </span>
                    <span className="text-[12px] text-muted-foreground mb-2">
                      {proc.expand?.seguradora_id?.nome || proc.cia || 'Seguradora'}
                    </span>
                    <span
                      className={cn(
                        'text-[12px] font-semibold',
                        isUrgent ? 'text-destructive' : 'text-primary',
                      )}
                    >
                      {diff < 0
                        ? `Vencido há ${Math.abs(diff)} dias`
                        : diff === 0
                          ? 'Vence HOJE'
                          : `Vence em ${diff} dias`}
                    </span>
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
