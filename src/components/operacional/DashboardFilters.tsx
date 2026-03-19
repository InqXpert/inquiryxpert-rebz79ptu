import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Download, Upload } from 'lucide-react'

interface Props {
  filters: any
  setFilters: (f: any) => void
  clearFilters: () => void
  onExport?: () => void
  onImport?: () => void
  canExport: boolean
  canImport: boolean
}

export function DashboardFilters({
  filters,
  setFilters,
  clearFilters,
  onExport,
  onImport,
  canExport,
  canImport,
}: Props) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar controle, segurado ou placa..."
            className="pl-9 bg-card"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            aria-label="Buscar processos"
          />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-3">
          <Select value={filters.status} onValueChange={(v) => setFilters({ status: v })}>
            <SelectTrigger className="w-[160px] bg-card" aria-label="Filtrar por status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos os Status</SelectItem>
              <SelectItem value="em_elaboracao">Em Elaboração</SelectItem>
              <SelectItem value="em_execucao">Em Execução</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
              <SelectItem value="analise_inicial">Análise Inicial</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            className="w-[140px] bg-card text-sm"
            value={filters.data_entrada_from}
            onChange={(e) => setFilters({ data_entrada_from: e.target.value })}
            aria-label="Data inicial"
          />
          <Input
            type="date"
            className="w-[140px] bg-card text-sm"
            value={filters.data_entrada_to}
            onChange={(e) => setFilters({ data_entrada_to: e.target.value })}
            aria-label="Data final"
          />

          <Button variant="outline" onClick={clearFilters} aria-label="Limpar Filtros">
            Limpar
          </Button>

          {canExport && (
            <Button variant="secondary" onClick={onExport} aria-label="Exportar para Excel">
              <Download className="w-4 h-4" />
            </Button>
          )}
          {canImport && (
            <Button variant="secondary" onClick={onImport} aria-label="Importar Dados">
              <Upload className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
