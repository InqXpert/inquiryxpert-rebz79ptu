import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Processo } from '@/types/processo'
import { Button } from '@/components/ui/button'
import { Inbox } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HistoricoModal, ObservacoesModal, PosicoesModal } from './ProcessoInlineModals'
import { ProcessosTableRowDesktop } from './ProcessosTableRowDesktop'
import { ProcessosTableRowMobile } from './ProcessosTableRowMobile'

export function ProcessosListTable({ processos, loading, hasMore, onLoadMore, rawCount }: any) {
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [modalState, setModalState] = useState<{
    type: 'history' | 'obs' | 'pos' | null
    proc: Processo | null
  }>({ type: null, proc: null })

  const handleOpenModal = (type: 'history' | 'obs' | 'pos', proc: Processo) => {
    setModalState({ type, proc })
  }

  if (loading && processos.length === 0) {
    return (
      <>
        <div className="hidden md:block bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl overflow-hidden shadow-sm">
          <Table className="table-fixed w-full">
            <TableHeader className="bg-brand-light/30 dark:bg-black/10">
              <TableRow className="hover:bg-transparent border-b-brand-teal/20 dark:border-b-brand-cyan/20">
                <TableHead className="w-[16%] font-bold text-brand-navy dark:text-white text-xs">
                  ID / CONTROLE
                </TableHead>
                <TableHead className="w-[14%] font-bold text-brand-navy dark:text-white text-xs">
                  STATUS
                </TableHead>
                <TableHead className="w-[12%] font-bold text-brand-navy dark:text-white text-xs">
                  SUPERVISOR
                </TableHead>
                <TableHead className="w-[12%] font-bold text-brand-navy dark:text-white text-xs">
                  SEGURADORA
                </TableHead>
                <TableHead className="w-[18%] font-bold text-brand-navy dark:text-white text-xs">
                  TIPO
                </TableHead>
                <TableHead className="w-[10%] hidden lg:table-cell font-bold text-brand-navy dark:text-white text-xs">
                  AGENTE
                </TableHead>
                <TableHead className="w-[14%] font-bold text-brand-navy dark:text-white text-xs">
                  ENTRADA
                </TableHead>
                <TableHead className="w-[4%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow
                  key={i}
                  className="border-b-brand-teal/10 dark:border-b-brand-cyan/10 h-[64px]"
                >
                  <TableCell>
                    <Skeleton className="h-4 w-[90%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-[80%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[90%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80%]" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Skeleton className="h-4 w-[90%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[70%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-4 rounded-full ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="md:hidden space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[180px] w-full rounded-xl bg-white dark:bg-brand-navy border border-brand-teal/20"
            />
          ))}
        </div>
      </>
    )
  }

  if (processos.length === 0) {
    const isFiltering = rawCount > 0
    return (
      <div className="flex flex-col items-center justify-center text-center py-[60px] px-[24px] bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl shadow-sm animate-in fade-in duration-300">
        <Inbox className="w-16 h-16 text-brand-gray dark:text-brand-light mb-4" />
        <h3 className="text-[18px] font-bold text-brand-navy dark:text-white">
          {!isFiltering
            ? 'Nenhum processo atribuído'
            : 'Nenhum processo encontrado com esses filtros'}
        </h3>
        <p className="text-[14px] text-brand-gray dark:text-brand-light mt-2 max-w-md">
          {!isFiltering
            ? 'Você não possui processos no momento.'
            : 'Tente ajustar os parâmetros de busca para encontrar o que procura.'}
        </p>
        {!isFiltering && (
          <Button
            className="mt-6 bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold"
            onClick={() => navigate('/processos/novo')}
          >
            Novo Processo
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="hidden md:block bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl overflow-hidden shadow-sm">
        <Table className="table-fixed w-full">
          <TableHeader className="bg-brand-light/30 dark:bg-black/10">
            <TableRow className="hover:bg-transparent border-b-brand-teal/20 dark:border-b-brand-cyan/20">
              <TableHead className="w-[16%] font-bold text-brand-navy dark:text-white text-xs">
                ID / CONTROLE
              </TableHead>
              <TableHead className="w-[14%] font-bold text-brand-navy dark:text-white text-xs">
                STATUS
              </TableHead>
              <TableHead className="w-[12%] font-bold text-brand-navy dark:text-white text-xs">
                SUPERVISOR
              </TableHead>
              <TableHead className="w-[12%] font-bold text-brand-navy dark:text-white text-xs">
                SEGURADORA
              </TableHead>
              <TableHead className="w-[18%] font-bold text-brand-navy dark:text-white text-xs">
                TIPO
              </TableHead>
              <TableHead className="w-[10%] hidden lg:table-cell font-bold text-brand-navy dark:text-white text-xs">
                AGENTE
              </TableHead>
              <TableHead className="w-[14%] font-bold text-brand-navy dark:text-white text-xs">
                ENTRADA
              </TableHead>
              <TableHead className="w-[4%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processos.map((p: Processo, i: number) => (
              <ProcessosTableRowDesktop
                key={p.id}
                processo={p}
                index={i}
                expanded={expandedId === p.id}
                onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
                onOpenModal={handleOpenModal}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {processos.map((p: Processo, i: number) => (
          <ProcessosTableRowMobile
            key={p.id}
            processo={p}
            index={i}
            expanded={expandedId === p.id}
            onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button
            className="bg-brand-navy text-white hover:bg-brand-navy/90 font-bold shadow-sm px-8"
            onClick={onLoadMore}
          >
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
