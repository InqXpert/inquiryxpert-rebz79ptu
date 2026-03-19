import { ProcessoOperacional } from '@/types'
import { Button } from '@/components/ui/button'
import { FolderOpen, ArrowDown, ArrowUp } from 'lucide-react'
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

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return null
    return sortDir === 'asc' ? (
      <ArrowUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1" />
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-[8px]" />
        ))}
      </div>
    )
  }

  if (processos.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center border rounded-[8px] bg-card mt-6">
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
          <FolderOpen className="w-6 h-6 text-muted-foreground" />
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
      <div className="md:hidden space-y-4 mt-6">
        {pageData.map((p, i) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-[8px] p-4 flex flex-col gap-3 animate-in fade-in fill-mode-both"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[12px] text-muted-foreground font-medium">
                  {p.numero_controle}
                </div>
                <div className="font-medium text-foreground text-[13px] mt-0.5">
                  {p.nome_segurado}
                </div>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[12px] text-muted-foreground mt-1">
              <div>
                <span className="block font-medium">Seguradora</span>
                {p.cia}
              </div>
              <div>
                <span className="block font-medium">Serviço</span>
                {p.tipo_servico}
              </div>
              <div>
                <span className="block font-medium">Data Entrada</span>
                {p.data_entrada}
              </div>
              <div>
                <span className="block font-medium">Dias Úteis</span>
                {p.dias_uteis}
              </div>
              <div>
                <span className="block font-medium">Data Retorno</span>
                {p.data_retorno}
              </div>
              <div>
                <span className="block font-medium">Data Saída</span>
                {p.data_saida}
              </div>
              <div>
                <span className="block font-medium">Resultado</span>
                <ResultadoBadge resultado={p.resultado} />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 border-[hsl(210_60%_25%)] text-[hsl(210_60%_25%)] hover:bg-[hsl(210_60%_25%)]/10"
              onClick={() => onViewDetail(p.id)}
            >
              Ver Detalhes
            </Button>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block bg-card border border-border rounded-[8px] overflow-hidden mt-6">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('numero_controle')}
              >
                Controle <SortIcon colKey="numero_controle" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('status')}
              >
                Status <SortIcon colKey="status" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('nome_segurado')}
              >
                Segurado <SortIcon colKey="nome_segurado" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('cia')}
              >
                Seguradora <SortIcon colKey="cia" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('tipo_servico')}
              >
                Serviço <SortIcon colKey="tipo_servico" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('agente_prestador')}
              >
                Agente Prestador <SortIcon colKey="agente_prestador" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('data_entrada')}
              >
                Data Entrada <SortIcon colKey="data_entrada" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('dias_uteis')}
              >
                Dias Úteis <SortIcon colKey="dias_uteis" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('data_retorno')}
              >
                Data Retorno <SortIcon colKey="data_retorno" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('data_saida')}
              >
                Data Saída <SortIcon colKey="data_saida" />
              </th>
              <th
                className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort('resultado')}
              >
                Resultado <SortIcon colKey="resultado" />
              </th>
              <th className="py-[12px] px-[16px] text-[12px] font-semibold text-muted-foreground text-right">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((p, i) => (
              <tr
                key={p.id}
                className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors animate-in fade-in fill-mode-both"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => onViewDetail(p.id)}
              >
                <td className="py-[12px] px-[16px] text-[13px] font-medium text-foreground">
                  {p.numero_controle}
                </td>
                <td className="py-[12px] px-[16px] text-[13px]">
                  <StatusBadge status={p.status} />
                </td>
                <td className="py-[12px] px-[16px] text-[13px] text-foreground">
                  {p.nome_segurado}
                </td>
                <td className="py-[12px] px-[16px] text-[13px] text-foreground">{p.cia}</td>
                <td className="py-[12px] px-[16px] text-[13px] text-foreground">
                  {p.tipo_servico}
                </td>
                <td className="py-[12px] px-[16px] text-[13px] text-foreground">
                  {p.agente_prestador}
                </td>
                <td className="py-[12px] px-[16px] text-[13px] text-foreground">
                  {p.data_entrada}
                </td>
                <td className="py-[12px] px-[16px] text-[13px] text-foreground">{p.dias_uteis}</td>
                <td className="py-[12px] px-[16px] text-[13px] text-foreground">
                  {p.data_retorno}
                </td>
                <td className="py-[12px] px-[16px] text-[13px] text-foreground">{p.data_saida}</td>
                <td className="py-[12px] px-[16px] text-[13px]">
                  <ResultadoBadge resultado={p.resultado} />
                </td>
                <td className="py-[12px] px-[16px] text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[hsl(210_60%_25%)] text-[hsl(210_60%_25%)] hover:bg-[hsl(210_60%_25%)]/10 text-[13px] h-[32px]"
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewDetail(p.id)
                    }}
                  >
                    Ações
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row gap-[8px] justify-center mt-[16px]">
        <Button
          variant="outline"
          size="sm"
          className="w-[32px] h-[32px] p-0 text-[13px]"
          disabled={pagination.currentPage === 1}
          onClick={() =>
            setPagination((prev: any) => ({ ...prev, currentPage: prev.currentPage - 1 }))
          }
        >
          &lt;
        </Button>
        <span className="text-[13px] flex items-center justify-center font-medium mx-2 text-muted-foreground">
          Página {pagination.currentPage} de {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="w-[32px] h-[32px] p-0 text-[13px]"
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
    em_elaboracao: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    em_execucao: 'bg-blue-100 text-blue-700 border border-blue-200',
    finalizado: 'bg-green-100 text-green-700 border border-green-200',
    cancelado: 'bg-red-100 text-red-700 border border-red-200',
    analise_inicial: 'bg-gray-100 text-gray-700 border border-gray-200',
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
      className={`inline-flex items-center px-[8px] py-[2px] rounded-full text-[11px] font-semibold whitespace-nowrap ${colors[status] || 'bg-muted text-muted-foreground border border-border'}`}
    >
      {labels[status] || status}
    </span>
  )
}

function ResultadoBadge({ resultado }: { resultado: string }) {
  if (!resultado) return <span className="text-[11px] text-muted-foreground">-</span>
  const colors: Record<string, string> = {
    regular: 'bg-green-100 text-green-700 border border-green-200',
    irregular: 'bg-orange-100 text-orange-700 border border-orange-200',
    analise: 'bg-blue-100 text-blue-700 border border-blue-200',
    cancelado: 'bg-red-100 text-red-700 border border-red-200',
  }
  return (
    <span
      role="status"
      className={`inline-flex items-center px-[8px] py-[2px] rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${colors[resultado] || 'bg-muted text-muted-foreground border border-border'}`}
    >
      {resultado}
    </span>
  )
}
