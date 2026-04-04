import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, isValid, parseISO } from 'date-fns'
import {
  Calendar as CalendarIcon,
  Inbox,
  Search,
  Eye,
  FileEdit,
  Star,
  CheckSquare,
  Download,
} from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Card, CardContent } from '@/components/ui/card'
import { useDebounce } from '@/hooks/use-debounce'
import { useProcessosAgente } from '@/hooks/useProcessosAgente'
import { ProcessoQuickViewSheet } from '@/components/operacional/ProcessoQuickViewSheet'
import { Processo } from '@/types/processo'
import { formatDateBr } from '@/lib/utils'

export default function GestaoAgentesProcessos() {
  const navigate = useNavigate()

  const [statusFilter, setStatusFilter] = useState('em_andamento')
  const [dateFilter, setDateFilter] = useState('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [priorityFilter, setPriorityFilter] = useState('todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [quickViewProc, setQuickViewProc] = useState<Processo | null>(null)

  const debouncedSearch = useDebounce(searchTerm, 300)

  const {
    processos,
    totalCount,
    filteredCount,
    loading,
    hasMore,
    setPage,
    toggleFavorite,
    selectedIds,
    toggleSelection,
    toggleAll,
    markAsRead,
    exportSelected,
    clearSelection,
  } = useProcessosAgente(
    statusFilter,
    dateFilter,
    dateRange,
    priorityFilter,
    debouncedSearch,
    showFavorites,
  )

  const clearFilters = () => {
    setStatusFilter('todos')
    setDateFilter('all')
    setDateRange(undefined)
    setPriorityFilter('todas')
    setSearchTerm('')
    setShowFavorites(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'em_andamento':
        return (
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-none">
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
        return (
          <Badge
            variant="secondary"
            className="bg-muted text-muted-foreground hover:bg-muted/80 border-transparent"
          >
            Baixa
          </Badge>
        )
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const safeFormat = (dateStr?: string) => {
    return formatDateBr(dateStr)
  }

  const handleRowClick = (proc: Processo) => {
    setQuickViewProc(proc)
  }

  const displayedIds = processos.map((p) => p.id)
  const isAllSelected = displayedIds.length > 0 && displayedIds.every((id) => selectedIds.has(id))

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-24">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-foreground">Meus Processos</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Acompanhe o status de suas investigações e trabalho de campo
        </p>
      </div>

      <div className="sticky top-0 z-20 bg-card py-[16px] px-[24px] border-b border-border flex flex-col md:flex-row flex-wrap gap-4 items-start md:items-center animate-in slide-in-from-top-2 duration-200 ease-in rounded-xl shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-3 w-full flex-1">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
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
            <SelectTrigger className="w-[180px]">
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
                    'w-[260px] justify-start text-left font-normal bg-card focus-visible:ring-primary',
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

          <Button
            variant={showFavorites ? 'default' : 'outline'}
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex gap-2 items-center"
          >
            <Star className={cn('w-4 h-4', showFavorites ? 'fill-current' : '')} />
            Favoritos
          </Button>

          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número..."
              className="pl-9 w-full bg-card focus-visible:ring-primary focus-visible:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={clearFilters}
          className="text-foreground hover:opacity-80 hover:bg-transparent w-full md:w-auto md:ml-auto"
        >
          Limpar Filtros
        </Button>
      </div>

      {loading ? (
        <>
          <div className="hidden md:block overflow-x-auto border border-border/60 rounded-xl bg-card shadow-sm">
            <Table className="w-full min-w-[800px]">
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="text-muted-foreground font-bold w-[200px]">
                    Número
                  </TableHead>
                  <TableHead className="text-muted-foreground font-bold">Status</TableHead>
                  <TableHead className="text-muted-foreground font-bold">Data Criação</TableHead>
                  <TableHead className="text-muted-foreground font-bold">Data Prazo</TableHead>
                  <TableHead className="text-muted-foreground font-bold hidden lg:table-cell">
                    Prioridade
                  </TableHead>
                  <TableHead className="text-muted-foreground font-bold text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`skel-desktop-${i}`} className="h-[48px]">
                    <TableCell>
                      <Skeleton className="h-5 w-5 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </TableCell>
                    <TableCell>
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
                    <TableCell className="hidden lg:table-cell">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={`skel-mobile-${i}`}>
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-[140px]" />
                    <Skeleton className="h-6 w-[100px] rounded-full" />
                  </div>
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-5 w-[120px]" />
                    <Skeleton className="h-6 w-[80px] rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : totalCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-[60px] px-[24px] text-center bg-card rounded-xl border border-border animate-in fade-in duration-300">
          <Inbox className="w-16 h-16 text-secondary mb-4" />
          <h3 className="text-[18px] font-bold text-foreground mb-2">Nenhum processo atribuído</h3>
          <p className="text-[14px] text-muted-foreground mb-6">
            Você ainda não possui processos para gerenciar.
          </p>
          <Button variant="default" onClick={() => navigate('/gestao-agentes')}>
            Voltar ao Dashboard
          </Button>
        </div>
      ) : filteredCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-[60px] px-[24px] text-center bg-card rounded-xl border border-border animate-in fade-in duration-300">
          <Search className="w-16 h-16 text-secondary mb-4" />
          <h3 className="text-[18px] font-bold text-foreground mb-2">Nenhum processo encontrado</h3>
          <p className="text-[14px] text-muted-foreground mb-6">
            Tente ajustar seus filtros para encontrar o que procura.
          </p>
          <Button variant="outline" onClick={clearFilters} className="text-foreground">
            Limpar filtros
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-border/60 rounded-xl bg-card shadow-sm">
            <Table className="w-full min-w-[800px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={() => toggleAll(displayedIds)}
                    />
                  </TableHead>
                  <TableHead className="w-12 text-center">Fav</TableHead>
                  <TableHead className="text-muted-foreground font-bold sticky left-0 bg-muted/50 z-10 w-[200px]">
                    Número
                  </TableHead>
                  <TableHead className="text-muted-foreground font-bold">Status</TableHead>
                  <TableHead className="text-muted-foreground font-bold">Data Criação</TableHead>
                  <TableHead className="text-muted-foreground font-bold">Data Prazo</TableHead>
                  <TableHead className="text-muted-foreground font-bold hidden lg:table-cell">
                    Prioridade
                  </TableHead>
                  <TableHead className="text-muted-foreground font-bold text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processos.map((proc, idx) => (
                  <TableRow
                    key={proc.id}
                    className={cn(
                      'cursor-pointer group h-[48px] transition-colors animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-backwards',
                      !proc.lido && 'bg-primary/5 hover:bg-primary/10',
                      proc.lido && 'hover:bg-muted even:bg-muted/50',
                    )}
                    style={{ animationDelay: `${idx * 30}ms` }}
                    onClick={() => handleRowClick(proc)}
                  >
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedIds.has(proc.id)}
                        onCheckedChange={() => toggleSelection(proc.id)}
                      />
                    </TableCell>
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 hover:bg-transparent"
                        onClick={() => toggleFavorite(proc.id)}
                      >
                        <Star
                          className={cn(
                            'w-4 h-4 transition-colors',
                            proc.is_favorite
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-muted-foreground',
                          )}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="sticky left-0 z-10 font-medium text-foreground transition-colors border-r border-transparent">
                      <span
                        className={cn(
                          'group-hover:underline',
                          !proc.lido && 'font-bold text-primary',
                        )}
                      >
                        {proc.numero_processo || proc.numero_controle || '-'}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(proc.status)}</TableCell>
                    <TableCell className={cn(!proc.lido && 'font-semibold')}>
                      {safeFormat(proc.created)}
                    </TableCell>
                    <TableCell className={cn(!proc.lido && 'font-semibold')}>
                      {safeFormat(proc.data_prazo)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {getPriorityBadge(proc.prioridade)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-foreground hover:text-primary hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/gestao-agentes/processos/${proc.id}`)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards Layout */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {processos.map((proc, idx) => (
              <Card
                key={proc.id}
                className={cn(
                  'cursor-pointer transition-colors animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-backwards',
                  !proc.lido ? 'border-primary/50 bg-primary/5' : 'hover:border-primary/50',
                )}
                style={{ animationDelay: `${idx * 30}ms` }}
                onClick={() => handleRowClick(proc)}
              >
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.has(proc.id)}
                          onCheckedChange={() => toggleSelection(proc.id)}
                          className="mt-1"
                        />
                      </div>
                      <span
                        className={cn(
                          'font-bold truncate',
                          !proc.lido ? 'text-primary' : 'text-foreground',
                        )}
                      >
                        {proc.numero_processo || proc.numero_controle || '-'}
                      </span>
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(proc.id)
                        }}
                      >
                        <Star
                          className={cn(
                            'w-4 h-4 shrink-0',
                            proc.is_favorite
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-muted-foreground',
                          )}
                        />
                      </div>
                    </div>
                    <div className="shrink-0">{getStatusBadge(proc.status)}</div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground items-center ml-7">
                    <span>Prazo: {safeFormat(proc.data_prazo)}</span>
                    {getPriorityBadge(proc.prioridade)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {hasMore && (
        <div className="flex justify-center mt-[24px]">
          <Button variant="default" onClick={() => setPage((p) => p + 1)}>
            Carregar mais processos
          </Button>
        </div>
      )}

      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-5">
          <span className="font-bold whitespace-nowrap text-sm">
            {selectedIds.size} selecionado(s)
          </span>
          <div className="h-6 w-px bg-muted-foreground/30"></div>
          <Button
            variant="ghost"
            size="sm"
            className="text-background hover:bg-background/20 rounded-full text-xs h-8"
            onClick={markAsRead}
          >
            <CheckSquare className="w-4 h-4 mr-1.5" /> Marcar como Lido
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-background hover:bg-background/20 rounded-full text-xs h-8"
            onClick={exportSelected}
          >
            <Download className="w-4 h-4 mr-1.5" /> Exportar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:bg-background/20 rounded-full text-xs h-8 px-2"
            onClick={clearSelection}
          >
            Cancelar
          </Button>
        </div>
      )}

      <ProcessoQuickViewSheet
        isOpen={!!quickViewProc}
        onClose={() => setQuickViewProc(null)}
        processo={quickViewProc}
      />
    </div>
  )
}
