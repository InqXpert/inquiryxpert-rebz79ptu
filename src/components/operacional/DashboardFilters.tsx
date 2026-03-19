import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Upload, Download } from 'lucide-react'

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
    <div className="bg-card border border-border rounded-[8px] p-[16px] flex flex-col md:flex-row gap-[12px] flex-wrap items-center">
      <div className="relative flex-grow w-full md:w-auto">
        <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar controle, segurado ou placa..."
          className="pl-[36px] h-[40px] border-border rounded-[6px] text-[13px] bg-transparent focus-visible:ring-1 focus-visible:ring-[hsl(210_60%_25%)]"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          aria-label="Buscar processos"
        />
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-[12px] w-full md:w-auto">
        <Select value={filters.status} onValueChange={(v) => setFilters({ status: v })}>
          <SelectTrigger
            className="h-[40px] border-border rounded-[6px] px-[12px] text-[13px] w-full md:w-[160px] bg-transparent focus:ring-1 focus:ring-[hsl(210_60%_25%)]"
            aria-label="Filtrar por status"
          >
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
          className="h-[40px] border-border rounded-[6px] px-[12px] text-[13px] w-full md:w-[140px] bg-transparent focus-visible:ring-1 focus-visible:ring-[hsl(210_60%_25%)]"
          value={filters.data_entrada_from}
          onChange={(e) => setFilters({ data_entrada_from: e.target.value })}
          aria-label="Data inicial"
        />
        <Input
          type="date"
          className="h-[40px] border-border rounded-[6px] px-[12px] text-[13px] w-full md:w-[140px] bg-transparent focus-visible:ring-1 focus-visible:ring-[hsl(210_60%_25%)]"
          value={filters.data_entrada_to}
          onChange={(e) => setFilters({ data_entrada_to: e.target.value })}
          aria-label="Data final"
        />

        <Button
          variant="outline"
          className="h-[40px] px-[16px] rounded-[6px] text-muted-foreground w-full md:w-auto font-medium"
          onClick={clearFilters}
          aria-label="Limpar Filtros"
        >
          Limpar Filtros
        </Button>

        {canExport && (
          <Button
            className="h-[40px] px-[16px] rounded-[6px] bg-[hsl(210_60%_25%)] hover:bg-[hsl(210_60%_35%)] text-white w-full md:w-auto font-medium"
            onClick={onExport}
            aria-label="Exportar para Excel"
          >
            <Download className="w-4 h-4 mr-2" /> Exportar para Excel
          </Button>
        )}
        {canImport && (
          <Button
            className="h-[40px] px-[16px] rounded-[6px] bg-[hsl(210_60%_25%)] hover:bg-[hsl(210_60%_35%)] text-white w-full md:w-auto font-medium"
            onClick={onImport}
            aria-label="Importar Dados"
          >
            <Upload className="w-4 h-4 mr-2" /> Importar Dados
          </Button>
        )}
      </div>
    </div>
  )
}
