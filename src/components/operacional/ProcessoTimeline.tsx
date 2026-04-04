import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDateBr } from '@/lib/utils'

export function ProcessoTimeline({ processoId }: { processoId: string }) {
  const [historico, setHistorico] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    pb.collection('processos_historico')
      .getFullList({
        filter: `processo_id = '${processoId}'`,
        sort: '-created',
      })
      .then((res) => {
        if (isMounted) {
          setHistorico(res)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [processoId])

  if (loading) {
    return (
      <div className="space-y-4 px-2 py-4">
        <Skeleton className="h-16 w-full rounded-xl bg-brand-teal/5 dark:bg-brand-cyan/5" />
        <Skeleton className="h-16 w-full rounded-xl bg-brand-teal/5 dark:bg-brand-cyan/5" />
      </div>
    )
  }

  if (historico.length === 0) {
    return (
      <div className="text-[13px] text-brand-gray dark:text-brand-light px-2 py-6 text-center font-medium">
        Nenhum histórico registrado para este processo.
      </div>
    )
  }

  return (
    <div className="px-2 py-4 space-y-0">
      {historico.map((h, i) => (
        <div
          key={h.id}
          className="flex gap-4 relative pb-6 last:pb-0 animate-in fade-in slide-in-from-bottom-2"
        >
          {i !== historico.length - 1 && (
            <div className="absolute left-[11px] top-7 bottom-0 w-[2px] bg-brand-teal/20 dark:bg-brand-cyan/20" />
          )}
          <div className="w-6 h-6 rounded-full bg-brand-light dark:bg-brand-navy border-[4px] border-brand-cyan flex-shrink-0 mt-1 z-10 shadow-sm" />
          <div className="flex-1 bg-white dark:bg-brand-navy/60 p-3.5 rounded-xl border border-brand-teal/10 dark:border-brand-cyan/20 shadow-sm">
            <p className="text-[14px] font-bold text-brand-navy dark:text-white mb-1.5 uppercase tracking-wide">
              {h.tipo_evento?.replace(/_/g, ' ') || 'Atualização'}
            </p>
            {h.descricao && (
              <p className="text-[13px] text-brand-gray dark:text-brand-light mb-3 leading-relaxed">
                {h.descricao}
              </p>
            )}
            <div className="flex justify-between items-center text-[12px]">
              <span className="font-bold text-brand-teal dark:text-brand-cyan bg-brand-teal/10 dark:bg-brand-cyan/10 px-2 py-0.5 rounded-md">
                {h.user_name || 'Sistema'}
              </span>
              <span className="text-brand-gray dark:text-brand-light font-medium">
                {formatDateBr(h.created)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
