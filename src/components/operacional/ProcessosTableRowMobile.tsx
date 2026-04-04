import React from 'react'
import { Processo } from '@/types/processo'
import { calculateDayColor, calculateTags } from '@/services/processosService'
import { Button } from '@/components/ui/button'
import { History, MessageSquare, Flag, Edit2, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn, formatDateBr } from '@/lib/utils'
import { ProcessoTimeline } from './ProcessoTimeline'

interface Props {
  processo: Processo
  index: number
  expanded: boolean
  onToggle: () => void
  onOpenModal: (type: 'history' | 'obs' | 'pos', proc: Processo) => void
}

export function ProcessosTableRowMobile({
  processo: p,
  index: i,
  expanded,
  onToggle,
  onOpenModal,
}: Props) {
  const navigate = useNavigate()
  const bgColor = calculateDayColor(p.data_entrada)
  const tags = calculateTags(p.data_entrada)

  return (
    <div
      className={cn(
        'bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-4 shadow-sm animate-in fade-in fill-mode-both duration-300 cursor-pointer transition-colors',
        bgColor === 'transparent' && 'hover:border-brand-cyan/50',
        expanded && 'ring-2 ring-brand-cyan/50',
      )}
      style={{
        backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
        animationDelay: `${i * 30}ms`,
      }}
      onClick={onToggle}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-bold text-brand-navy dark:text-white text-sm mb-1">
            {p.numero_controle || p.id}
          </p>
          <p className="font-bold text-xs uppercase text-brand-gray dark:text-brand-light">
            {p.status?.replace(/_/g, ' ')}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-xs text-brand-gray dark:text-brand-light font-medium">
            {formatDateBr(p.data_entrada)}
          </p>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-brand-gray transition-transform duration-200',
              expanded && 'rotate-180',
            )}
          />
        </div>
      </div>

      <div className="space-y-1 mb-3 text-sm">
        <div className="flex justify-between">
          <span className="text-brand-gray dark:text-brand-light">Seguradora:</span>
          <span className="font-medium text-brand-navy dark:text-white truncate max-w-[180px]">
            {p.cia || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray dark:text-brand-light">Tipo:</span>
          <span className="font-medium text-brand-navy dark:text-white truncate max-w-[180px]">
            {p.tipo_servico || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray dark:text-brand-light">Supervisor:</span>
          <span className="font-medium text-brand-navy dark:text-white truncate max-w-[180px]">
            {p.expand?.supervisor_id?.name || 'N/A'}
          </span>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {tags.map((t, idx) => (
            <span
              key={idx}
              className={cn('text-[11px] font-bold px-2 py-1 rounded-[4px] shadow-sm', t.color)}
            >
              {t.label}
            </span>
          ))}
        </div>
      )}

      {expanded && (
        <div className="mt-4 pt-4 border-t border-brand-teal/10 dark:border-brand-cyan/10 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-2 mb-4">
            <Button
              size="sm"
              className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold w-full justify-start"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/processos/${p.id}/editar`)
              }}
            >
              <Edit2 className="w-4 h-4 mr-2" /> Editar Processo
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white dark:bg-brand-navy border-brand-teal/20 dark:border-brand-cyan/20"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenModal('history', p)
                }}
              >
                <History className="w-4 h-4 mr-2" /> Histórico
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white dark:bg-brand-navy border-brand-teal/20 dark:border-brand-cyan/20"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenModal('obs', p)
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Obs
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-white dark:bg-brand-navy border-brand-teal/20 dark:border-brand-cyan/20"
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal('pos', p)
              }}
            >
              <Flag className="w-4 h-4 mr-2" /> Posições
            </Button>
          </div>
          <h4 className="text-[13px] font-bold text-brand-navy dark:text-white mb-3">
            Linha do Tempo
          </h4>
          <div className="bg-brand-light/30 dark:bg-black/20 rounded-xl p-1 border border-brand-teal/10 dark:border-brand-cyan/10">
            <ProcessoTimeline processoId={p.id} />
          </div>
        </div>
      )}
    </div>
  )
}
