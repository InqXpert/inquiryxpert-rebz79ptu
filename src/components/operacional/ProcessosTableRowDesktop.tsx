import React from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Processo } from '@/types/processo'
import { calculateDayColor, calculateTags } from '@/services/processosService'
import { Button } from '@/components/ui/button'
import { History, MessageSquare, Flag, Edit2, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ProcessoTimeline } from './ProcessoTimeline'

interface Props {
  processo: Processo
  index: number
  expanded: boolean
  onToggle: () => void
  onOpenModal: (type: 'history' | 'obs' | 'pos', proc: Processo) => void
}

export function ProcessosTableRowDesktop({
  processo: p,
  index: i,
  expanded,
  onToggle,
  onOpenModal,
}: Props) {
  const navigate = useNavigate()
  const bgColor = calculateDayColor(p.data_entrada)
  const tags = calculateTags(p.data_entrada)

  const supervisorName = p.expand?.supervisor_id?.name || ''
  const supervisorFirstName = supervisorName.split(' ')[0] || 'N/A'

  const agenteName = p.expand?.agente_id?.nomeCompleto || p.agente_prestador || ''
  const agenteFirstName = agenteName.split(' ')[0] || 'N/A'

  return (
    <React.Fragment>
      <TableRow
        className={cn(
          'cursor-pointer group animate-in fade-in fill-mode-both duration-300 border-b-brand-teal/10 dark:border-b-brand-cyan/10 h-[64px]',
          bgColor === 'transparent' && 'hover:bg-brand-teal/5 dark:hover:bg-brand-cyan/10',
          bgColor !== 'transparent' && 'hover:brightness-95',
        )}
        style={{
          backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
          animationDelay: `${i * 30}ms`,
        }}
        onClick={onToggle}
      >
        <TableCell
          className="font-bold text-xs text-brand-navy dark:text-white"
          title={p.numero_controle || p.id}
        >
          {p.numero_controle || p.id}
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-1.5 items-start">
            <span
              className="font-bold text-xs uppercase truncate w-full text-brand-navy dark:text-white"
              title={p.status?.replace(/_/g, ' ')}
            >
              {p.status?.replace(/_/g, ' ')}
            </span>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 w-full">
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded-[4px] shadow-sm font-bold truncate max-w-full inline-block',
                      t.color,
                    )}
                    title={t.label}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </TableCell>
        <TableCell
          className="font-medium text-xs text-brand-gray dark:text-brand-light truncate"
          title={supervisorName || 'N/A'}
        >
          {supervisorFirstName}
        </TableCell>
        <TableCell
          className="text-xs text-brand-gray dark:text-brand-light truncate"
          title={p.cia || 'N/A'}
        >
          {p.cia || 'N/A'}
        </TableCell>
        <TableCell
          className="text-xs text-brand-gray dark:text-brand-light break-words"
          title={p.tipo_servico || 'N/A'}
        >
          {p.tipo_servico || 'N/A'}
        </TableCell>
        <TableCell
          className="text-xs text-brand-gray dark:text-brand-light truncate hidden lg:table-cell"
          title={agenteName || 'N/A'}
        >
          {agenteFirstName}
        </TableCell>
        <TableCell
          className="font-medium text-xs text-brand-gray dark:text-brand-light whitespace-nowrap"
          title={p.data_entrada || 'N/A'}
        >
          {p.data_entrada || 'N/A'}
        </TableCell>
        <TableCell className="text-right pr-4">
          <ChevronDown
            className={cn(
              'h-4 w-4 text-brand-gray transition-transform duration-200 ml-auto',
              expanded && 'rotate-180',
            )}
          />
        </TableCell>
      </TableRow>

      {expanded && (
        <TableRow className="bg-brand-light/30 dark:bg-black/20 hover:bg-brand-light/30 dark:hover:bg-black/20 border-b-brand-teal/20 dark:border-b-brand-cyan/20">
          <TableCell
            colSpan={8}
            className="p-0 border-t border-brand-teal/10 dark:border-brand-cyan/10"
          >
            <div className="p-4 md:p-6 animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  size="sm"
                  className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/processos/${p.id}/editar`)
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Editar Processo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy"
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
                  className="border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenModal('obs', p)
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Observações
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenModal('pos', p)
                  }}
                >
                  <Flag className="w-4 h-4 mr-2" /> Posições
                </Button>
              </div>
              <h4 className="text-[14px] font-bold text-brand-navy dark:text-white mb-3 ml-2">
                Linha do Tempo de Atividades
              </h4>
              <div className="bg-white/50 dark:bg-brand-navy/30 rounded-xl p-2 border border-brand-teal/10 dark:border-brand-cyan/10 max-w-4xl">
                <ProcessoTimeline processoId={p.id} />
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  )
}
