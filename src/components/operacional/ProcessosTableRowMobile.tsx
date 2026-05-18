import React, { useState, useEffect } from 'react'
import { Processo } from '@/types/processo'
import { calculateDayColor, calculateTags, getTagColor } from '@/services/processosService'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { History, MessageSquare, Flag, Edit2, ChevronDown, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn, formatDateBr } from '@/lib/utils'
import { ProcessoTimeline } from './ProcessoTimeline'
import { Checkbox } from '@/components/ui/checkbox'

import { DoubleConfirmDialog } from '@/components/DoubleConfirmDialog'
import { softDeleteProcesso, updateProcesso, createAuditLog } from '@/services/processosService'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { FinalizarProcessoModal } from './FinalizarProcessoModal'

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

export function ProcessosTableRowMobile({
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

  const { user } = useAuth()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletedLocally, setIsDeletedLocally] = useState(false)

  const [localStatus, setLocalStatus] = useState(p.status)
  const [isChangingStatus, setIsChangingStatus] = useState(false)
  const [finalizarModalOpen, setFinalizarModalOpen] = useState(false)

  useEffect(() => {
    setLocalStatus(p.status)
  }, [p.status])

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === 'FINALIZADO') {
      setFinalizarModalOpen(true)
      return
    }

    setIsChangingStatus(true)
    try {
      await updateProcesso(p.id, { status: newStatus })
      await createAuditLog(
        p.id,
        'STATUS_ALTERADO',
        user?.id,
        { status: localStatus },
        { status: newStatus },
      )
      toast.success(`Status alterado para ${newStatus}`)
      setLocalStatus(newStatus)
    } catch (e) {
      toast.error('Erro ao alterar status')
    } finally {
      setIsChangingStatus(false)
    }
  }

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
    <div
      className={cn(
        'bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-4 shadow-sm animate-in fade-in fill-mode-both duration-300 cursor-pointer transition-colors relative',
        bgColor === 'transparent' && 'hover:border-brand-cyan/50',
        expanded && 'ring-2 ring-brand-cyan/50',
        isDeleting &&
          'animate-out fade-out slide-out-to-top-4 duration-300 opacity-0 pointer-events-none',
      )}
      style={{
        backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
        animationDelay: `${i * 30}ms`,
      }}
      onClick={onToggle}
    >
      <div className="flex justify-between items-start mb-3 pr-8">
        <div className="flex items-center gap-3">
          {canDelete && (
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox checked={selected} onClick={onSelect} />
            </div>
          )}
          <div>
            <p className="font-bold text-brand-navy dark:text-white text-sm mb-1">
              {p.numero_controle || p.id || '-'}
            </p>
            <p className="font-bold text-xs uppercase text-brand-gray dark:text-brand-light">
              {localStatus ? localStatus.replace(/_/g, ' ') : '-'}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-xs text-brand-gray dark:text-brand-light font-medium">
            {p.data_entrada ? formatDateBr(p.data_entrada) : '-'}
          </p>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-brand-gray transition-transform duration-200',
              expanded && 'rotate-180',
            )}
          />
        </div>
      </div>

      {canDelete && (
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-md"
            onClick={(e) => {
              e.stopPropagation()
              setDeleteOpen(true)
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="space-y-1 mb-3 text-sm">
        <div className="flex justify-between">
          <span className="text-brand-gray dark:text-brand-light">Seguradora:</span>
          <span className="font-medium text-brand-navy dark:text-white truncate max-w-[180px]">
            {p.cia || '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray dark:text-brand-light">Tipo:</span>
          <span className="font-medium text-brand-navy dark:text-white truncate max-w-[180px]">
            {p.tipo_servico || '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray dark:text-brand-light">Supervisor:</span>
          <span className="font-medium text-brand-navy dark:text-white truncate max-w-[180px]">
            {p.expand?.supervisor_id?.name || '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray dark:text-brand-light">Prestador:</span>
          <span className="font-medium text-brand-navy dark:text-white truncate max-w-[180px]">
            {p.expand?.agente_id?.nomeCompleto || p.agente_prestador || 'Não informado'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-gray dark:text-brand-light">Prioridade:</span>
          <span className="font-medium text-brand-navy dark:text-white uppercase text-[11px]">
            {p.prioridade || '-'}
          </span>
        </div>
      </div>

      {(tags.length > 0 ||
        (Array.isArray(p.tags) &&
          p.tags.filter((t) => typeof t === 'string' && t.trim() !== '').length > 0)) && (
        <div className="flex flex-wrap gap-1 mb-1 mt-2">
          {tags.map((t, idx) => (
            <span
              key={`calc-${idx}`}
              className={cn('text-[11px] font-bold px-2 py-1 rounded-[4px] shadow-sm', t.color)}
            >
              {t.label}
            </span>
          ))}
          {Array.isArray(p.tags) &&
            p.tags
              .filter((t): t is string => typeof t === 'string' && t.trim() !== '')
              .sort((a, b) => (a.includes('PAGAMENTO') ? -1 : b.includes('PAGAMENTO') ? 1 : 0))
              .map((tag: string, idx: number) => {
                let badgeClass = getTagColor(tag)
                if (tag === 'PAGAMENTO AUTORIZADO')
                  badgeClass = 'bg-green-100 text-green-800 border-green-300'
                if (tag === 'PAGAMENTO NÃO AUTORIZADO')
                  badgeClass = 'bg-red-100 text-red-800 border-red-300'
                return (
                  <Badge
                    key={`tag-${idx}`}
                    className={cn('text-[10px] px-2 py-0.5 rounded-[4px]', badgeClass)}
                  >
                    {tag}
                  </Badge>
                )
              })}
        </div>
      )}

      {expanded && (
        <div className="mt-4 pt-4 border-t border-brand-teal/10 dark:border-brand-cyan/10 animate-in fade-in slide-in-from-top-2">
          {/* Summary Header */}
          <div className="bg-brand-light/40 dark:bg-brand-navy/40 p-4 rounded-xl mb-4 border border-brand-teal/10 dark:border-brand-cyan/10 flex flex-col gap-3">
            <div>
              <span className="text-[10px] font-bold text-brand-gray dark:text-brand-light uppercase tracking-wider block mb-1">
                Nome do Segurado
              </span>
              <p className="text-[13px] font-bold text-brand-navy dark:text-white">
                {p.nome_segurado || '-'}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-gray dark:text-brand-light uppercase tracking-wider block mb-1">
                Analista da Seguradora
              </span>
              <p className="text-[13px] font-bold text-brand-navy dark:text-white">
                {p.expand?.analista_cliente_id?.nome || p.analista_solicitante || '-'}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-gray dark:text-brand-light uppercase tracking-wider block mb-1">
                Placa / Bem Reclamado
              </span>
              <p className="text-[13px] font-bold text-brand-navy dark:text-white">
                {p.placas_veiculos || p.bem_reclamado || '-'}
              </p>
            </div>
          </div>

          {/* Status Actions */}
          <div className="mb-5">
            <h4 className="text-[12px] font-bold text-brand-gray dark:text-brand-light mb-2 uppercase tracking-wider">
              Alterar Status
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'EM EXECUÇÃO',
                'EM ELABORAÇÃO',
                'EM COMPLEMENTO',
                localStatus?.toUpperCase() === 'FINALIZADO'
                  ? 'Editar Informações de Faturamento'
                  : 'FINALIZADO',
                'CANCELADO',
              ].map((statusOption) => {
                const isEditMode = statusOption === 'Editar Informações de Faturamento'
                const isFinalizadoBase = statusOption === 'FINALIZADO'
                const isActive =
                  !isEditMode && localStatus?.toUpperCase() === statusOption.toUpperCase()

                return (
                  <Button
                    key={statusOption}
                    size="sm"
                    variant={isActive ? 'default' : 'outline'}
                    className={cn(
                      'text-[11px] font-bold h-8 transition-colors flex-1 min-w-[120px]',
                      isActive
                        ? 'bg-brand-teal text-white dark:bg-brand-cyan dark:text-brand-navy border-transparent shadow-sm pointer-events-none'
                        : 'border-brand-teal/20 dark:border-brand-cyan/20 text-brand-navy dark:text-white bg-white dark:bg-brand-navy hover:bg-brand-teal/10 dark:hover:bg-brand-cyan/10',
                    )}
                    disabled={isActive || isChangingStatus}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (isEditMode || isFinalizadoBase) {
                        setFinalizarModalOpen(true)
                      } else {
                        handleStatusChange(statusOption)
                      }
                    }}
                  >
                    {statusOption}
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <Button
              size="sm"
              className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold w-full justify-start min-h-[44px]"
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
              className="w-full bg-white dark:bg-brand-navy border-brand-teal/20 dark:border-brand-cyan/20 min-h-[44px]"
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal('obs', p)
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Obs
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-white dark:bg-brand-navy border-brand-teal/20 dark:border-brand-cyan/20 min-h-[44px]"
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

      <DoubleConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Deletar Processo"
        description={`Tem certeza que deseja deletar o processo ${p.numero_controle || p.id}?`}
        onConfirm={handleDelete}
      />

      <FinalizarProcessoModal
        processo={p}
        open={finalizarModalOpen}
        onOpenChange={setFinalizarModalOpen}
        onSuccess={() => setLocalStatus('FINALIZADO')}
      />
    </div>
  )
}
