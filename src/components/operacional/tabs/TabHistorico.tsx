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
              <div className="w-[6px] h-[6px] rounded-full bg-[hsl(210_60%_25%)] mt-[8px] z-10 shrink-0" />
              {i < historico.length - 1 && (
                <div className="absolute left-[2px] top-[14px] w-[2px] h-full bg-border" />
              )}

              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-foreground capitalize">
                  {h.tipo_evento.replace('_', ' ')}
                </span>
                <span className="text-[13px] text-foreground mt-[2px]">{h.descricao}</span>
                <span className="text-[11px] text-muted-foreground mt-[2px]">
                  {new Date(h.created).toLocaleString()} por {h.user_name}
                </span>

                {h.data_anteriores && h.data_novos && (
                  <div className="text-[11px] text-muted-foreground italic mt-[4px]">
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
