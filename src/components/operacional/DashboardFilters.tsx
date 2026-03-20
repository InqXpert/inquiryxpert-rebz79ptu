import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Upload, Download, X } from 'lucide-react'

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
    <div className="flex flex-col md:flex-row gap-5 w-full items-start md:items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Buscar processos..."
          className="pl-12 h-12 bg-muted/30 border border-border rounded-xl text-[14px] focus-visible:ring-2 focus-visible:ring-primary/50"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center w-full md:w-auto">
        <Select value={filters.status} onValueChange={(v) => setFilters({ status: v })}>
          <SelectTrigger className="h-12 w-full sm:w-[190px] bg-muted/30 border border-border rounded-xl font-medium">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="Todos">Todos os Status</SelectItem>
            <SelectItem value="em_elaboracao">Em Elaboração</SelectItem>
            <SelectItem value="em_execucao">Em Execução</SelectItem>
            <SelectItem value="finalizado">Concluído</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
            <SelectItem value="analise_inicial">Análise</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive shrink-0"
          onClick={clearFilters}
          title="Limpar Filtros"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="flex gap-3 w-full sm:w-auto">
          {canExport && (
            <Button
              variant="outline"
              className="h-12 flex-1 sm:flex-none rounded-xl border-border text-foreground font-semibold hover:bg-muted/50 px-5"
              onClick={onExport}
            >
              <Download className="w-4 h-4 sm:mr-2" />{' '}
              <span className="hidden sm:inline">Exportar</span>
            </Button>
          )}
          {canImport && (
            <Button
              className="h-12 flex-1 sm:flex-none rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-sm px-5"
              onClick={onImport}
            >
              <Upload className="w-4 h-4 sm:mr-2" />{' '}
              <span className="hidden sm:inline">Importar</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
