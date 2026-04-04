import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'
import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { Search, FilterX } from 'lucide-react'

export function ProcessosListFilters({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  tagFilter,
  setTagFilter,
  supervisorFilter,
  setSupervisorFilter,
  search,
  setSearch,
  clearFilters,
}: any) {
  const [localSearch, setLocalSearch] = useState(search)
  const debouncedSearch = useDebounce(localSearch, 300)

  const [supervisores, setSupervisores] = useState<any[]>([])

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch, setSearch])

  useEffect(() => {
    setLocalSearch(search)
  }, [search])

  useEffect(() => {
    pb.collection('users')
      .getFullList({ filter: `role = 'supervisor'` })
      .then((res) => setSupervisores(res))
      .catch(() => {})
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full items-center transition-all">
      <div className="relative w-full lg:w-[300px] shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar..."
          className="pl-9 h-11 w-full min-h-[44px]"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          aria-label="Buscar processos"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full lg:flex-1">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-11 min-h-[44px]" aria-label="Filtrar por Status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos os Status</SelectItem>
            <SelectItem value="ANALISE_INICIAL">Análise Inicial</SelectItem>
            <SelectItem value="EM_EXECUCAO">Em Execução</SelectItem>
            <SelectItem value="EM_ELABORACAO">Em Elaboração</SelectItem>
            <SelectItem value="FINALIZADO">Finalizado</SelectItem>
            <SelectItem value="CANCELADO">Cancelado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="h-11 min-h-[44px]" aria-label="Filtrar por Data">
            <SelectValue placeholder="Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todas as Datas</SelectItem>
            <SelectItem value="7days">Últimos 7 dias</SelectItem>
            <SelectItem value="30days">Últimos 30 dias</SelectItem>
            <SelectItem value="custom">Customizado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger className="h-11 min-h-[44px]" aria-label="Filtrar por Tag">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todas as Tags</SelectItem>
            <SelectItem value="Urgente">Urgente</SelectItem>
            <SelectItem value="Documentação Pendente">Documentação Pendente</SelectItem>
            <SelectItem value="Aguardando Terceiro">Aguardando Terceiro</SelectItem>
            <SelectItem value="Em Análise">Em Análise</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Select value={supervisorFilter} onValueChange={setSupervisorFilter}>
            <SelectTrigger className="flex-1 h-11 min-h-[44px]" aria-label="Filtrar por Supervisor">
              <SelectValue placeholder="Supervisor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos Supervisores</SelectItem>
              {supervisores.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name || s.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 text-foreground hover:opacity-80 transition-opacity hover:bg-transparent"
            onClick={clearFilters}
            title="Limpar Filtros"
            aria-label="Limpar Filtros"
          >
            <FilterX className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
