import React, { useState } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Processo } from '@/types/processo'
import { calculateDayColor, calculateTags, getTagColor } from '@/services/processosService'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { History, MessageSquare, Flag, Edit2, ChevronDown, Send, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn, formatDateBr } from '@/lib/utils'
import { ProcessoTimeline } from './ProcessoTimeline'
import { Checkbox } from '@/components/ui/checkbox'

import { DoubleConfirmDialog } from '@/components/DoubleConfirmDialog'
import { softDeleteProcesso } from '@/services/processosService'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

interface Props {
  processo: Processo
  index: number
  expanded: boolean
  onToggle: () => void
  onOpenModal: (type: 'history' | 'obs' | 'pos', proc: Processo) => void
  selected?: boolean
  onSelect?: (e: React.MouseEvent) => void
  canDelete?: boolean
}

export function ProcessosTableRowDesktop({
  processo: p,
  index: i,
  expanded,
  onToggle,
  onOpenModal,
  selected,
  onSelect,
  canDelete,
}: Props) {
  const navigate = useNavigate()
  const bgColor = calculateDayColor(p.data_entrada)
  const tags = calculateTags(p.data_entrada)

  const supervisorName = p.expand?.supervisor_id?.name || ''
  const supervisorFirstName = supervisorName ? supervisorName.split(' ')[0] : '-'

  const agenteName = p.expand?.agente_id?.nomeCompleto || p.agente_prestador || ''
  const agenteFirstName = agenteName ? agenteName.split(' ')[0] : 'Não informado'

  const { user } = useAuth()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletedLocally, setIsDeletedLocally] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await softDeleteProcesso(p.id, user?.id)
      setIsDeletedLocally(true)
      toast.success('Processo deletado com sucesso')
    } catch (e) {
      toast.error('Erro ao deletar processo')
      setIsDeleting(false)
    }
  }

  if (isDeletedLocally) return null

  return (
    <React.Fragment>
      <TableRow
        className={cn(
          'cursor-pointer group animate-in fade-in fill-mode-both duration-300 border-b-brand-teal/10 dark:border-b-brand-cyan/10 h-[64px]',
          bgColor === 'transparent' && 'hover:bg-brand-teal/5 dark:hover:bg-brand-cyan/10',
          bgColor !== 'transparent' && 'hover:brightness-95',
          isDeleting &&
            'animate-out fade-out slide-out-to-top-4 duration-300 opacity-0 pointer-events-none',
        )}
        style={{
          backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
          animationDelay: `${i * 30}ms`,
        }}
        onClick={onToggle}
      >
        {canDelete && (
          <TableCell onClick={(e) => e.stopPropagation()} className="px-4">
            <Checkbox checked={selected} onClick={onSelect} />
          </TableCell>
        )}
        <TableCell
          className="font-bold text-xs text-brand-navy dark:text-white"
          title={p.numero_controle || p.id || '-'}
        >
          {p.numero_controle || p.id || '-'}
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-1.5 items-start">
            <span
              className="font-bold text-xs uppercase truncate w-full text-brand-navy dark:text-white flex items-center gap-1"
              title={p.status?.replace(/_/g, ' ')}
            >
              {p.status ? p.status.replace(/_/g, ' ') : '-'}
              {p.prioridade && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded text-[9px] font-bold',
                    p.prioridade === 'alta'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : p.prioridade === 'media'
                        ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                  )}
                >
                  {p.prioridade}
                </span>
              )}
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
          title={supervisorName || '-'}
        >
          {supervisorFirstName}
        </TableCell>
        <TableCell
          className="text-xs text-brand-gray dark:text-brand-light truncate"
          title={p.cia || '-'}
        >
          {p.cia || '-'}
        </TableCell>
        <TableCell
          className="text-xs text-brand-gray dark:text-brand-light break-words"
          title={p.tipo_servico || '-'}
        >
          {p.tipo_servico || '-'}
        </TableCell>
        <TableCell
          className="text-xs text-brand-gray dark:text-brand-light truncate hidden lg:table-cell"
          title={agenteName || 'Não informado'}
        >
          {agenteFirstName}
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(p.tags) &&
            p.tags.filter((t) => typeof t === 'string' && t.trim() !== '').length > 0 ? (
              p.tags
                .filter((t): t is string => typeof t === 'string' && t.trim() !== '')
                .slice(0, 2)
                .map((tag: string, idx: number) => (
                  <Badge
                    key={`${tag}-${idx}`}
                    className={cn(
                      'text-[9px] px-1.5 py-0 rounded-[4px] leading-tight whitespace-nowrap',
                      getTagColor(tag),
                    )}
                    title={tag}
                  >
                    {tag.length > 15 ? tag.substring(0, 15) + '...' : tag}
                  </Badge>
                ))
            ) : (
              <span className="text-xs text-brand-gray/50">-</span>
            )}
            {Array.isArray(p.tags) &&
              p.tags.filter((t) => typeof t === 'string' && t.trim() !== '').length > 2 && (
                <Badge
                  className="text-[9px] px-1.5 py-0 rounded-[4px] bg-brand-light text-brand-gray dark:bg-black/50 dark:text-brand-light border-transparent leading-tight"
                  title={p.tags
                    .filter((t) => typeof t === 'string' && t.trim() !== '')
                    .slice(2)
                    .join(', ')}
                >
                  +{p.tags.filter((t) => typeof t === 'string' && t.trim() !== '').length - 2}
                </Badge>
              )}
          </div>
        </TableCell>
        <TableCell
          className="font-medium text-xs text-brand-gray dark:text-brand-light whitespace-nowrap"
          title={p.data_entrada ? formatDateBr(p.data_entrada) : '-'}
        >
          {p.data_entrada ? formatDateBr(p.data_entrada) : '-'}
        </TableCell>
        <TableCell className="text-right pr-4">
          <div className="flex items-center justify-end gap-2">
            {canDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-md"
                onClick={(e) => {
                  e.stopPropagation()
                  setDeleteOpen(true)
                }}
                title="Deletar"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <ChevronDown
              className={cn(
                'h-4 w-4 text-brand-gray transition-transform duration-200',
                expanded && 'rotate-180',
              )}
            />
          </div>
        </TableCell>
      </TableRow>

      {expanded && (
        <TableRow className="bg-brand-light/30 dark:bg-black/20 hover:bg-brand-light/30 dark:hover:bg-black/20 border-b-brand-teal/20 dark:border-b-brand-cyan/20">
          <TableCell
            colSpan={canDelete ? 10 : 9}
            className="p-0 border-t border-brand-teal/10 dark:border-brand-cyan/10"
          >
            <div className="p-4 md:p-6 animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  size="sm"
                  className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold shadow-sm min-h-[44px]"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/processos/${p.id}/editar`)
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Editar Processo
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-11 w-11 px-0 sm:w-auto sm:px-3 sm:h-10 flex items-center justify-center font-bold text-brand-navy dark:text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none bg-brand-light hover:bg-brand-light/80 dark:bg-brand-navy dark:hover:bg-brand-navy/80"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(
                      `/sindicancia/encaminhar?processo_id=${p.id}&agente_id=${p.agente_id || ''}`,
                    )
                  }}
                  aria-label="Encaminhar sindicancia"
                >
                  <Send className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Encaminhar Sindicância</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy min-h-[44px]"
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
                  className="border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy min-h-[44px]"
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
                  className="border-brand-teal/20 dark:border-brand-cyan/20 font-bold text-brand-navy dark:text-white bg-white dark:bg-brand-navy min-h-[44px]"
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

      <DoubleConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Deletar Processo"
        description={`Tem certeza que deseja deletar o processo ${p.numero_controle || p.id}?`}
        onConfirm={handleDelete}
      />
    </React.Fragment>
  )
}
