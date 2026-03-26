import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Processo } from '@/types/processo'
import { calculateDayColor, calculateTags } from '@/services/processosService'
import { Button } from '@/components/ui/button'
import { History, MessageSquare, Flag, Edit2, Inbox } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HistoricoModal, ObservacoesModal, PosicoesModal } from './ProcessoInlineModals'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function ProcessosListTable({ processos, loading, hasMore, onLoadMore, rawCount }: any) {
  const navigate = useNavigate()
  const [modalState, setModalState] = useState<{
    type: 'history' | 'obs' | 'pos' | null
    proc: Processo | null
  }>({ type: null, proc: null })

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">ID</TableHead>
              <TableHead className="w-[15%]">STATUS</TableHead>
              <TableHead className="w-[15%]">SUPERVISOR</TableHead>
              <TableHead className="w-[15%]">SEGURADORA</TableHead>
              <TableHead className="w-[10%]">TIPO</TableHead>
              <TableHead className="w-[15%]">AGENTE</TableHead>
              <TableHead className="w-[10%]">DATA ENTRADA</TableHead>
              <TableHead className="w-[10%] text-right">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={8}>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (processos.length === 0) {
    const isFiltering = rawCount > 0
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center p-6 bg-card border border-border rounded-xl shadow-sm">
        <Inbox className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-xl font-bold text-foreground">
          {!isFiltering
            ? 'Nenhum processo atribuído'
            : 'Nenhum processo encontrado com esses filtros'}
        </h3>
        {!isFiltering && (
          <Button className="mt-6" onClick={() => navigate('/processos/novo')}>
            Novo Processo
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[10%]">ID</TableHead>
              <TableHead className="w-[15%]">STATUS</TableHead>
              <TableHead className="w-[15%]">SUPERVISOR</TableHead>
              <TableHead className="w-[15%]">SEGURADORA</TableHead>
              <TableHead className="w-[10%]">TIPO</TableHead>
              <TableHead className="w-[15%]">AGENTE</TableHead>
              <TableHead className="w-[10%]">DATA ENTRADA</TableHead>
              <TableHead className="text-right w-[10%]">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processos.map((p: Processo) => {
              const bgColor = calculateDayColor(p.data_entrada)
              const tags = calculateTags(p.data_entrada)

              return (
                <TableRow
                  key={p.id}
                  className={cn(
                    'cursor-pointer transition-colors hover:opacity-90',
                    bgColor !== 'transparent' &&
                      bgColor !== '#ffffff' &&
                      '[&>td]:text-slate-900 [&>td]:dark:text-slate-900',
                  )}
                  style={{ backgroundColor: bgColor !== 'transparent' ? bgColor : undefined }}
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest('.action-btn')) {
                      navigate(`/processos/${p.id}/editar`)
                    }
                  }}
                >
                  <TableCell className="font-semibold truncate" title={p.numero_controle || p.id}>
                    {p.numero_controle || p.id.slice(0, 8)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5 items-start">
                      <span
                        className="font-bold text-xs uppercase truncate w-full"
                        title={p.status?.replace(/_/g, ' ')}
                      >
                        {p.status?.replace(/_/g, ' ')}
                      </span>
                      {tags.length > 0 && (
                        <div className="flex flex-col gap-1 w-full">
                          {tags.map((t, i) => (
                            <span
                              key={i}
                              className={cn(
                                'text-[10px] px-1.5 py-0.5 rounded shadow-sm font-bold truncate max-w-full inline-block',
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
                    className="font-medium truncate"
                    title={p.expand?.supervisor_id?.name || 'N/A'}
                  >
                    {p.expand?.supervisor_id?.name || 'N/A'}
                  </TableCell>
                  <TableCell className="truncate" title={p.cia || 'N/A'}>
                    {p.cia || 'N/A'}
                  </TableCell>
                  <TableCell className="truncate" title={p.tipo_servico || 'N/A'}>
                    {p.tipo_servico || 'N/A'}
                  </TableCell>
                  <TableCell
                    className="truncate"
                    title={p.expand?.agente_id?.nomeCompleto || p.agente_prestador || 'N/A'}
                  >
                    {p.expand?.agente_id?.nomeCompleto || p.agente_prestador || 'N/A'}
                  </TableCell>
                  <TableCell className="font-medium truncate" title={p.data_entrada || 'N/A'}>
                    {p.data_entrada || 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider delayDuration={200}>
                      <div className="flex justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="action-btn h-8 w-8 hover:bg-black/10 dark:hover:bg-white/20"
                              onClick={() => navigate(`/processos/${p.id}/editar`)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Editar</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="action-btn h-8 w-8 hover:bg-black/10 dark:hover:bg-white/20"
                              onClick={() => setModalState({ type: 'history', proc: p })}
                            >
                              <History className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Histórico</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="action-btn h-8 w-8 hover:bg-black/10 dark:hover:bg-white/20"
                              onClick={() => setModalState({ type: 'obs', proc: p })}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Observações</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="action-btn h-8 w-8 hover:bg-black/10 dark:hover:bg-white/20"
                              onClick={() => setModalState({ type: 'pos', proc: p })}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Posições</TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {hasMore && (
          <div className="p-4 flex justify-center border-t border-border bg-muted/20">
            <Button variant="outline" className="font-bold shadow-sm px-8" onClick={onLoadMore}>
              Carregar mais
            </Button>
          </div>
        )}
      </div>

      <HistoricoModal
        processo={modalState.type === 'history' ? modalState.proc : null}
        isOpen={modalState.type === 'history'}
        onClose={() => setModalState({ type: null, proc: null })}
      />
      <ObservacoesModal
        processo={modalState.type === 'obs' ? modalState.proc : null}
        isOpen={modalState.type === 'obs'}
        onClose={() => setModalState({ type: null, proc: null })}
      />
      <PosicoesModal
        processo={modalState.type === 'pos' ? modalState.proc : null}
        isOpen={modalState.type === 'pos'}
        onClose={() => setModalState({ type: null, proc: null })}
      />
    </>
  )
}
