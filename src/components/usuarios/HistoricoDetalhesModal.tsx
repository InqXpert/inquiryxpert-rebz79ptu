import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import pb from '@/lib/pocketbase/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Activity, Clock } from 'lucide-react'

export function HistoricoDetalhesModal({ log, onClose }: { log: any; onClose: () => void }) {
  const [timeline, setTimeline] = useState<any[]>([])

  useEffect(() => {
    if (log) {
      const targetId = log.usuario_afetado_id || log.user_id
      const filter = `user_id='${targetId}' || usuario_afetado_id='${targetId}'`
      pb.collection('usuarios_historico')
        .getList(1, 5, {
          filter,
          sort: '-created',
          expand: 'user_id,usuario_afetado_id',
        })
        .then((res) => setTimeline(res.items))
        .catch(console.error)
    }
  }, [log])

  if (!log) return null

  return (
    <Dialog open={!!log} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-brand-teal dark:border-brand-cyan/50 dark:bg-brand-navy">
        <DialogHeader className="border-b border-brand-teal/50 dark:border-brand-cyan/30 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-cyan" />
            Detalhes da Ação:{' '}
            <span className="uppercase text-[16px] ml-1">{log.acao.replace(/_/g, ' ')}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="bg-brand-light/30 dark:bg-black/20 p-5 rounded-lg border border-brand-teal/50 dark:border-brand-cyan/30 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1">
                Data do Evento
              </p>
              <p className="text-[14px] text-brand-navy dark:text-white font-bold">
                {format(new Date(log.created), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1">
                IP de Origem
              </p>
              <p className="text-[14px] font-mono text-brand-navy dark:text-white font-medium">
                {log.ip_address || '0.0.0.0'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1">
                Usuário Ator
              </p>
              <p className="text-[14px] text-brand-navy dark:text-white font-bold">
                {log.expand?.user_id?.name || 'Sistema'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1">
                Usuário Afetado
              </p>
              <p className="text-[14px] text-brand-navy dark:text-white font-bold">
                {log.expand?.usuario_afetado_id?.name || '-'}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1">
                User Agent
              </p>
              <p className="text-[12px] font-mono text-brand-navy/70 dark:text-brand-light/80 bg-white dark:bg-black/40 p-2 rounded border border-brand-teal/30 dark:border-brand-cyan/20">
                {log.user_agent || 'N/A'}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[11px] text-brand-gray dark:text-brand-light/70 font-bold uppercase tracking-wider mb-1">
                Descrição Completa
              </p>
              <p className="text-[14px] bg-white dark:bg-brand-navy/80 p-4 rounded-md border border-brand-teal/50 dark:border-brand-cyan/20 text-brand-navy dark:text-white leading-relaxed font-medium shadow-sm">
                {log.descricao}
              </p>
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-[16px] font-bold text-brand-navy dark:text-white mb-4 border-b border-brand-teal/30 pb-2">
              <Clock className="w-4 h-4 text-brand-teal" /> Eventos Relacionados (Contexto)
            </h4>
            {timeline.length === 0 ? (
              <p className="text-sm text-brand-gray">Nenhum evento recente para este contexto.</p>
            ) : (
              <div className="relative border-l-2 border-brand-teal dark:border-brand-cyan/30 ml-2 space-y-5 py-2">
                {timeline.map((t) => (
                  <div key={t.id} className="pl-6 relative">
                    <div
                      className={`absolute w-3 h-3 ${t.id === log.id ? 'bg-brand-orange ring-4 ring-brand-orange/20' : 'bg-brand-cyan'} rounded-full -left-[7px] top-1`}
                    />
                    <p className="text-[12px] text-brand-gray dark:text-brand-light/80 font-medium">
                      {format(new Date(t.created), 'dd/MM/yyyy HH:mm')} -{' '}
                      <span className="font-bold uppercase text-brand-navy dark:text-brand-cyan">
                        {t.acao.replace(/_/g, ' ')}
                      </span>
                    </p>
                    <p className="text-[13px] text-brand-navy dark:text-white mt-1 line-clamp-2">
                      {t.descricao}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
