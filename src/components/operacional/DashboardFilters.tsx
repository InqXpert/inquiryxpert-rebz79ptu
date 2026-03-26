import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Upload, Download, FilterX } from 'lucide-react'

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="relative lg:col-span-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
        <Input
          placeholder="Buscar processos..."
          className="pl-10 w-full bg-white dark:bg-brand-navy/50"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
      </div>

      <Select value={filters.status} onValueChange={(v) => setFilters({ status: v })}>
        <SelectTrigger className="w-full bg-white dark:bg-brand-navy/50">
          <SelectValue placeholder="Filtrar por Status..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Todos">Todos os Status</SelectItem>
          <SelectItem value="em_elaboracao">Em Elaboração</SelectItem>
          <SelectItem value="em_execucao">Em Execução</SelectItem>
          <SelectItem value="finalizado">Concluído</SelectItem>
          <SelectItem value="cancelado">Cancelado</SelectItem>
          <SelectItem value="analise_inicial">Análise</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center justify-end gap-2 w-full lg:col-span-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-brand-gray hover:text-brand-navy dark:hover:text-white flex-shrink-0"
          onClick={clearFilters}
          title="Limpar Filtros"
        >
          <FilterX className="w-4 h-4" />
        </Button>

        {canExport && (
          <Button
            variant="outline"
            className="flex-1 border-brand-teal text-brand-navy dark:text-white hover:bg-brand-light/50"
            onClick={onExport}
          >
            <Download className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Exportar</span>
          </Button>
        )}
        {canImport && (
          <Button
            className="flex-1 bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold shadow-sm"
            onClick={onImport}
          >
            <Upload className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Importar</span>
          </Button>
        )}
      </div>
    </div>
  )
}
