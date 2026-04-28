import React, { useState, useEffect, useMemo } from 'react'
import { format, subDays } from 'date-fns'
import { FinanceiroNav } from './components/FinanceiroNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Search,
  RotateCcw,
  Inbox,
  AlertCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Transaction = {
  id: string
  date: string
  description: string
  identification: string
  debit: number
  credit: number
  status: 'Processado' | 'Pendente' | 'Cancelado'
}

const generateMockData = (): Transaction[] => {
  const today = new Date()
  return [
    {
      id: '10',
      date: format(today, 'yyyy-MM-dd'),
      description: 'Zurich Seguros',
      identification: 'DOC-991',
      debit: 0,
      credit: 15000,
      status: 'Processado',
    },
    {
      id: '9',
      date: format(subDays(today, 2), 'yyyy-MM-dd'),
      description: 'Bradesco Saúde',
      identification: 'TED-882',
      debit: 0,
      credit: 8500,
      status: 'Processado',
    },
    {
      id: '8',
      date: format(subDays(today, 3), 'yyyy-MM-dd'),
      description: 'Pagamento Fornecedor A',
      identification: 'PIX-123',
      debit: 1200,
      credit: 0,
      status: 'Processado',
    },
    {
      id: '7',
      date: format(subDays(today, 5), 'yyyy-MM-dd'),
      description: 'Cooperlink',
      identification: 'DOC-773',
      debit: 0,
      credit: 4200,
      status: 'Pendente',
    },
    {
      id: '6',
      date: format(subDays(today, 8), 'yyyy-MM-dd'),
      description: 'Manutenção Servidor',
      identification: 'PIX-124',
      debit: 350,
      credit: 0,
      status: 'Processado',
    },
    {
      id: '5',
      date: format(subDays(today, 12), 'yyyy-MM-dd'),
      description: 'Allianz',
      identification: 'TED-664',
      debit: 0,
      credit: 11200,
      status: 'Processado',
    },
    {
      id: '4',
      date: format(subDays(today, 15), 'yyyy-MM-dd'),
      description: 'Material de Escritório',
      identification: 'PIX-125',
      debit: 800,
      credit: 0,
      status: 'Cancelado',
    },
    {
      id: '3',
      date: format(subDays(today, 18), 'yyyy-MM-dd'),
      description: 'SulAmérica',
      identification: 'DOC-555',
      debit: 0,
      credit: 6700,
      status: 'Processado',
    },
    {
      id: '2',
      date: format(subDays(today, 22), 'yyyy-MM-dd'),
      description: 'Conta de Luz',
      identification: 'BOL-111',
      debit: 450,
      credit: 0,
      status: 'Processado',
    },
    {
      id: '1',
      date: format(subDays(today, 25), 'yyyy-MM-dd'),
      description: 'Liberty Seguros',
      identification: 'TED-446',
      debit: 0,
      credit: 9300,
      status: 'Processado',
    },
  ]
}

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
const formatDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export default function MovimentacaoInter() {
  const [data, setData] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [type, setType] = useState<string>('Todos')
  const [appliedFilters, setAppliedFilters] = useState({
    startDate: '',
    endDate: '',
    type: 'Todos',
  })

  const fetchData = () => {
    setLoading(true)
    setError(false)
    setTimeout(() => {
      setData(generateMockData())
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleFilter = () => setAppliedFilters({ startDate, endDate, type })
  const handleClear = () => {
    setStartDate('')
    setEndDate('')
    setType('Todos')
    setAppliedFilters({ startDate: '', endDate: '', type: 'Todos' })
  }

  const processedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    let currentBalance = 25000 // Mock starting balance

    const withBalance = sorted.map((t) => {
      if (t.status === 'Processado') currentBalance += t.credit - t.debit
      return { ...t, balance: currentBalance }
    })

    return withBalance
      .filter((t) => {
        if (appliedFilters.type === 'Crédito' && t.credit === 0) return false
        if (appliedFilters.type === 'Débito' && t.debit === 0) return false
        if (appliedFilters.startDate && t.date < appliedFilters.startDate) return false
        if (appliedFilters.endDate && t.date > appliedFilters.endDate) return false
        return true
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [data, appliedFilters])

  const totals = useMemo(
    () =>
      processedData.reduce(
        (acc, curr) => ({
          credits: acc.credits + curr.credit,
          debits: acc.debits + curr.debit,
        }),
        { credits: 0, debits: 0 },
      ),
    [processedData],
  )

  const currentMonthTotals = useMemo(() => {
    const today = new Date()
    const startOfMonthStr = format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
    const currentMonthData = data.filter(
      (t) => t.date >= startOfMonthStr && t.status === 'Processado',
    )
    return currentMonthData.reduce(
      (acc, curr) => ({
        credits: acc.credits + curr.credit,
        debits: acc.debits + curr.debit,
      }),
      { credits: 0, debits: 0 },
    )
  }, [data])

  const availableBalance = processedData.length > 0 ? processedData[0].balance : 25000
  const projectedBalance =
    availableBalance + (currentMonthTotals.credits - currentMonthTotals.debits)

  return (
    <div className="p-6 max-w-[1600px] mx-auto w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-brand-navy">
          Movimentação Bancária — Inter
        </h1>
        <p className="text-muted-foreground">Controle de entradas e saídas da conta principal</p>
      </div>

      <FinanceiroNav />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Créditos (mês atual)
            </CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-[#0d9488]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0d9488]">
              {formatCurrency(currentMonthTotals.credits)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Débitos (mês atual)
            </CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-[#dc2626]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#dc2626]">
              {formatCurrency(currentMonthTotals.debits)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Disponível
            </CardTitle>
            <Wallet className="h-4 w-4 text-brand-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-navy">
              {formatCurrency(availableBalance)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo Projetado
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(projectedBalance)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="text-sm font-medium mb-1.5 block text-muted-foreground">De</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="flex-1 w-full">
            <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Até</label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="flex-1 w-full">
            <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Tipo</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Crédito">Crédito</option>
              <option value="Débito">Débito</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              onClick={handleFilter}
              className="flex-1 md:flex-none bg-brand-navy hover:bg-brand-navy/90 text-white"
            >
              <Search className="w-4 h-4 mr-2" /> Filtrar
            </Button>
            <Button variant="outline" onClick={handleClear} className="flex-1 md:flex-none">
              <RotateCcw className="w-4 h-4 mr-2" /> Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border shadow-sm">
        {loading ? (
          <div className="space-y-3 p-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-red-500">
            <AlertCircle className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium mb-4">
              Erro ao carregar movimentação. Tente novamente.
            </p>
            <Button onClick={fetchData} variant="outline">
              Tentar Novamente
            </Button>
          </div>
        ) : processedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center text-muted-foreground">
            <Inbox className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">Nenhuma movimentação neste período</p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="text-brand-navy font-semibold whitespace-nowrap">
                    Data
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold whitespace-nowrap">
                    Fornecedor/Descrição
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold whitespace-nowrap">
                    Identificação
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold text-right whitespace-nowrap">
                    Débito (R$)
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold text-right whitespace-nowrap">
                    Crédito (R$)
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold whitespace-nowrap">
                    Status
                  </TableHead>
                  <TableHead className="text-brand-navy font-semibold text-right whitespace-nowrap">
                    Saldo Atual (R$)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.map((t) => (
                  <TableRow
                    key={t.id}
                    className="even:bg-slate-50 odd:bg-white hover:bg-slate-100 transition-colors group"
                  >
                    <TableCell className="whitespace-nowrap">{formatDate(t.date)}</TableCell>
                    <TableCell className="font-medium text-brand-navy">{t.description}</TableCell>
                    <TableCell className="text-muted-foreground">{t.identification}</TableCell>
                    <TableCell className="text-right text-[#dc2626]">
                      {t.debit > 0 ? formatCurrency(t.debit) : '-'}
                    </TableCell>
                    <TableCell className="text-right text-[#0d9488]">
                      {t.credit > 0 ? formatCurrency(t.credit) : '-'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                          t.status === 'Processado'
                            ? 'bg-green-100 text-green-700'
                            : t.status === 'Pendente'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700',
                        )}
                      >
                        {t.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(t.balance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-slate-50">
                <TableRow>
                  <TableCell colSpan={3} className="font-semibold text-right text-muted-foreground">
                    Totais no período visível:
                  </TableCell>
                  <TableCell className="text-right text-[#dc2626] font-bold">
                    {formatCurrency(totals.debits)}
                  </TableCell>
                  <TableCell className="text-right text-[#0d9488] font-bold">
                    {formatCurrency(totals.credits)}
                  </TableCell>
                  <TableCell className="font-semibold text-right text-muted-foreground">
                    Saldo Resultante:
                  </TableCell>
                  <TableCell className="text-right font-bold text-brand-navy">
                    {formatCurrency(totals.credits - totals.debits)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </Card>
    </div>
  )
}
