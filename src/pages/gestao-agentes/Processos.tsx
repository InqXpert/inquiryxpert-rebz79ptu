import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, isValid, parseISO } from 'date-fns'
import { Calendar as CalendarIcon, Inbox, Search } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { useDebounce } from '@/hooks/use-debounce'
import { useProcessosAgente } from '@/hooks/useProcessosAgente'

export default function GestaoAgentesProcessos() {
  const navigate = useNavigate()

  const [statusFilter, setStatusFilter] = useState('em_andamento')
  const [dateFilter, setDateFilter] = useState('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [priorityFilter, setPriorityFilter] = useState('todas')
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearch = useDebounce(searchTerm, 300)

  const { processos, totalCount, filteredCount, loading, hasMore, setPage } = useProcessosAgente(
    statusFilter,
    dateFilter,
    dateRange,
    priorityFilter,
    debouncedSearch,
  )

  const clearFilters = () => {
    setStatusFilter('em_andamento')
    setDateFilter('all')
    setDateRange(undefined)
    setPriorityFilter('todas')
    setSearchTerm('')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return (
          <Badge className="bg-[#00A8B5] text-white hover:bg-[#00A8B5]/90 border-transparent shadow-none">
            Em Andamento
          </Badge>
        )
      case 'concluido':
        return <Badge variant="success">Concluído</Badge>
      case 'pendente':
        return <Badge variant="warning">Pendente</Badge>
      default:
        return (
          <Badge variant="secondary" className="capitalize">
            {status?.replace('_', ' ')}
          </Badge>
        )
    }
  }

  const getPriorityBadge = (p?: string) => {
    switch (p) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>
      case 'media':
        return <Badge variant="warning">Média</Badge>
      case 'baixa':
        return <Badge variant="secondary">Baixa</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const safeFormat = (dateStr?: string) => {
    if (!dateStr) return '-'
    const d = parseISO(dateStr)
    return isValid(d) ? format(d, 'dd/MM/yyyy') : '-'
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-[#2A3B4C]">Meus Processos</h1>
        <p className="text-muted-foreground mt-1">Acompanhe o status de suas investigações</p>
      </div>

      <div className="sticky top-0 z-20 bg-[#f5f8fa]/95 backdrop-blur-md py-4 border-b border-border/50 flex flex-wrap gap-3 items-center">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] h-11 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="em_andamento">Em Andamento</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px] h-11 bg-white">
            <SelectValue placeholder="Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todo o período</SelectItem>
            <SelectItem value="7days">Últimos 7 dias</SelectItem>
            <SelectItem value="30days">Últimos 30 dias</SelectItem>
            <SelectItem value="custom">Customizado</SelectItem>
          </SelectContent>
        </Select>

        {dateFilter === 'custom' && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'h-11 w-[260px] justify-start text-left font-normal bg-white',
                  !dateRange && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    `${format(dateRange.from, 'dd/MM/yyyy')} - ${format(dateRange.to, 'dd/MM/yyyy')}`
                  ) : (
                    format(dateRange.from, 'dd/MM/yyyy')
                  )
                ) : (
                  <span>Selecione um período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        )}

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[140px] h-11 bg-white">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="media">Média</SelectItem>
            <SelectItem value="baixa">Baixa</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número do processo"
            className="pl-9 h-11 bg-white w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          variant="ghost"
          onClick={clearFilters}
          className="h-11 px-4 text-muted-foreground hover:text-[#2A3B4C] hover:bg-black/5"
        >
          Limpar Filtros
        </Button>
      </div>

      <div className="overflow-x-auto border border-border/60 rounded-xl bg-card shadow-sm">
        <Table className="w-full min-w-[800px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="sticky left-0 bg-muted/80 z-10 w-[200px]">Número</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Criação</TableHead>
              <TableHead>Data Prazo</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell className="sticky left-0 bg-card z-10">
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-9 w-40 ml-auto rounded-lg" />
                  </TableCell>
                </TableRow>
              ))
            ) : totalCount === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-[400px] text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Inbox className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-bold text-[#2A3B4C] mb-2">
                      Nenhum processo atribuído
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Você ainda não possui processos para gerenciar.
                    </p>
                    <Button
                      onClick={() => navigate('/gestao-agentes')}
                      className="bg-[#00A8B5] hover:bg-[#00A8B5]/90 text-white"
                    >
                      Voltar ao Dashboard
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCount === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-[300px] text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <p className="font-medium text-[15px] text-muted-foreground">
                      Nenhum processo encontrado com esses filtros
                    </p>
                    <Button variant="link" onClick={clearFilters} className="mt-2 text-[#00A8B5]">
                      Limpar filtros
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              processos.map((proc, idx) => (
                <TableRow
                  key={proc.id}
                  className="cursor-pointer group hover:bg-muted/50 transition-colors animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-backwards"
                  style={{ animationDelay: `${idx * 30}ms` }}
                  onClick={() => navigate(`/gestao-agentes/processos/${proc.id}`)}
                >
                  <TableCell className="sticky left-0 bg-card group-hover:bg-muted/50 z-10 font-medium text-[#2A3B4C] transition-colors border-r border-transparent group-hover:border-border/30">
                    <span className="group-hover:underline">
                      {proc.numero_processo || proc.numero_controle || '-'}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(proc.status)}</TableCell>
                  <TableCell>{safeFormat(proc.created)}</TableCell>
                  <TableCell>{safeFormat(proc.data_prazo)}</TableCell>
                  <TableCell>{getPriorityBadge(proc.prioridade)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/gestao-agentes/processos/${proc.id}`)
                        }}
                      >
                        Ver Detalhes
                      </Button>
                      {proc.status !== 'concluido' && (
                        <Button
                          size="sm"
                          className="bg-[#2A3B4C] text-white hover:bg-[#2A3B4C]/90"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/gestao-agentes/processos/${proc.id}?tab=relatorio`)
                          }}
                        >
                          Editar Relatório
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="border-[#00A8B5] text-[#00A8B5] hover:bg-[#00A8B5]/10"
            onClick={() => setPage((p) => p + 1)}
          >
            Carregar mais processos
          </Button>
        </div>
      )}
    </div>
  )
}
