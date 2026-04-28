import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle2,
} from 'lucide-react'

export function PerformanceCards({ data }: { data: any }) {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const renderTrend = (val: number, inverse = false) => {
    const isPositive = val >= 0
    const isGood = inverse ? !isPositive : isPositive
    const Icon = isPositive ? ArrowUpRight : ArrowDownRight
    return (
      <span
        className={`flex items-center text-xs mt-1 font-medium ${isGood ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}
      >
        <Icon className="mr-1 h-3.5 w-3.5" />
        {Math.abs(val)}% vs mês anterior
      </span>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.receita)}</div>
          {renderTrend(data.varReceita)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Custo Total</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(data.custo)}</div>
          {renderTrend(data.varCusto, true)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Margem Líquida
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.margem}%</div>
          {renderTrend(data.varMargem)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Processos Concluídos
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.processos}</div>
          {renderTrend(data.varProcessos)}
        </CardContent>
      </Card>
    </div>
  )
}
