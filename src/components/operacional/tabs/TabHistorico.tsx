import { ProcessoHistorico } from '@/types'
import { Clock } from 'lucide-react'

interface Props {
  historico: ProcessoHistorico[]
}

export function TabHistorico({ historico }: Props) {
  return (
    <div className="space-y-6 pt-4 animate-in fade-in pl-2">
      {historico.length === 0 ? (
        <p className="text-sm text-muted-foreground italic py-4">Nenhum evento registrado.</p>
      ) : (
        <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-4">
          {historico.map((h, i) => (
            <div key={h.id} className="relative pl-6">
              <div className="absolute w-2.5 h-2.5 bg-muted-foreground rounded-full -left-[6px] top-1.5 ring-4 ring-background" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {h.tipo_evento.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(h.created).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{h.descricao}</p>
                {h.data_anteriores && h.data_novos && (
                  <div className="mt-2 text-xs bg-muted/50 p-2 rounded border inline-block">
                    <span className="text-muted-foreground line-through mr-2">
                      {h.data_anteriores}
                    </span>
                    <span className="text-foreground font-medium text-primary">
                      ➔ {h.data_novos}
                    </span>
                  </div>
                )}
                <span className="text-xs text-muted-foreground mt-2 font-medium">
                  Por: {h.user_name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
