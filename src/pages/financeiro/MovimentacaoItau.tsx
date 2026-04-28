import React, { useState, useMemo, useEffect } from 'react'
import { FinanceiroNav } from './components/FinanceiroNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  AlertCircle,
  PackageOpen,
  RotateCcw,
} from 'lucide-react'
import { format, isSameMonth } from 'date-fns'
import { cn } from '@/lib/utils'

type TransactionType = 'Retirada' | 'Devolução'
type TransactionStatus = 'Pendente Devolução' | 'Devolvido' | 'Cancelado'

interface Transaction {
  id: string
  date: string
  cLevel: string
  type: TransactionType
  amount: number
  motive: string
  status: TransactionStatus
  returnDate?: string
  balance: number
}

const mockData: Transaction[] = [
  {
    id: '1',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    cLevel: 'João Silva',
    type: 'Retirada',
    amount: 5000,
    motive: 'Despesa operacional',
    status: 'Pendente Devolução',
    balance: 5000,
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    cLevel: 'Maria Santos',
    type: 'Retirada',
    amount: 12000,
    motive: 'Adiantamento',
    status: 'Devolvido',
    returnDate: new Date(Date.now() - 86400000).toISOString(),
    balance: 0,
  },
  {
    id: '3',
    date: new Date(Date.now() - 86400000).toISOString(),
    cLevel: 'Maria Santos',
    type: 'Devolução',
    amount: 12000,
    motive: 'Reembolso',
    status: 'Devolvido',
    balance: 0,
  },
  {
    id: '4',
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    cLevel: 'Carlos Oliveira',
    type: 'Retirada',
    amount: 3500,
    motive: 'Viagem',
    status: 'Pendente Devolução',
    balance: 3500,
  },
  {
    id: '5',
    date: new Date(Date.now() - 86400000 * 15).toISOString(),
    cLevel: 'João Silva',
    type: 'Retirada',
    amount: 8000,
    motive: 'Equipamentos',
    status: 'Cancelado',
    balance: 0,
  },
  {
    id: '6',
    date: new Date(Date.now() - 86400000 * 18).toISOString(),
    cLevel: 'Carlos Oliveira',
    type: 'Retirada',
    amount: 2000,
    motive: 'Evento',
    status: 'Devolvido',
    returnDate: new Date(Date.now() - 86400000 * 12).toISOString(),
    balance: 0,
  },
  {
    id: '7',
    date: new Date(Date.now() - 86400000 * 12).toISOString(),
    cLevel: 'Carlos Oliveira',
    type: 'Devolução',
    amount: 2000,
    motive: 'Reembolso evento',
    status: 'Devolvido',
    balance: 0,
  },
  {
    id: '8',
    date: new Date(Date.now() - 86400000 * 25).toISOString(),
    cLevel: 'Maria Santos',
    type: 'Retirada',
    amount: 4500,
    motive: 'Adiantamento',
    status: 'Pendente Devolução',
    balance: 4500,
  },
]

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

export default function MovimentacaoItau() {
  const [data, setData] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    cLevel: 'Todos',
    type: 'Todos',
  })
  const [appliedFilters, setAppliedFilters] = useState(filters)
  const [page, setPage] = useState(1)

  const loadData = () => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setData(mockData)
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
    loadData()
  }, [])
  useEffect(() => {
    setPage(1)
  }, [appliedFilters])

  const currentMonthData = data.filter((t) => isSameMonth(new Date(t.date), new Date()))
  const totalRetiradasMonth = currentMonthData
    .filter((t) => t.type === 'Retirada' && t.status !== 'Cancelado')
    .reduce((acc, curr) => acc + curr.amount, 0)
  const totalDevolucoesMonth = currentMonthData
    .filter((t) => t.type === 'Devolução')
    .reduce((acc, curr) => acc + curr.amount, 0)
  const saldoLiquidoMonth = totalRetiradasMonth - totalDevolucoesMonth
  const saldoPendenteMonth = currentMonthData
    .filter((t) => t.status === 'Pendente Devolução')
    .reduce((acc, curr) => acc + curr.balance, 0)

  const filteredData = useMemo(() => {
    return data.filter((t) => {
      if (appliedFilters.cLevel !== 'Todos' && t.cLevel !== appliedFilters.cLevel) return false
      if (appliedFilters.type !== 'Todos' && t.type !== appliedFilters.type) return false
      if (appliedFilters.dateFrom && t.date < appliedFilters.dateFrom) return false
      if (appliedFilters.dateTo && t.date > appliedFilters.dateTo + 'T23:59:59.999Z') return false
      return true
    })
  }, [data, appliedFilters])

  const tableTotalRetiradas = filteredData
    .filter((t) => t.type === 'Retirada' && t.status !== 'Cancelado')
    .reduce((a, c) => a + c.amount, 0)
  const tableTotalDevolucoes = filteredData
    .filter((t) => t.type === 'Devolução')
    .reduce((a, c) => a + c.amount, 0)
  const tableSaldoLiquido = tableTotalRetiradas - tableTotalDevolucoes

  const ITEMS_PER_PAGE = 25
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleClear = () => {
    const reset = { dateFrom: '', dateTo: '', cLevel: 'Todos', type: 'Todos' }
    setFilters(reset)
    setAppliedFilters(reset)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Movimentação Bancária — Itaú</h1>
        <p className="text-muted-foreground mt-2">Controle de retiradas e devoluções de C-Level</p>
      </div>

      <FinanceiroNav />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Retiradas</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRetiradasMonth)}</div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Devoluções</CardTitle>
            <ArrowDownRight className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDevolucoesMonth)}</div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(saldoLiquidoMonth)}</div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pendente Devolução</CardTitle>
            <AlertCircle className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(saldoPendenteMonth)}</div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6">
            <div className="space-y-2">
              <Label>De</Label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Até</Label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>C-Level</Label>
              <Select
                value={filters.cLevel}
                onValueChange={(v) => setFilters({ ...filters, cLevel: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="C-Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="João Silva">João Silva</SelectItem>
                  <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                  <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select
                value={filters.type}
                onValueChange={(v) => setFilters({ ...filters, type: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Retirada">Retirada</SelectItem>
                  <SelectItem value="Devolução">Devolução</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setAppliedFilters(filters)} className="flex-1">
                Filtrar
              </Button>
              <Button onClick={handleClear} variant="outline" className="flex-1">
                Limpar
              </Button>
            </div>
          </div>

          <div className="w-full overflow-x-auto rounded-md border border-border">
            <Table className="min-w-[900px]">
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="text-brand-navy font-semibold">Data</TableHead>
                  <TableHead className="text-brand-navy font-semibold">C-Level</TableHead>
                  <TableHead className="text-brand-navy font-semibold">Tipo</TableHead>
                  <TableHead className="text-brand-navy font-semibold text-right">
                    Valor (R$)
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold">Motivo</TableHead>
                  <TableHead className="text-brand-navy font-semibold text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold text-center">
                    Data Devolução
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold text-right">
                    Saldo (R$)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                {!isLoading &&
                  !hasError &&
                  paginatedData.map((t) => (
                    <TableRow
                      key={t.id}
                      className="odd:bg-background even:bg-muted/50 hover:bg-muted/80 transition-colors"
                    >
                      <TableCell>{format(new Date(t.date), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{t.cLevel}</TableCell>
                      <TableCell
                        className={cn(
                          'font-medium',
                          t.type === 'Retirada' ? 'text-[#f97316]' : 'text-[#0d9488]',
                        )}
                      >
                        {t.type}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(t.amount)}
                      </TableCell>
                      <TableCell>{t.motive}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            t.status === 'Pendente Devolução' &&
                              'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
                            t.status === 'Devolvido' &&
                              'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
                            t.status === 'Cancelado' &&
                              'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100',
                          )}
                        >
                          {t.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {t.returnDate ? format(new Date(t.returnDate), 'dd/MM/yyyy') : '-'}
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(t.balance)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              {!isLoading && !hasError && filteredData.length > 0 && (
                <TableFooter className="bg-slate-100 font-semibold text-slate-800">
                  <TableRow>
                    <TableCell colSpan={3} className="text-right text-brand-navy">
                      Total Retiradas:
                    </TableCell>
                    <TableCell className="text-right text-[#f97316]">
                      {formatCurrency(tableTotalRetiradas)}
                    </TableCell>
                    <TableCell colSpan={3} className="text-right text-brand-navy">
                      Total Devoluções:
                    </TableCell>
                    <TableCell className="text-right text-[#0d9488]">
                      {formatCurrency(tableTotalDevolucoes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7} className="text-right text-brand-navy">
                      Saldo Líquido:
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(tableSaldoLiquido)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </div>

          {!isLoading && !hasError && filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-t-0 rounded-b-md">
              <PackageOpen className="w-12 h-12 mb-4 opacity-50" />
              <p>Nenhuma movimentação neste período</p>
            </div>
          )}

          {!isLoading && hasError && (
            <div className="flex flex-col items-center justify-center p-12 text-center text-destructive border border-t-0 rounded-b-md">
              <AlertCircle className="w-12 h-12 mb-4 opacity-80" />
              <p className="mb-4">Erro ao carregar movimentação. Tente novamente.</p>
              <Button onClick={loadData} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" /> Tentar novamente
              </Button>
            </div>
          )}

          {!isLoading && !hasError && totalPages > 1 && (
            <div className="pt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage((p) => Math.max(1, p - 1))
                      }}
                      className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={page === i + 1}
                        onClick={(e) => {
                          e.preventDefault()
                          setPage(i + 1)
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage((p) => Math.min(totalPages, p + 1))
                      }}
                      className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
