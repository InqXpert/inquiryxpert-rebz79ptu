import { ProcessoOperacional } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FolderOpen, ArrowDown, ArrowUp, Eye } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { formatDateBr } from '@/lib/utils'

interface Props {
  processos: ProcessoOperacional[]
  loading: boolean
  onViewDetail: (id: string) => void
  pagination: { currentPage: number; pageSize: number; totalCount: number }
  setPagination: (p: any) => void
}

export function ProcessosOperacionaisTable({
  processos,
  loading,
  onViewDetail,
  pagination,
  setPagination,
}: Props) {
  const [sortKey, setSortKey] = useState<keyof ProcessoOperacional>('data_entrada')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const handleSort = (key: keyof ProcessoOperacional) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedData = [...processos].sort((a, b) => {
    let valA = a[sortKey] || ''
    let valB = b[sortKey] || ''

    if (sortKey === 'data_entrada') {
      const parseDate = (d: string) => {
        if (!d) return ''
        const parts = d.split('/')
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`
        return d
      }
      valA = parseDate(valA as string)
      valB = parseDate(valB as string)
    }

    if (valA < valB) return sortDir === 'asc' ? -1 : 1
    if (valA > valB) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const startIndex = (pagination.currentPage - 1) * pagination.pageSize
  const pageData = sortedData.slice(startIndex, startIndex + pagination.pageSize)
  const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize)

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return null
    return sortDir === 'asc' ? (
      <ArrowUp className="inline w-3 h-3 ml-1 text-brand-cyan" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1 text-brand-cyan" />
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col w-full bg-white dark:bg-brand-navy/80">
        <Table className="border-0 border-t border-transparent rounded-none">
          <TableHeader>
            <TableRow>
              {Array.from({ length: 9 }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-20 bg-brand-light dark:bg-white/10" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={9}>
                  <Skeleton className="h-6 w-full bg-brand-light dark:bg-white/10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (processos.length === 0) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center p-6 bg-white dark:bg-brand-navy/80">
        <div className="w-16 h-16 bg-brand-light dark:bg-white/10 rounded-full flex items-center justify-center mb-4">
          <FolderOpen className="w-8 h-8 text-brand-gray dark:text-brand-light/70" />
        </div>
        <h3 className="text-[20px] font-bold text-brand-navy dark:text-white mb-2">
          Nenhum processo encontrado
        </h3>
        <p className="text-[14px] text-brand-gray dark:text-brand-light">
          Ajuste os filtros para encontrar registros.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full bg-white dark:bg-brand-navy/80">
      <Table className="border-0 border-t border-transparent rounded-none">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead
              className="cursor-pointer hover:text-brand-cyan transition-colors"
              onClick={() => handleSort('numero_controle')}
            >
              Controle <SortIcon colKey="numero_controle" />
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-brand-cyan transition-colors"
              onClick={() => handleSort('status')}
            >
              Status <SortIcon colKey="status" />
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-brand-cyan transition-colors"
              onClick={() => handleSort('cia')}
            >
              Seguradora <SortIcon colKey="cia" />
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-brand-cyan transition-colors"
              onClick={() => handleSort('tipo_servico')}
            >
              Tipo Serviço <SortIcon colKey="tipo_servico" />
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-brand-cyan transition-colors"
              onClick={() => handleSort('agente_prestador')}
            >
              Prestador <SortIcon colKey="agente_prestador" />
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-brand-cyan transition-colors"
              onClick={() => handleSort('data_entrada')}
            >
              Data Entrada <SortIcon colKey="data_entrada" />
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-brand-cyan transition-colors"
              onClick={() => handleSort('prioridade')}
            >
              Prioridade <SortIcon colKey="prioridade" />
            </TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageData.map((p) => (
            <TableRow
              key={p.id}
              onClick={() => onViewDetail(p.id)}
              className="cursor-pointer group"
            >
              <TableCell className="font-bold text-[14px] text-brand-navy dark:text-white">
                {p.numero_controle || '-'}
              </TableCell>
              <TableCell>
                <StatusBadge status={p.status} />
              </TableCell>
              <TableCell className="text-brand-gray dark:text-brand-light">
                {p.cia || '-'}
              </TableCell>
              <TableCell className="font-medium text-brand-navy dark:text-white">
                {p.tipo_servico || '-'}
              </TableCell>
              <TableCell className="text-brand-gray dark:text-brand-light">
                {p.expand?.agente_id?.nomeCompleto || p.agente_prestador || 'Não informado'}
              </TableCell>
              <TableCell className="text-brand-gray dark:text-brand-light">
                {p.data_entrada ? formatDateBr(p.data_entrada) : '-'}
              </TableCell>
              <TableCell className="text-brand-gray dark:text-brand-light uppercase text-[11px] font-bold">
                {p.prioridade || '-'}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(p.tags) &&
                  p.tags.filter((t) => typeof t === 'string' && t.trim() !== '').length > 0 ? (
                    p.tags
                      .filter((t): t is string => typeof t === 'string' && t.trim() !== '')
                      .slice(0, 2)
                      .map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-brand-light text-brand-gray dark:bg-black/50 dark:text-brand-light"
                        >
                          {tag.length > 15 ? tag.substring(0, 15) + '...' : tag}
                        </span>
                      ))
                  ) : (
                    <span className="text-xs text-brand-gray/50">-</span>
                  )}
                  {Array.isArray(p.tags) &&
                    p.tags.filter((t) => typeof t === 'string' && t.trim() !== '').length > 2 && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-brand-light text-brand-gray dark:bg-black/50 dark:text-brand-light">
                        +{p.tags.filter((t) => typeof t === 'string' && t.trim() !== '').length - 2}
                      </span>
                    )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewDetail(p.id)
                        }}
                        className="text-brand-cyan hover:bg-brand-teal/20"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Visualizar Processo</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between p-4 border-t border-brand-teal/50 dark:border-brand-cyan/30 bg-brand-light/30 dark:bg-black/10">
        <span className="text-sm text-brand-gray dark:text-brand-light">
          Página {pagination.currentPage} de {totalPages || 1}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-brand-teal text-brand-navy dark:text-white"
            disabled={pagination.currentPage === 1}
            onClick={() =>
              setPagination((prev: any) => ({ ...prev, currentPage: prev.currentPage - 1 }))
            }
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-brand-teal text-brand-navy dark:text-white"
            disabled={pagination.currentPage >= totalPages || totalPages === 0}
            onClick={() =>
              setPagination((prev: any) => ({ ...prev, currentPage: prev.currentPage + 1 }))
            }
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const s = String(status || '')
    .toUpperCase()
    .trim()
  let key = s
  if (s.includes('EXECUCAO') || s.includes('EXECUÇÃO')) key = 'EM_EXECUCAO'
  else if (s.includes('ELABORACAO') || s.includes('ELABORAÇÃO')) key = 'EM_ELABORACAO'
  else if (s.includes('FINALIZADO') || s.includes('CONCLUIDO')) key = 'FINALIZADO'
  else if (s.includes('CANCELADO')) key = 'CANCELADO'
  else if (s.includes('ANALISE')) key = 'ANALISE_INICIAL'

  const colors: Record<string, string> = {
    EM_ELABORACAO: 'bg-brand-orange text-white',
    EM_EXECUCAO: 'bg-brand-cyan text-brand-navy',
    FINALIZADO: 'bg-brand-teal text-white',
    CANCELADO: 'bg-brand-coral text-white',
    ANALISE_INICIAL: 'bg-brand-gray text-white',
  }

  const labels: Record<string, string> = {
    EM_ELABORACAO: 'Em Elaboração',
    EM_EXECUCAO: 'Em Execução',
    FINALIZADO: 'Concluído',
    CANCELADO: 'Cancelado',
    ANALISE_INICIAL: 'Análise',
  }

  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide border-none ${colors[key] || 'bg-brand-gray text-white'}`}
    >
      {labels[key] || status || 'N/A'}
    </span>
  )
}
