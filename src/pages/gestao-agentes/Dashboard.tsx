import { useMemo, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAgenteStats } from '@/hooks/useAgenteStats'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { ActivityLogs } from '@/components/gestao-agentes/ActivityLogs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
} from '@/components/ui/table'
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import {
  FolderKanban,
  Clock,
  Percent,
  ListTodo,
  TrendingUp,
  TrendingDown,
  Minus,
  GraduationCap,
  MessageSquare,
  FileSearch,
  Download,
} from 'lucide-react'
import { format } from 'date-fns'

export default function GestaoAgentesDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedAgenteId = searchParams.get('agenteId') || 'all'

  const { stats, loading } = useAgenteStats(selectedAgenteId)
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const isManager = ['c-level', 'admin', 'supervisor'].includes(user?.role || '')

  const [agentesList, setAgentesList] = useState<any[]>([])
  const [targetUserId, setTargetUserId] = useState<string | null>(null)

  useEffect(() => {
    if (isManager) {
      pb.collection('agentes')
        .getFullList({ sort: 'nomeCompleto', filter: 'ativo="Sim"' })
        .then(setAgentesList)
        .catch(console.error)
    }
  }, [isManager])

  useEffect(() => {
    if (isManager && selectedAgenteId && selectedAgenteId !== 'all') {
      pb.collection('agentes')
        .getOne(selectedAgenteId)
        .then((a) => setTargetUserId(a.user_id))
        .catch(() => setTargetUserId(null))
    } else if (!isManager) {
      setTargetUserId(user?.id || null)
    }
  }, [isManager, selectedAgenteId, user?.id])

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Bom dia'
    if (hour >= 12 && hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }, [])

  const handleAgentChange = (val: string) => {
    if (val === 'all') {
      searchParams.delete('agenteId')
    } else {
      searchParams.set('agenteId', val)
    }
    setSearchParams(searchParams)
  }

  const handleExport = () => {
    if (!stats) return

    const isGlobal = isManager && selectedAgenteId === 'all'
    const contextName = isGlobal ? 'Todos os Agentes' : stats.agenteName

    const lines = [
      'RELATORIO DE DESEMPENHO - DASHBOARD',
      `Contexto: ${contextName}`,
      `Data de Geracao: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`,
      '',
      '--- INDICADORES PRINCIPAIS ---',
      `Total de Processos: ${stats.totalProcessos}`,
      `Em Andamento: ${stats.emAndamentoCount}`,
      `Concluidos este Mes: ${stats.concluidosMesCount}`,
      `Taxa de Conclusao: ${stats.taxaConclusao.toFixed(1)}%`,
      `Tempo Medio de Resolucao: ${stats.tempoMedioHoras.toFixed(1)}h`,
      '',
      '--- DISTRIBUICAO POR STATUS ---',
      'Status,Quantidade',
      ...stats.statusChart.map((s) => `${s.name},${s.value}`),
    ]

    const csvContent = lines.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `dashboard_export_${format(new Date(), 'yyyyMMdd_HHmm')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: 'Relatório gerado com sucesso!',
      description: 'O download foi iniciado.',
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-12 w-64" />
          {isManager && <Skeleton className="h-11 w-[250px] rounded-xl" />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[300px] w-full rounded-2xl col-span-1" />
          <Skeleton className="h-[300px] w-full rounded-2xl lg:col-span-2" />
        </div>
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    )
  }

  const isEmpty = !stats || stats.totalProcessos === 0

  const getTitle = () => {
    if (isManager) {
      if (selectedAgenteId === 'all') return 'Dashboard Global'
      return `Desempenho: ${stats?.agenteName || 'Agente'}`
    }
    return `${greeting}, ${user?.name?.split(' ')[0] || 'Usuário'}`
  }

  const getSubtitle = () => {
    if (isManager && selectedAgenteId === 'all') {
      return 'Visão geral do desempenho de todos os agentes.'
    }
    return 'Acompanhe seu desempenho e gerencie seus processos.'
  }

  const renderTrendIcon = (trend: 'up' | 'down' | 'neutral', reverseGood = false) => {
    if (trend === 'neutral') return <Minus className="w-4 h-4 text-muted-foreground" />
    const isGood = reverseGood ? trend === 'down' : trend === 'up'
    const color = isGood ? 'text-green-500' : 'text-red-500'
    if (trend === 'up') return <TrendingUp className={`w-4 h-4 ${color}`} />
    return <TrendingDown className={`w-4 h-4 ${color}`} />
  }

  const pieConfig = { value: { label: 'Processos' } }
  const lineConfig = { concluidos: { label: 'Concluídos', color: '#2bc8cf' } }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#282c59]">{getTitle()}</h1>
          <p className="text-muted-foreground mt-1">{getSubtitle()}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isManager && (
            <Select value={selectedAgenteId} onValueChange={handleAgentChange}>
              <SelectTrigger className="w-full md:w-[280px] bg-card border-border h-11 shadow-sm rounded-xl">
                <SelectValue placeholder="Selecione um Agente" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">Todos os Agentes</SelectItem>
                {agentesList.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.nomeCompleto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button
            onClick={handleExport}
            variant="outline"
            className="h-11 rounded-xl shadow-sm border-border bg-card hover:bg-muted"
            disabled={!stats}
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Resumo
          </Button>
        </div>
      </div>

      {isEmpty ? (
        <Card className="border-border shadow-sm rounded-2xl bg-card">
          <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <FileSearch className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-bold text-[#282c59] mb-2">
              Nenhum processo atribuído ainda
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              {isManager && selectedAgenteId !== 'all'
                ? 'Este agente não possui nenhum processo atribuído no momento.'
                : 'Assim que um novo processo for encaminhado para você, ele aparecerá aqui no seu painel.'}
            </p>
            {!isManager && (
              <Button
                onClick={() => navigate('/gestao-agentes/treinamentos')}
                className="rounded-xl"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Acessar Treinamentos
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/gestao-agentes/processos?status=em_andamento" className="block h-full">
              <Card className="border-border shadow-sm rounded-2xl bg-card hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                        Processos em Andamento
                      </p>
                      <h3 className="text-3xl font-bold text-[#282c59]">
                        {stats.emAndamentoCount}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#00A8B5]/10 flex items-center justify-center">
                      <ListTodo className="w-6 h-6 text-[#00A8B5]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link
              to="/gestao-agentes/processos?status=concluido&mes=atual"
              className="block h-full"
            >
              <Card className="border-border shadow-sm rounded-2xl bg-card hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                        Concluídos este Mês
                      </p>
                      <h3 className="text-3xl font-bold text-[#282c59]">
                        {stats.concluidosMesCount}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#2bc8cf]/20 flex items-center justify-center">
                      <FolderKanban className="w-6 h-6 text-[#2bc8cf]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="border-border shadow-sm rounded-2xl bg-card h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                      Taxa de Conclusão
                    </p>
                    <h3 className="text-3xl font-bold text-[#282c59]">
                      {stats.taxaConclusao.toFixed(1)}%
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5 text-sm font-medium">
                      {renderTrendIcon(stats.taxaConclusaoTrend)}
                      <span className="text-muted-foreground text-xs font-normal">
                        vs período anterior
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Percent className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm rounded-2xl bg-card h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[14px] font-semibold text-muted-foreground mb-1">
                      Tempo Médio
                    </p>
                    <h3 className="text-3xl font-bold text-[#282c59]">
                      {stats.tempoMedioHoras.toFixed(1)}h
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5 text-sm font-medium">
                      {renderTrendIcon(stats.tempoMedioTrend, true)}
                      <span className="text-muted-foreground text-xs font-normal">
                        vs período anterior
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 rounded-2xl border-border shadow-sm bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Status dos Processos</CardTitle>
                <CardDescription>Distribuição geral da sua esteira</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={pieConfig} className="h-[250px] w-full pb-4">
                  <PieChart>
                    <Pie
                      data={stats.statusChart}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {stats.statusChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 rounded-2xl border-border shadow-sm bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Evolução de Conclusões</CardTitle>
                <CardDescription>Processos concluídos nos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={lineConfig} className="h-[250px] w-full">
                  <LineChart data={stats.trendChart}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="concluidos"
                      stroke="#2bc8cf"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#2bc8cf' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              variant="outline"
              className="rounded-xl h-12 px-6 shadow-sm border-border"
            >
              <Link to="/gestao-agentes/processos">
                <FolderKanban className="w-4 h-4 mr-2 text-primary" />
                <span className="font-semibold">Ver Todos os Processos</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl h-12 px-6 shadow-sm border-border"
            >
              <Link to="/gestao-agentes/treinamentos">
                <GraduationCap className="w-4 h-4 mr-2 text-primary" />
                <span className="font-semibold">Acessar Treinamentos</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl h-12 px-6 shadow-sm border-border relative"
            >
              <Link to="/gestao-agentes/mensagens">
                <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                <span className="font-semibold">Mensagens</span>
                {stats.unreadMessages > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                    {stats.unreadMessages}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border p-6">
              <CardTitle className="text-lg font-bold">Processos Recentes</CardTitle>
              <CardDescription>Últimas 5 demandas na esteira</CardDescription>
            </CardHeader>
            <div className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-transparent hover:bg-transparent">
                    <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                      Processo
                    </TableHead>
                    <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                      Prazo
                    </TableHead>
                    <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                      Prioridade
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentes.map((p) => (
                    <TableRow
                      key={p.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors h-16"
                      onClick={() => navigate(`/gestao-agentes/processos/${p.id}`)}
                    >
                      <TableCell className="font-bold text-[#282c59]">
                        {p.numero_processo || p.numero_controle}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            p.status.includes('concluido') || p.status.includes('finalizado')
                              ? 'success'
                              : p.status.includes('pendente') || p.status.includes('bloqueado')
                                ? 'warning'
                                : 'default'
                          }
                          className="px-3 py-1 font-bold shadow-sm"
                        >
                          {p.status.replace(/_/g, ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-muted-foreground">
                        {p.data_prazo ? format(new Date(p.data_prazo), 'dd/MM/yyyy') : '-'}
                      </TableCell>
                      <TableCell className="font-medium text-muted-foreground capitalize">
                        {p.prioridade || 'Normal'}
                      </TableCell>
                    </TableRow>
                  ))}
                  {stats.recentes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        Nenhum registro recente encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </>
      )}

      <ActivityLogs targetUserId={targetUserId} global={isManager && selectedAgenteId === 'all'} />
    </div>
  )
}
