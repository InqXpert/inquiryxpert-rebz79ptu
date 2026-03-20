import { ProcessoOperacional } from '@/types'
import { Button } from '@/components/ui/button'
import { FolderOpen, ArrowDown, ArrowUp, ChevronRight } from 'lucide-react'
import { useState } from 'react'

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
      <ArrowUp className="inline w-3 h-3 ml-1 text-secondary" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1 text-secondary" />
    )
  }

  if (loading) {
    return (
      <div className="space-y-4 p-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    )
  }

  if (processos.length === 0) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <FolderOpen className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">Nenhum processo encontrado</h3>
        <p className="text-base text-muted-foreground">
          Ajuste os filtros para encontrar registros.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-muted/50 border-b border-border text-muted-foreground">
            <tr>
              <th
                className="py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('numero_controle')}
              >
                Controle <SortIcon colKey="numero_controle" />
              </th>
              <th
                className="py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('status')}
              >
                Status <SortIcon colKey="status" />
              </th>
              <th
                className="py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('cia')}
              >
                Seguradora <SortIcon colKey="cia" />
              </th>
              <th
                className="py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('nome_segurado')}
              >
                Segurado <SortIcon colKey="nome_segurado" />
              </th>
              <th
                className="py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('agente_prestador')}
              >
                Prestador <SortIcon colKey="agente_prestador" />
              </th>
              <th
                className="py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('data_entrada')}
              >
                Data Entrada <SortIcon colKey="data_entrada" />
              </th>
              <th
                className="py-5 px-6 text-sm font-semibold cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('analista_solicitante')}
              >
                Analista <SortIcon colKey="analista_solicitante" />
              </th>
              <th className="py-5 px-6 text-sm font-semibold text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((p) => (
              <tr
                key={p.id}
                className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors group"
                onClick={() => onViewDetail(p.id)}
              >
                <td className="py-5 px-6 text-[15px] font-semibold text-primary">
                  {p.numero_controle || '-'}
                </td>
                <td className="py-5 px-6 text-[15px]">
                  <StatusBadge status={p.status} />
                </td>
                <td className="py-5 px-6 text-[15px] text-muted-foreground">{p.cia || '-'}</td>
                <td className="py-5 px-6 text-[15px] font-medium text-foreground">
                  {p.nome_segurado || '-'}
                </td>
                <td className="py-5 px-6 text-[15px] text-muted-foreground">
                  {p.agente_prestador || '-'}
                </td>
                <td className="py-5 px-6 text-[15px] text-muted-foreground">
                  {p.data_entrada || '-'}
                </td>
                <td className="py-5 px-6 text-[15px] text-muted-foreground">
                  {p.analista_solicitante || '-'}
                </td>
                <td className="py-5 px-6 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground group-hover:text-secondary group-hover:bg-secondary/10 rounded-full h-9 w-9"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 py-6 border-t border-border bg-card">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl px-5 font-semibold"
          disabled={pagination.currentPage === 1}
          onClick={() =>
            setPagination((prev: any) => ({ ...prev, currentPage: prev.currentPage - 1 }))
          }
        >
          Anterior
        </Button>
        <span className="text-sm font-medium text-muted-foreground">
          Página {pagination.currentPage} de {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl px-5 font-semibold"
          disabled={pagination.currentPage >= totalPages}
          onClick={() =>
            setPagination((prev: any) => ({ ...prev, currentPage: prev.currentPage + 1 }))
          }
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const s = String(status || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
  let key = s
  if (s.includes('execucao')) key = 'em_execucao'
  else if (s.includes('elaboracao')) key = 'em_elaboracao'
  else if (s.includes('finalizad') || s.includes('concluid')) key = 'finalizado'
  else if (s.includes('cancelad')) key = 'cancelado'
  else if (s.includes('analise')) key = 'analise_inicial'

  const colors: Record<string, string> = {
    em_elaboracao: 'bg-yellow-100 text-yellow-800',
    em_execucao: 'bg-blue-100 text-blue-800',
    finalizado: 'bg-emerald-100 text-emerald-800',
    cancelado: 'bg-destructive/10 text-destructive',
    analise_inicial: 'bg-muted text-muted-foreground',
  }

  const labels: Record<string, string> = {
    em_elaboracao: 'Em Elaboração',
    em_execucao: 'Em Execução',
    finalizado: 'Concluído',
    cancelado: 'Cancelado',
    analise_inicial: 'Análise',
  }

  return (
    <span
      className={`inline-flex px-3 py-1.5 rounded-full text-[12px] font-bold ${colors[key] || 'bg-muted text-muted-foreground'}`}
    >
      {labels[key] || status || 'N/A'}
    </span>
  )
}
