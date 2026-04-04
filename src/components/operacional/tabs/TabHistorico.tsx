import { ProcessoHistorico } from '@/types'

interface Props {
  historico: ProcessoHistorico[]
}

export function TabHistorico({ historico }: Props) {
  return (
    <div className="pt-2">
      {historico.length === 0 ? (
        <p className="text-[13px] text-muted-foreground italic py-4">Nenhum evento registrado.</p>
      ) : (
        <div className="space-y-0 relative">
          {historico.map((h, i) => (
            <div key={h.id} className="flex flex-row gap-[12px] pb-[16px] relative">
              <div className="w-[8px] h-[8px] rounded-full bg-brand-cyan mt-[6px] z-10 shrink-0 shadow-sm" />
              {i < historico.length - 1 && (
                <div className="absolute left-[3px] top-[14px] w-[2px] h-full bg-brand-teal/20 dark:bg-brand-cyan/20" />
              )}

              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-brand-navy dark:text-white capitalize">
                  {h.tipo_evento.replace('_', ' ')}
                </span>
                <span className="text-[13px] text-brand-gray dark:text-brand-light mt-[2px]">
                  {h.descricao}
                </span>
                <span className="text-[11px] text-brand-gray/80 dark:text-brand-light/80 mt-[4px] font-medium">
                  {new Date(h.created).toLocaleString()} por {h.user_name}
                </span>

                {h.data_anteriores && h.data_novos && (
                  <div className="text-[11px] text-brand-teal dark:text-brand-cyan italic mt-[6px] bg-brand-light/30 dark:bg-black/10 p-2 rounded border border-brand-teal/10 dark:border-brand-cyan/10">
                    De: {h.data_anteriores} ➔ Para: {h.data_novos}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
