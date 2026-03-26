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
      <>
        <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[12%]">ID</TableHead>
                <TableHead className="w-[18%]">STATUS</TableHead>
                <TableHead className="w-[15%]">SUPERVISOR</TableHead>
                <TableHead className="w-[15%]">SEGURADORA</TableHead>
                <TableHead className="w-[12%]">TIPO</TableHead>
                <TableHead className="w-[15%] hidden lg:table-cell">AGENTE</TableHead>
                <TableHead className="w-[12%]">DATA ENTRADA</TableHead>
                <TableHead className="w-[12%] text-right">AÇÕES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="md:hidden space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      </>
    )
  }

  if (processos.length === 0) {
    const isFiltering = rawCount > 0
    return (
      <div className="flex flex-col items-center justify-center text-center py-[60px] px-[24px] bg-card border border-border rounded-xl shadow-sm animate-in fade-in duration-300">
        <Inbox className="w-16 h-16 text-secondary mb-4" />
        <h3 className="text-[18px] font-bold text-foreground">
          {!isFiltering
            ? 'Nenhum processo atribuído'
            : 'Nenhum processo encontrado com esses filtros'}
        </h3>
        <p className="text-[14px] text-muted-foreground mt-2 max-w-md">
          {!isFiltering
            ? 'Você não possui processos no momento.'
            : 'Tente ajustar os parâmetros de busca para encontrar o que procura.'}
        </p>
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
      <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12%]">ID</TableHead>
              <TableHead className="w-[18%]">STATUS</TableHead>
              <TableHead className="w-[15%]">SUPERVISOR</TableHead>
              <TableHead className="w-[15%]">SEGURADORA</TableHead>
              <TableHead className="w-[12%]">TIPO</TableHead>
              <TableHead className="w-[15%] hidden lg:table-cell">AGENTE</TableHead>
              <TableHead className="w-[12%]">DATA ENTRADA</TableHead>
              <TableHead className="w-[12%] text-right">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processos.map((p: Processo, i: number) => {
              const bgColor = calculateDayColor(p.data_entrada)
              const tags = calculateTags(p.data_entrada)

              return (
                <TableRow
                  key={p.id}
                  className={cn(
                    'cursor-pointer animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300',
                    bgColor !== 'transparent' && 'hover:brightness-95',
                  )}
                  style={{
                    backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
                    animationDelay: `${i * 30}ms`,
                  }}
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
                        <div className="flex flex-wrap gap-1 w-full">
                          {tags.map((t, idx) => (
                            <span
                              key={idx}
                              className={cn(
                                'text-[11px] px-2 py-1 rounded-[4px] shadow-sm font-bold truncate max-w-full inline-block',
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
                    className="truncate hidden lg:table-cell"
                    title={p.expand?.agente_id?.nomeCompleto || p.agente_prestador || 'N/A'}
                  >
                    {p.expand?.agente_id?.nomeCompleto || p.agente_prestador || 'N/A'}
                  </TableCell>
                  <TableCell className="font-medium truncate" title={p.data_entrada || 'N/A'}>
                    {p.data_entrada || 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider delayDuration={200}>
                      <div className="flex justify-end gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent"
                              onClick={() => navigate(`/processos/${p.id}/editar`)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="text-[12px] text-muted-foreground bg-card border-border shadow-sm">
                            Editar
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent"
                              onClick={() => setModalState({ type: 'history', proc: p })}
                            >
                              <History className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="text-[12px] text-muted-foreground bg-card border-border shadow-sm">
                            Histórico
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent"
                              onClick={() => setModalState({ type: 'obs', proc: p })}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="text-[12px] text-muted-foreground bg-card border-border shadow-sm">
                            Observações
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent"
                              onClick={() => setModalState({ type: 'pos', proc: p })}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="text-[12px] text-muted-foreground bg-card border-border shadow-sm">
                            Posições
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {processos.map((p: Processo, i: number) => {
          const bgColor = calculateDayColor(p.data_entrada)
          const tags = calculateTags(p.data_entrada)

          return (
            <div
              key={p.id}
              className="bg-card border border-border rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300"
              style={{
                backgroundColor: bgColor !== 'transparent' ? bgColor : undefined,
                animationDelay: `${i * 30}ms`,
              }}
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest('.action-btn')) {
                  navigate(`/processos/${p.id}/editar`)
                }
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">
                    {p.numero_controle || p.id.slice(0, 8)}
                  </p>
                  <p className="font-bold text-xs uppercase text-muted-foreground">
                    {p.status?.replace(/_/g, ' ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground font-medium">
                    {p.data_entrada || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="space-y-1 mb-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seguradora:</span>
                  <span className="font-medium truncate max-w-[180px]">{p.cia || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="font-medium truncate max-w-[180px]">
                    {p.tipo_servico || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Supervisor:</span>
                  <span className="font-medium truncate max-w-[180px]">
                    {p.expand?.supervisor_id?.name || 'N/A'}
                  </span>
                </div>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {tags.map((t, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        'text-[11px] font-bold px-2 py-1 rounded-[4px] shadow-sm',
                        t.color,
                      )}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent"
                        onClick={() => navigate(`/processos/${p.id}/editar`)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-[12px] text-muted-foreground bg-card border-border shadow-sm">
                      Editar
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent"
                        onClick={() => setModalState({ type: 'history', proc: p })}
                      >
                        <History className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-[12px] text-muted-foreground bg-card border-border shadow-sm">
                      Histórico
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent"
                        onClick={() => setModalState({ type: 'obs', proc: p })}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-[12px] text-muted-foreground bg-card border-border shadow-sm">
                      Observações
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="action-btn h-8 w-8 rounded-full text-foreground hover:text-primary/80 hover:bg-transparent"
                        onClick={() => setModalState({ type: 'pos', proc: p })}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-[12px] text-muted-foreground bg-card border-border shadow-sm">
                      Posições
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )
        })}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button className="font-bold shadow-sm px-8" onClick={onLoadMore}>
            Carregar mais
          </Button>
        </div>
      )}

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
