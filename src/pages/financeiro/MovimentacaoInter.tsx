import React, { useState, useEffect } from 'react'
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  AlertCircle,
  PackageOpen,
  RotateCcw,
  LineChart,
  Plus,
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { useAuth } from '@/hooks/use-auth'

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const statusMap = {
  processado: 'Processado',
  pendente: 'Pendente',
  cancelado: 'Cancelado',
}

export default function MovimentacaoInter() {
  const { user } = useAuth()
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const [filters, setFilters] = useState({
    dateFrom: format(startOfMonth, 'yyyy-MM-dd'),
    dateTo: format(endOfMonth, 'yyyy-MM-dd'),
    type: 'Todos',
  })
  const [appliedFilters, setAppliedFilters] = useState(filters)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [totals, setTotals] = useState({ creditos: 0, debitos: 0, saldoLiquido: 0 })

  const [formData, setFormData] = useState({
    data: format(new Date(), 'yyyy-MM-dd'),
    fornecedor: '',
    identificacao: '',
    tipo: 'credito',
    valor: '',
    status: 'processado',
  })

  const loadData = async () => {
    setIsLoading(true)
    setHasError(false)
    try {
      const filterParts = []
      if (appliedFilters.dateFrom) filterParts.push(`data >= '${appliedFilters.dateFrom} 00:00:00'`)
      if (appliedFilters.dateTo) filterParts.push(`data <= '${appliedFilters.dateTo} 23:59:59'`)
      if (appliedFilters.type === 'Crédito') filterParts.push(`credito > 0`)
      if (appliedFilters.type === 'Débito') filterParts.push(`debito > 0`)
      const filterString = filterParts.join(' && ')

      const [listRes, allRes] = await Promise.all([
        pb
          .collection('movimentacao_inter')
          .getList(page, 25, { filter: filterString, sort: '-data' }),
        pb
          .collection('movimentacao_inter')
          .getFullList({ filter: filterString, fields: 'credito,debito,status' }),
      ])

      setPaginatedData(listRes.items)
      setTotalPages(Math.ceil(listRes.totalItems / 25) || 1)

      const creditos = allRes
        .filter((t: any) => t.status !== 'cancelado')
        .reduce((a, c) => a + (c.credito || 0), 0)
      const debitos = allRes
        .filter((t: any) => t.status !== 'cancelado')
        .reduce((a, c) => a + (c.debito || 0), 0)
      setTotals({ creditos, debitos, saldoLiquido: creditos - debitos })
    } catch (err) {
      setHasError(true)
      toast.error('Erro ao carregar movimentações')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [page, appliedFilters])

  useRealtime('movimentacao_inter', () => {
    loadData()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (new Date(formData.data) > new Date()) {
      toast.error('A data não pode ser no futuro')
      return
    }
    if (Number(formData.valor) <= 0) {
      toast.error('O valor deve ser maior que zero')
      return
    }
    setIsSubmitting(true)
    try {
      const val = Number(formData.valor)
      await pb.collection('movimentacao_inter').create({
        user_id: user?.id,
        data: new Date(formData.data + 'T12:00:00').toISOString(),
        fornecedor: formData.fornecedor,
        identificacao: formData.identificacao,
        credito: formData.tipo === 'credito' ? val : 0,
        debito: formData.tipo === 'debito' ? val : 0,
        status: formData.status,
        saldo_atual: 0,
      })
      setIsSheetOpen(false)
      setFormData({ ...formData, fornecedor: '', identificacao: '', valor: '' })
      toast.success('Movimentação registrada com sucesso')
      setPage(1)
      loadData()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClear = () => {
    const reset = { dateFrom: '', dateTo: '', type: 'Todos' }
    setFilters(reset)
    setAppliedFilters(reset)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movimentação Bancária — Inter</h1>
          <p className="text-muted-foreground mt-2">
            Controle de entradas e saídas da conta principal
          </p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Nova Movimentação
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Nova Movimentação - Inter</SheetTitle>
              <SheetDescription>Registre uma nova entrada ou saída na conta.</SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Data</Label>
                <Input
                  type="date"
                  required
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Fornecedor / Descrição</Label>
                <Input
                  required
                  value={formData.fornecedor}
                  onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Identificação</Label>
                <Input
                  value={formData.identificacao}
                  onChange={(e) => setFormData({ ...formData, identificacao: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(v) => setFormData({ ...formData, tipo: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credito">Crédito</SelectItem>
                    <SelectItem value="debito">Débito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valor (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processado">Processado</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <SheetClose asChild>
                  <Button variant="outline" type="button">
                    Cancelar
                  </Button>
                </SheetClose>
                <Button type="submit" disabled={isSubmitting}>
                  Salvar
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <FinanceiroNav />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Créditos</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-[#0d9488]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.creditos)}</div>
            <p className="text-xs text-muted-foreground">Filtro atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Débitos</CardTitle>
            <ArrowDownRight className="w-4 h-4 text-[#dc2626]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.debitos)}</div>
            <p className="text-xs text-muted-foreground">Filtro atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.saldoLiquido)}</div>
            <p className="text-xs text-muted-foreground">Filtro atual (Líquido)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Saldo Projetado</CardTitle>
            <LineChart className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.saldoLiquido * 1.1)}</div>
            <p className="text-xs text-muted-foreground">Estimativa</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
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
                  <SelectItem value="Crédito">Crédito</SelectItem>
                  <SelectItem value="Débito">Débito</SelectItem>
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
                  <TableHead className="text-brand-navy font-semibold">
                    Fornecedor / Descrição
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold">Identificação</TableHead>
                  <TableHead className="text-brand-navy font-semibold text-right">
                    Débito (R$)
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold text-right">
                    Crédito (R$)
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold text-right">
                    Saldo Atual (R$)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
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
                      <TableCell>{format(new Date(t.data), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="font-medium">{t.fornecedor}</TableCell>
                      <TableCell className="text-muted-foreground">{t.identificacao}</TableCell>
                      <TableCell className="text-right text-[#dc2626]">
                        {t.debito > 0 ? formatCurrency(t.debito) : '-'}
                      </TableCell>
                      <TableCell className="text-right text-[#0d9488]">
                        {t.credito > 0 ? formatCurrency(t.credito) : '-'}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            t.status === 'processado' &&
                              'bg-green-100 text-green-800 border-green-200',
                            t.status === 'pendente' &&
                              'bg-yellow-100 text-yellow-800 border-yellow-200',
                            t.status === 'cancelado' &&
                              'bg-slate-100 text-slate-800 border-slate-200',
                          )}
                        >
                          {statusMap[t.status as keyof typeof statusMap] || t.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(t.saldo_atual || 0)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              {!isLoading && !hasError && paginatedData.length > 0 && (
                <TableFooter className="bg-slate-100 font-semibold text-slate-800">
                  <TableRow>
                    <TableCell colSpan={3} className="text-right text-brand-navy">
                      Total:
                    </TableCell>
                    <TableCell className="text-right text-[#dc2626]">
                      {formatCurrency(totals.debitos)}
                    </TableCell>
                    <TableCell className="text-right text-[#0d9488]">
                      {formatCurrency(totals.creditos)}
                    </TableCell>
                    <TableCell colSpan={1} className="text-right text-brand-navy">
                      Saldo Final:
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(totals.saldoLiquido)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </div>

          {!isLoading && !hasError && paginatedData.length === 0 && (
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
