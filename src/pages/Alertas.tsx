import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAlertas } from '@/hooks/useAlertas'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Clock,
  X,
  Eye,
  EyeOff,
  FileText,
  ArrowRight,
  Layers,
  BellRing,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

const AlertIcon = ({ tipo, className }: { tipo: string; className?: string }) => {
  switch (tipo) {
    case 'VENCIDO':
      return <ShieldAlert className={className} />
    case 'PROXIMO_VENCIMENTO':
      return <Clock className={className} />
    case 'SEM_ATUALIZACAO':
      return <AlertTriangle className={className} />
    case 'AGUARDANDO_RELATORIO':
      return <FileText className={className} />
    case 'DUPLICADO':
      return <Layers className={className} />
    default:
      return <BellRing className={className} />
  }
}

const formatTipo = (tipo: string) => {
  return tipo
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ')
}

const getActionText = (tipo: string) => {
  switch (tipo) {
    case 'VENCIDO':
      return 'Atualizar Status'
    case 'PROXIMO_VENCIMENTO':
      return 'Adicionar Posição'
    case 'SEM_ATUALIZACAO':
      return 'Atualizar Status'
    case 'AGUARDANDO_RELATORIO':
      return 'Enviar Relatório'
    case 'DUPLICADO':
      return 'Ver Processo Relacionado'
    default:
      return 'Ver Processo'
  }
}

export default function Alertas() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const {
    alertas,
    loading,
    dismissedIds,
    showDismissed,
    dismissAlert,
    toggleShowDismissed,
    refresh,
  } = useAlertas()

  const [supervisores, setSupervisores] = useState<any[]>([])
  const [seguradoras, setSeguradoras] = useState<any[]>([])

  const [filtroTipo, setFiltroTipo] = useState<string>('ALL')
  const [filtroSupervisor, setFiltroSupervisor] = useState<string>('ALL')
  const [filtroSeguradora, setFiltroSeguradora] = useState<string>('ALL')
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [usersRes, segRes] = await Promise.all([
          pb
            .collection('users')
            .getFullList({ filter: "role='supervisor' || role='admin' || role='c-level'" }),
          pb.collection('seguradoras').getFullList(),
        ])
        setSupervisores(usersRes)
        setSeguradoras(segRes)
      } catch (err) {
        console.error('Erro ao carregar filtros', err)
      }
    }
    fetchFilters()
  }, [])

  const filteredAlertas = useMemo(() => {
    return alertas.filter((a) => {
      if (!showDismissed && dismissedIds.includes(a.id)) return false
      if (filtroTipo !== 'ALL' && a.tipo !== filtroTipo) return false
      if (filtroSupervisor !== 'ALL' && a.supervisorId !== filtroSupervisor) return false
      if (filtroSeguradora !== 'ALL' && a.seguradoraId !== filtroSeguradora) return false
      return true
    })
  }, [alertas, dismissedIds, showDismissed, filtroTipo, filtroSupervisor, filtroSeguradora])

  const activeAlertasCount = alertas.filter((a) => !dismissedIds.includes(a.id)).length
  const vencidosCount = alertas.filter(
    (a) => a.tipo === 'VENCIDO' && !dismissedIds.includes(a.id),
  ).length
  const proximosCount = alertas.filter(
    (a) => a.tipo === 'PROXIMO_VENCIMENTO' && !dismissedIds.includes(a.id),
  ).length
  const semAttCount = alertas.filter(
    (a) => a.tipo === 'SEM_ATUALIZACAO' && !dismissedIds.includes(a.id),
  ).length

  const totalPages = Math.ceil(filteredAlertas.length / itemsPerPage)
  const paginatedAlertas = filteredAlertas.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  useEffect(() => {
    setPage(1)
  }, [filtroTipo, filtroSupervisor, filtroSeguradora, showDismissed])

  if (user && !['c-level', 'admin', 'supervisor'].includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
        <ShieldAlert className="w-16 h-16 text-muted-foreground mb-4 opacity-20" />
        <h2 className="text-2xl font-bold tracking-tight">Acesso Negado</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Você não tem permissão para visualizar o dashboard de alertas.
        </p>
      </div>
    )
  }

  const handleAction = (alerta: any) => {
    switch (alerta.tipo) {
      case 'VENCIDO':
      case 'SEM_ATUALIZACAO':
        navigate(`/processos/${alerta.processoId}?action=status`)
        break
      case 'PROXIMO_VENCIMENTO':
        navigate(`/processos/${alerta.processoId}?action=posicao`)
        break
      case 'AGUARDANDO_RELATORIO':
        navigate(`/processos/${alerta.processoId}?action=relatorio`)
        break
      case 'DUPLICADO':
        if (alerta.relacionadoId) navigate(`/processos/${alerta.relacionadoId}`)
        else navigate(`/processos/${alerta.processoId}`)
        break
      default:
        navigate(`/processos/${alerta.processoId}`)
    }
  }

  const clearFilters = () => {
    setFiltroTipo('ALL')
    setFiltroSupervisor('ALL')
    setFiltroSeguradora('ALL')
  }

  return (
    <div className="w-full px-4 md:px-8 py-6 md:py-8 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Alertas de Processos</h1>
          <p className="text-muted-foreground mt-1">Acompanhamento de processos críticos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={toggleShowDismissed} className="h-9">
            {showDismissed ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showDismissed ? 'Ocultar Descartados' : 'Mostrar Descartados'}
          </Button>
          <Button variant="outline" size="icon" onClick={refresh} className="h-9 w-9">
            <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Alertas</CardDescription>
            <CardTitle className="text-3xl">{activeAlertasCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-primary mr-1 font-medium">Ativos</span> no momento
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Vencidos</CardDescription>
            <CardTitle className="text-3xl text-red-600 dark:text-red-500">
              {vencidosCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center">
              <ShieldAlert className="w-3 h-3 mr-1 text-red-500" /> Requer ação imediata
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Próximos do Vencimento</CardDescription>
            <CardTitle className="text-3xl text-orange-600 dark:text-orange-500">
              {proximosCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="w-3 h-3 mr-1 text-orange-500" /> Vencem em até 3 dias
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sem Atualização</CardDescription>
            <CardTitle className="text-3xl text-yellow-600 dark:text-yellow-500">
              {semAttCount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1 text-yellow-500" /> Mais de 3 dias
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-end md:items-center gap-4">
          <div className="space-y-1 w-full md:w-auto flex-1">
            <label className="text-xs font-medium text-muted-foreground">Tipo de Alerta</label>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os Tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os Tipos</SelectItem>
                <SelectItem value="VENCIDO">Vencido</SelectItem>
                <SelectItem value="PROXIMO_VENCIMENTO">Próximo do Vencimento</SelectItem>
                <SelectItem value="SEM_ATUALIZACAO">Sem Atualização</SelectItem>
                <SelectItem value="AGUARDANDO_RELATORIO">Aguardando Relatório</SelectItem>
                <SelectItem value="DUPLICADO">Placa Duplicada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(user?.role === 'c-level' || user?.role === 'admin') && (
            <div className="space-y-1 w-full md:w-auto flex-1">
              <label className="text-xs font-medium text-muted-foreground">Supervisor</label>
              <Select value={filtroSupervisor} onValueChange={setFiltroSupervisor}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os Supervisores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos os Supervisores</SelectItem>
                  {supervisores.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name || s.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1 w-full md:w-auto flex-1">
            <label className="text-xs font-medium text-muted-foreground">Seguradora</label>
            <Select value={filtroSeguradora} onValueChange={setFiltroSeguradora}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as Seguradoras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas as Seguradoras</SelectItem>
                {seguradoras.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-auto shrink-0 pt-5">
            <Button variant="secondary" onClick={clearFilters} className="w-full">
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {loading && filteredAlertas.length === 0 ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          ))
        ) : filteredAlertas.length === 0 ? (
          <Card className="border-dashed bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold">Nenhum alerta no momento</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                {showDismissed ||
                filtroTipo !== 'ALL' ||
                filtroSupervisor !== 'ALL' ||
                filtroSeguradora !== 'ALL'
                  ? 'Nenhum alerta corresponde aos filtros selecionados.'
                  : 'Todos os processos estão em dia! Continue com o bom trabalho.'}
              </p>
              {(filtroTipo !== 'ALL' ||
                filtroSupervisor !== 'ALL' ||
                filtroSeguradora !== 'ALL') && (
                <Button variant="outline" className="mt-6" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          paginatedAlertas.map((alerta) => (
            <Card
              key={alerta.id}
              className={cn(
                'border-l-4 transition-all hover:shadow-md overflow-hidden',
                alerta.corBorda,
                dismissedIds.includes(alerta.id) &&
                  'opacity-60 grayscale hover:opacity-100 hover:grayscale-0',
              )}
            >
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex items-start gap-4 flex-1 w-full">
                  <div
                    className={cn(
                      'p-3 rounded-full shrink-0 flex items-center justify-center',
                      alerta.corFundo,
                      alerta.corTexto,
                    )}
                  >
                    <AlertIcon tipo={alerta.tipo} className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-lg">{alerta.numeroProcesso}</span>
                      <Badge
                        variant="outline"
                        className={cn('bg-background', alerta.corTexto, alerta.corBorda)}
                      >
                        {formatTipo(alerta.tipo)}
                      </Badge>
                      {dismissedIds.includes(alerta.id) && (
                        <Badge variant="secondary">Descartado</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {alerta.mensagem}
                    </p>
                    <div className="flex items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Supervisor:</span>
                        {alerta.expand?.supervisor_id?.name || 'N/A'}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Seguradora:</span>
                        {alerta.expand?.seguradora_id?.nome || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 justify-end">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full sm:w-auto shadow-sm"
                    onClick={() => handleAction(alerta)}
                  >
                    {getActionText(alerta.tipo)}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {!dismissedIds.includes(alerta.id) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-9 w-9 hover:bg-muted"
                      onClick={() => dismissAlert(alerta.id)}
                      title="Descartar alerta temporariamente"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t mt-6">
            <p className="text-sm text-muted-foreground">
              Mostrando{' '}
              <span className="font-medium text-foreground">{(page - 1) * itemsPerPage + 1}</span>{' '}
              até{' '}
              <span className="font-medium text-foreground">
                {Math.min(page * itemsPerPage, filteredAlertas.length)}
              </span>{' '}
              de <span className="font-medium text-foreground">{filteredAlertas.length}</span>{' '}
              alertas
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
