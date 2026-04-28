import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useFinanceiroDashboard } from '@/hooks/useFinanceiroDashboard'
import { FinanceiroNav } from '@/pages/financeiro/components/FinanceiroNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  FileWarning,
  Target,
  Users,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'emitida':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200'
    case 'enviada':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200'
    case 'paga':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200'
    case 'cancelada':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200'
  }
}

export default function DashboardFinanceiro() {
  const { user } = useAuth()
  const { data, loading } = useFinanceiroDashboard()
  const navigate = useNavigate()

  if (user && !['c-level', 'admin'].includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-brand-navy dark:text-white">
          Dashboard Financeiro
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral de receitas e faturamento.</p>
      </div>

      <FinanceiroNav />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8 mt-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Faturado Mês
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-navy dark:text-white">
                  {formatCurrency(data.faturadoMes)}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Receita Recebida
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(data.receitaRecebida)}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  A Receber
                </CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {formatCurrency(data.aReceber)}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Inadimplência
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(data.inadimplencia)}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:col-span-4 mb-4">
              <Card
                className="hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20 cursor-pointer"
                onClick={() => navigate('/financeiro/metas')}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-brand-navy dark:text-white">
                    Metas do Mês (Globais)
                  </CardTitle>
                  <Target className="h-5 w-5 text-indigo-500" />
                </CardHeader>
                <CardContent>
                  {!data.metasGerais ? (
                    <div className="text-sm text-muted-foreground mt-4">
                      Nenhuma meta configurada para este período.
                    </div>
                  ) : (
                    <div className="space-y-4 mt-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Receita ({formatCurrency(data.metasGerais.receitaAtual)})</span>
                          <span>{data.metasGerais.receitaPct.toFixed(1)}%</span>
                        </div>
                        <Progress
                          value={Math.min(data.metasGerais.receitaPct, 100)}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Custo ({formatCurrency(data.metasGerais.custoAtual)})</span>
                          <span>{data.metasGerais.custoPct.toFixed(1)}%</span>
                        </div>
                        <Progress
                          value={Math.min(data.metasGerais.custoPct, 100)}
                          className="h-2 bg-secondary"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-md transition-shadow border bg-white dark:bg-brand-navy/80 dark:border-brand-cyan/20 cursor-pointer"
                onClick={() => navigate('/financeiro/metas?tab=individuais')}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-brand-navy dark:text-white">
                    Top 3 Metas Individuais
                  </CardTitle>
                  <Users className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  {data.topIndividuais.length === 0 ? (
                    <div className="text-sm text-muted-foreground mt-4">
                      Nenhuma meta individual em andamento.
                    </div>
                  ) : (
                    <div className="space-y-4 mt-2">
                      {data.topIndividuais.map((ind) => (
                        <div key={ind.id}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium truncate max-w-[120px]">{ind.nome}</span>
                            <span>{ind.progresso.toFixed(1)}%</span>
                          </div>
                          <Progress value={ind.progresso} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Link
              to="/processos/alertas?tipo=PENDENTE_DOCUMENTOS"
              className="block md:col-span-2 lg:col-span-4"
            >
              <Card className="hover:shadow-md transition-shadow border bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-orange-800 dark:text-orange-300">
                    Processos Pendentes de Documentos
                  </CardTitle>
                  <FileWarning className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                  <div>
                    <div className="text-3xl font-black text-orange-600 dark:text-orange-400">
                      {data.pendentesDocumentos.count}
                    </div>
                    <p className="text-xs text-orange-700 dark:text-orange-400/80 font-medium">
                      Aguardando Recebimento
                    </p>
                  </div>
                  <div className="border-l border-orange-200 dark:border-orange-800/50 pl-6">
                    <div className="text-xl font-bold text-orange-700 dark:text-orange-300">
                      {data.pendentesDocumentos.avgDays}{' '}
                      <span className="text-sm font-medium">dias</span>
                    </div>
                    <p className="text-xs text-orange-700 dark:text-orange-400/80 font-medium">
                      Idade Média (Atraso)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-brand-navy/80 border border-border dark:border-brand-cyan/20 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border dark:border-brand-cyan/20">
          <h2 className="text-lg font-bold text-brand-navy dark:text-white">
            Últimas Notas Fiscais
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b border-border dark:border-brand-cyan/20">
              <tr>
                <th className="p-4 font-medium uppercase">Número</th>
                <th className="p-4 font-medium uppercase">Cliente</th>
                <th className="p-4 font-medium text-right uppercase">Valor</th>
                <th className="p-4 font-medium uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 border-border dark:border-brand-cyan/10"
                  >
                    <td className="p-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-40" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                  </tr>
                ))
              ) : data.recentes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    Nenhuma nota fiscal recente encontrada.
                  </td>
                </tr>
              ) : (
                data.recentes.map((nota: any) => (
                  <tr
                    key={nota.id}
                    className="border-b border-border dark:border-brand-cyan/10 transition-colors hover:bg-muted/30 even:bg-muted/50 dark:even:bg-black/10"
                  >
                    <td className="p-4 font-medium text-brand-navy dark:text-gray-200">
                      {nota.numero_nf}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {nota.expand?.cliente_id?.razao_social ||
                        nota.expand?.cliente_id?.nome ||
                        '-'}
                    </td>
                    <td className="p-4 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(nota.valor_total || 0)}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={`font-medium capitalize ${getStatusBadge(nota.status)}`}
                      >
                        {nota.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
