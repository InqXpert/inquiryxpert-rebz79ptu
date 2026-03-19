import { ProcessoOperacional } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
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
  const [sortKey, setSortKey] = useState<keyof ProcessoOperacional>('created')
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
    const valA = a[sortKey] || ''
    const valB = b[sortKey] || ''
    if (valA < valB) return sortDir === 'asc' ? -1 : 1
    if (valA > valB) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const startIndex = (pagination.currentPage - 1) * pagination.pageSize
  const pageData = sortedData.slice(startIndex, startIndex + pagination.pageSize)
  const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize)

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (processos.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center border rounded-2xl bg-card">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
          <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">Nenhum processo encontrado</h3>
        <p className="text-sm text-muted-foreground">
          Ajuste os filtros ou adicione um novo processo.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {pageData.map((p) => (
          <Card key={p.id} className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-muted-foreground font-medium">{p.numero_controle}</div>
                <div className="font-medium text-foreground text-sm mt-0.5">{p.nome_segurado}</div>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="block font-medium">Seguradora</span>
                {p.cia}
              </div>
              <div>
                <span className="block font-medium">Data Entrada</span>
                {p.data_entrada}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => onViewDetail(p.id)}
            >
              Ver Detalhes
            </Button>
          </Card>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="cursor-pointer" onClick={() => handleSort('numero_controle')}>
                Controle
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                Status
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('nome_segurado')}>
                Segurado
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('cia')}>
                Seguradora
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('tipo_servico')}>
                Serviço
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('data_entrada')}>
                Entrada
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('resultado')}>
                Resultado
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((p, i) => (
              <TableRow
                key={p.id}
                className="hover:bg-muted/50 transition-colors animate-in slide-in-from-bottom-2 fade-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <TableCell className="font-medium text-xs text-muted-foreground">
                  {p.numero_controle}
                </TableCell>
                <TableCell>
                  <StatusBadge status={p.status} />
                </TableCell>
                <TableCell className="font-medium">{p.nome_segurado}</TableCell>
                <TableCell className="text-muted-foreground">{p.cia}</TableCell>
                <TableCell className="text-muted-foreground">{p.tipo_servico}</TableCell>
                <TableCell className="text-muted-foreground">{p.data_entrada}</TableCell>
                <TableCell>
                  <ResultadoBadge resultado={p.resultado} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetail(p.id)}
                    aria-label="Detalhes"
                  >
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2 items-center pt-2">
        <span className="text-xs text-muted-foreground mr-4">
          Página {pagination.currentPage} de {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0"
          disabled={pagination.currentPage === 1}
          onClick={() =>
            setPagination((prev: any) => ({ ...prev, currentPage: prev.currentPage - 1 }))
          }
        >
          &lt;
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-8 h-8 p-0"
          disabled={pagination.currentPage >= totalPages}
          onClick={() =>
            setPagination((prev: any) => ({ ...prev, currentPage: prev.currentPage + 1 }))
          }
        >
          &gt;
        </Button>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    em_elaboracao: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    em_execucao: 'bg-blue-100 text-blue-700 border-blue-200',
    finalizado: 'bg-green-100 text-green-700 border-green-200',
    cancelado: 'bg-red-100 text-red-700 border-red-200',
    analise_inicial: 'bg-gray-100 text-gray-700 border-gray-200',
  }
  const labels: Record<string, string> = {
    em_elaboracao: 'Em Elaboração',
    em_execucao: 'Em Execução',
    finalizado: 'Finalizado',
    cancelado: 'Cancelado',
    analise_inicial: 'Análise Inicial',
  }
  return (
    <span
      role="status"
      aria-label={`Status: ${labels[status] || status}`}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${colors[status] || 'bg-muted text-muted-foreground'}`}
    >
      {labels[status] || status}
    </span>
  )
}

function ResultadoBadge({ resultado }: { resultado: string }) {
  if (!resultado) return <span className="text-xs text-muted-foreground">-</span>
  const colors: Record<string, string> = {
    regular: 'bg-green-100 text-green-700 border-green-200',
    irregular: 'bg-orange-100 text-orange-700 border-orange-200',
    analise: 'bg-blue-100 text-blue-700 border-blue-200',
    cancelado: 'bg-red-100 text-red-700 border-red-200',
  }
  return (
    <span
      role="status"
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${colors[resultado] || 'bg-muted text-muted-foreground'}`}
    >
      {resultado}
    </span>
  )
}
