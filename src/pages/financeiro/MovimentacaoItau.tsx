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

const statusMapItau = {
  pendente_devolucao: 'Pendente Devolução',
  devolvido: 'Devolvido',
  cancelado: 'Cancelado',
}

export default function MovimentacaoItau() {
  const { user } = useAuth()
  const [paginatedData, setPaginatedData] = useState<any[]>([])
  const [cLevels, setCLevels] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const [filters, setFilters] = useState({
    dateFrom: format(startOfMonth, 'yyyy-MM-dd'),
    dateTo: format(endOfMonth, 'yyyy-MM-dd'),
    cLevel: 'Todos',
    type: 'Todos',
  })
  const [appliedFilters, setAppliedFilters] = useState(filters)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [totals, setTotals] = useState({
    retiradas: 0,
    devolucoes: 0,
    saldoLiquido: 0,
    pendente: 0,
  })

  const [formData, setFormData] = useState({
    data_retirada: format(new Date(), 'yyyy-MM-dd'),
    c_level_id: '',
    tipo: 'retirada',
    valor: '',
    motivo: '',
    status: 'pendente_devolucao',
    data_devolucao: '',
  })

  useEffect(() => {
    pb.collection('users')
      .getFullList({ filter: "role = 'c-level' || role = 'admin'" })
      .then(setCLevels)
      .catch(() => {})
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    setHasError(false)
    try {
      const filterParts = []
      if (appliedFilters.dateFrom)
        filterParts.push(`data_retirada >= '${appliedFilters.dateFrom} 00:00:00'`)
      if (appliedFilters.dateTo)
        filterParts.push(`data_retirada <= '${appliedFilters.dateTo} 23:59:59'`)
      if (appliedFilters.cLevel !== 'Todos')
        filterParts.push(`c_level_id = '${appliedFilters.cLevel}'`)
      if (appliedFilters.type !== 'Todos')
        filterParts.push(`tipo = '${appliedFilters.type.toLowerCase()}'`)
      const filterString = filterParts.join(' && ')

      const [listRes, allRes] = await Promise.all([
        pb.collection('movimentacao_itau').getList(page, 25, {
          filter: filterString,
          sort: '-data_retirada',
          expand: 'c_level_id',
        }),
        pb
          .collection('movimentacao_itau')
          .getFullList({ filter: filterString, fields: 'valor,tipo,status,saldo' }),
      ])

      setPaginatedData(listRes.items)
      setTotalPages(Math.ceil(listRes.totalItems / 25) || 1)

      const retiradas = allRes
        .filter((t: any) => t.tipo === 'retirada' && t.status !== 'cancelado')
        .reduce((a, c) => a + (c.valor || 0), 0)
      const devolucoes = allRes
        .filter((t: any) => t.tipo === 'devolucao')
        .reduce((a, c) => a + (c.valor || 0), 0)
      const pendente = allRes
        .filter((t: any) => t.status === 'pendente_devolucao')
        .reduce((a, c) => a + (c.saldo || c.valor || 0), 0)

      setTotals({ retiradas, devolucoes, saldoLiquido: retiradas - devolucoes, pendente })
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

  useRealtime('movimentacao_itau', () => {
    loadData()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (new Date(formData.data_retirada) > new Date()) {
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
      await pb.collection('movimentacao_itau').create({
        user_id: user?.id,
        c_level_id: formData.c_level_id,
        data_retirada: new Date(formData.data_retirada + 'T12:00:00').toISOString(),
        tipo: formData.tipo,
        valor: val,
        motivo: formData.motivo,
        status: formData.status,
        data_devolucao: formData.data_devolucao
          ? new Date(formData.data_devolucao + 'T12:00:00').toISOString()
          : null,
        saldo: formData.tipo === 'retirada' && formData.status === 'pendente_devolucao' ? val : 0,
      })
      setIsSheetOpen(false)
      setFormData({ ...formData, motivo: '', valor: '' })
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
    const reset = { dateFrom: '', dateTo: '', cLevel: 'Todos', type: 'Todos' }
    setFilters(reset)
    setAppliedFilters(reset)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movimentação Bancária — Itaú</h1>
          <p className="text-muted-foreground mt-2">
            Controle de retiradas e devoluções de C-Level
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
              <SheetTitle>Nova Movimentação - Itaú</SheetTitle>
              <SheetDescription>Registre uma retirada ou devolução de C-Level.</SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Data</Label>
                <Input
                  type="date"
                  required
                  value={formData.data_retirada}
                  onChange={(e) => setFormData({ ...formData, data_retirada: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>C-Level</Label>
                <Select
                  required
                  value={formData.c_level_id}
                  onValueChange={(v) => setFormData({ ...formData, c_level_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cLevels.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name || c.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    <SelectItem value="retirada">Retirada</SelectItem>
                    <SelectItem value="devolucao">Devolução</SelectItem>
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
                <Label>Motivo</Label>
                <Input
                  required
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
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
                    <SelectItem value="pendente_devolucao">Pendente Devolução</SelectItem>
                    <SelectItem value="devolvido">Devolvido</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.status === 'devolvido' && (
                <div className="space-y-2">
                  <Label>Data de Devolução</Label>
                  <Input
                    type="date"
                    value={formData.data_devolucao}
                    onChange={(e) => setFormData({ ...formData, data_devolucao: e.target.value })}
                  />
                </div>
              )}
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
            <CardTitle className="text-sm font-medium">Total Retiradas</CardTitle>
            <ArrowUpRight className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.retiradas)}</div>
            <p className="text-xs text-muted-foreground">Filtro atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Devoluções</CardTitle>
            <ArrowDownRight className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.devolucoes)}</div>
            <p className="text-xs text-muted-foreground">Filtro atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.saldoLiquido)}</div>
            <p className="text-xs text-muted-foreground">Filtro atual</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pendente Devolução</CardTitle>
            <AlertCircle className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.pendente)}</div>
            <p className="text-xs text-muted-foreground">Filtro atual</p>
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
                  {cLevels.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name || c.email}
                    </SelectItem>
                  ))}
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
                      <TableCell>{format(new Date(t.data_retirada), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        {t.expand?.c_level_id?.name || t.expand?.c_level_id?.email || '-'}
                      </TableCell>
                      <TableCell
                        className={cn(
                          'font-medium',
                          t.tipo === 'retirada' ? 'text-[#f97316]' : 'text-[#0d9488]',
                        )}
                      >
                        {t.tipo === 'retirada' ? 'Retirada' : 'Devolução'}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(t.valor)}
                      </TableCell>
                      <TableCell>{t.motivo}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            t.status === 'pendente_devolucao' &&
                              'bg-yellow-100 text-yellow-800 border-yellow-200',
                            t.status === 'devolvido' &&
                              'bg-green-100 text-green-800 border-green-200',
                            t.status === 'cancelado' &&
                              'bg-slate-100 text-slate-800 border-slate-200',
                          )}
                        >
                          {statusMapItau[t.status as keyof typeof statusMapItau] || t.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {t.data_devolucao ? format(new Date(t.data_devolucao), 'dd/MM/yyyy') : '-'}
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(t.saldo || 0)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              {!isLoading && !hasError && paginatedData.length > 0 && (
                <TableFooter className="bg-slate-100 font-semibold text-slate-800">
                  <TableRow>
                    <TableCell colSpan={3} className="text-right text-brand-navy">
                      Total Retiradas:
                    </TableCell>
                    <TableCell className="text-right text-[#f97316]">
                      {formatCurrency(totals.retiradas)}
                    </TableCell>
                    <TableCell colSpan={3} className="text-right text-brand-navy">
                      Total Devoluções:
                    </TableCell>
                    <TableCell className="text-right text-[#0d9488]">
                      {formatCurrency(totals.devolucoes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7} className="text-right text-brand-navy">
                      Saldo Líquido:
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
