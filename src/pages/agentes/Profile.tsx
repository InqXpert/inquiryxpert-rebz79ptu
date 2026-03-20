import { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Car,
  Key,
  Trash,
  Edit,
  Copy,
  Briefcase,
  Star,
  Award,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getAgente, deleteAgente } from '@/services/agentes'
import { fetchProcessos } from '@/services/procesosOperacionais'
import { Agente, ProcessoOperacional } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { EditAgenteModal } from '@/components/agentes/EditAgenteModal'

export default function ProfileAgente() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [p, setP] = useState<Agente | null>(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [processos, setProcessos] = useState<ProcessoOperacional[]>([])
  const [editModalOpen, setEditModalOpen] = useState(false)

  const loadData = useCallback(async () => {
    if (!id) return
    setStatsLoading(true)
    try {
      const data = await getAgente(id)
      setP(data)
      try {
        const procs = await fetchProcessos({ agente_prestador: data.nomeCompleto })
        setProcessos(procs)
      } catch (e) {
        toast({ title: 'Erro ao carregar estatísticas', variant: 'destructive' })
        setProcessos([])
      }
    } catch (err) {
      toast({
        title: 'Erro ao carregar dados.',
        description: 'Agente não encontrado ou erro de rede.',
        variant: 'destructive',
      })
      navigate('/agentes')
    } finally {
      setLoading(false)
      setStatsLoading(false)
    }
  }, [id, navigate, toast])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime('agentes', (e) => {
    if (e.record.id === id) {
      if (e.action === 'delete') navigate('/agentes')
      else loadData()
    }
  })

  useRealtime('processos_operacionais', () => {
    loadData()
  })

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja remover este agente?')) {
      try {
        await deleteAgente(id!)
        toast({ title: 'Removido', description: 'Agente deletado com sucesso.' })
        navigate('/agentes')
      } catch (err) {
        toast({ title: 'Erro', description: 'Falha ao remover.', variant: 'destructive' })
      }
    }
  }

  const stats = useMemo(() => {
    let concluidos = 0,
      emAndamento = 0,
      pendentes = 0
    processos.forEach((pr) => {
      const s = pr.status?.toLowerCase() || ''
      if (['concluído', 'concluido', 'finalizado'].includes(s)) concluidos++
      else if (
        ['em andamento', 'execução', 'execucao', 'em elaboracao', 'analise_inicial'].includes(s)
      )
        emAndamento++
      else pendentes++
    })
    return { total: processos.length, concluidos, emAndamento, pendentes }
  }, [processos])

  if (loading)
    return (
      <div className="space-y-6 pb-10 max-w-[1400px] w-full">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    )

  if (!p)
    return (
      <div className="p-8 text-center text-xl text-muted-foreground">Agente não encontrado.</div>
    )

  const getBadgeClass = (status: string) => {
    const base = 'text-[11px] font-bold px-[8px] py-[4px] rounded-full'
    const s = status.toLowerCase()
    if (s.includes('concluíd') || s.includes('concluid') || s.includes('finaliz'))
      return cn(base, 'bg-green-100 text-green-700')
    if (s.includes('andamento') || s.includes('execuç'))
      return cn(base, 'bg-blue-100 text-blue-700')
    if (s.includes('pendent') || s.includes('aguardando'))
      return cn(base, 'bg-yellow-100 text-yellow-700')
    if (s.includes('pendencia')) return cn(base, 'bg-orange-100 text-orange-700')
    return cn(base, 'bg-muted text-muted-foreground')
  }

  const getKPITextColor = (val?: string) => {
    if (!val) return 'text-muted-foreground'
    if (val.includes('NIVEL 1') || val.includes('ZERO') || val.includes('TREINAMENTO'))
      return 'text-red-600'
    if (val.includes('NIVEL 2') || val.includes('PARCIAL') || val.includes('JUNIOR'))
      return 'text-orange-600'
    if (val.includes('NIVEL 3') || val.includes('ALTO') || val.includes('PLENO'))
      return 'text-blue-600'
    if (val.includes('NIVEL 4') || val.includes('TOTAL') || val.includes('SENIOR'))
      return 'text-green-600'
    return 'text-muted-foreground'
  }

  const recentes = processos.slice(0, 3)

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-[14px] text-muted-foreground hover:text-primary hover:bg-transparent px-0"
          asChild
        >
          <Link to="/agentes">
            <ChevronLeft className="w-4 h-4" />
            Voltar para Agentes
          </Link>
        </Button>
        <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive h-10 px-3 rounded-xl flex-1 sm:flex-none"
            title="Remover"
          >
            <Trash className="w-4 h-4 sm:mr-2" /> <span className="sm:hidden">Remover</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setEditModalOpen(true)}
            className="h-10 px-4 rounded-xl gap-2 font-medium flex-1 sm:flex-none"
          >
            <Edit className="w-4 h-4" /> Editar
          </Button>
          <Button
            className="bg-secondary text-white rounded-xl h-10 px-4 gap-2 hover:bg-secondary/90 font-semibold shadow-sm w-full sm:w-auto"
            onClick={() => navigate(`/agentes/${p.id}/sindicancia`)}
          >
            <Briefcase className="w-4 h-4" />
            Encaminhar sindicância
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden animate-in fade-in duration-300 ease-out">
        <CardContent className="p-8 grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr_1fr] gap-8 md:items-start">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <img
              src={`https://img.usecurling.com/ppl/large?gender=male&seed=${p.id}`}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
              alt="Profile"
            />
            <h2 className="text-2xl font-bold text-primary mt-4 leading-tight">{p.nomeCompleto}</h2>
            {p.numero_controle && (
              <div className="flex items-center gap-2 mt-2 bg-primary/5 text-primary px-3 py-1.5 rounded-lg border border-primary/10">
                <span className="text-sm font-bold">Nº: {p.numero_controle}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary hover:bg-primary/20 rounded-md ml-1"
                  onClick={() => {
                    navigator.clipboard.writeText(p.numero_controle!)
                    toast({
                      title: 'Número copiado!',
                      className: 'bg-green-500 text-white border-none',
                    })
                  }}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            )}
            <Badge
              variant="outline"
              className="text-xs mt-3 bg-muted/50 text-muted-foreground font-medium border-none"
            >
              {p.regiaoAbrangencia || 'Sem Especialidade'}
            </Badge>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
              {p.naBlackList === 'Sim' && (
                <div className="bg-destructive/10 text-destructive text-xs font-bold px-3 py-1 rounded-full flex gap-1.5 items-center">
                  <AlertTriangle className="w-3.5 h-3.5" /> Blacklist
                </div>
              )}
              {p.ativo === 'Sim' && (
                <div className="bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full flex gap-1.5 items-center">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ativo
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4 lg:pt-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Informações de Contato
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs text-muted-foreground font-medium">Email</span>
                  <span className="text-sm text-foreground font-semibold truncate">
                    {p.email || '-'}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Telefone</span>
                  <span className="text-sm text-foreground font-semibold truncate">
                    {p.telefone || '-'}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Base</span>
                  <span className="text-sm text-foreground font-semibold truncate">
                    {p.baseAtendimento || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4 lg:pt-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Financeiro & Comercial
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Honorário</span>
                  <span className="text-sm text-foreground font-semibold">
                    R$ {Number(p.valorHonorario || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Valor KM</span>
                  <span className="text-sm text-foreground font-semibold">
                    R$ {Number(p.valorKm || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <Key className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Chave Pix</span>
                  <span
                    className="text-sm text-foreground font-semibold truncate max-w-[150px]"
                    title={p.chavePix}
                  >
                    {p.chavePix || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4 lg:pt-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Performance & Qualidade
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs text-muted-foreground font-medium">Qualidade</span>
                  <span
                    className={cn(
                      'text-sm font-semibold truncate',
                      getKPITextColor(p.qualidade_nivel),
                    )}
                  >
                    {p.qualidade_nivel || 'Não Avaliado'}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs text-muted-foreground font-medium">Experiência</span>
                  <span
                    className={cn(
                      'text-sm font-semibold truncate',
                      getKPITextColor(p.experiencia_nivel),
                    )}
                  >
                    {p.experiencia_nivel || 'Não Avaliado'}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs text-muted-foreground font-medium">Compliance</span>
                  <span
                    className={cn(
                      'text-sm font-semibold truncate',
                      getKPITextColor(p.compliance_nivel),
                    )}
                  >
                    {p.compliance_nivel || 'Não Avaliado'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsLoading
          ? [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-[104px] rounded-2xl bg-white" />)
          : [
              {
                title: 'Total Processos',
                number: stats.total.toString(),
                subtitle: 'Registrados',
                delay: '0ms',
              },
              {
                title: 'Concluídos',
                number: stats.concluidos.toString(),
                subtitle: 'Finalizados',
                delay: '80ms',
              },
              {
                title: 'Em Andamento',
                number: stats.emAndamento.toString(),
                subtitle: 'Em execução',
                delay: '160ms',
              },
              {
                title: 'Pendências',
                number: stats.pendentes.toString(),
                subtitle: 'Aguardando',
                delay: '240ms',
              },
            ].map((kpi, i) => (
              <Card
                key={i}
                className="border-none shadow-sm rounded-2xl overflow-hidden relative bg-white animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both"
                style={{ animationDelay: kpi.delay, animationDuration: '400ms' }}
              >
                <CardContent className="p-5">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2 relative z-10">
                    {kpi.title}
                  </h4>
                  <div className="text-3xl font-bold text-primary leading-none relative z-10">
                    {kpi.number}
                  </div>
                  <p className="text-xs text-secondary font-medium mt-2 relative z-10">
                    {kpi.subtitle}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-6">
        <Card className="border-none shadow-sm rounded-2xl p-6">
          <div className="flex flex-row justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-primary">Processos Recentes</h3>
            <Button
              variant="outline"
              size="sm"
              className="font-semibold rounded-xl text-primary"
              asChild
            >
              <Link to={`/agentes/${p.id}/sindicancia`}>Nova Sindicância</Link>
            </Button>
          </div>
          <div className="flex flex-col divide-y divide-border/50">
            {recentes.length === 0 ? (
              <div className="text-sm text-muted-foreground py-4 text-center">
                Nenhum processo vinculado.
              </div>
            ) : (
              recentes.map((proc, i) => (
                <div
                  key={proc.id}
                  className="py-4 hover:bg-muted/20 transition-colors animate-in fade-in slide-in-from-bottom-2 ease-out fill-mode-both flex flex-row items-center justify-between group"
                  style={{ animationDelay: `${i * 40}ms`, animationDuration: '250ms' }}
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-semibold">
                      {proc.numero_controle || proc.id}
                    </span>
                    <span className="text-sm text-foreground font-bold mt-1 group-hover:text-primary transition-colors">
                      {proc.tipo_servico || 'Sindicância'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={getBadgeClass(proc.status || 'Pendente')}>
                      {proc.status || 'Pendente'}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {proc.data_entrada?.split(' ')[0] || '-'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-2xl p-6">
          <h3 className="text-lg font-bold text-primary mb-6">Atividade Recente</h3>
          <div className="flex flex-col">
            {[
              { text: 'Documento CNH atualizado', time: 'Hoje, 14:30' },
              { text: 'Novo processo atribuído', time: 'Ontem, 09:15' },
              { text: 'Status alterado para Ativo', time: '10 Out 2023' },
            ].map((act, i, arr) => (
              <div key={i} className="flex flex-row gap-4 pb-6 relative">
                {i !== arr.length - 1 && (
                  <div className="absolute left-[7px] top-4 w-px h-[calc(100%-8px)] bg-border" />
                )}
                <div className="w-4 h-4 rounded-full bg-secondary/20 border-2 border-secondary mt-0.5 shrink-0 relative z-10" />
                <div className="flex flex-col -mt-1">
                  <span className="text-sm font-semibold text-foreground">{act.text}</span>
                  <span className="text-xs text-muted-foreground font-medium mt-1">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <EditAgenteModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        agente={p}
        onSuccess={loadData}
      />
    </div>
  )
}
