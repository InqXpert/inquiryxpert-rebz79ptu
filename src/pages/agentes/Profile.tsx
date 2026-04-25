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
import { cn, formatDateBr } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { EditAgenteModal } from '@/components/agentes/EditAgenteModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import pb from '@/lib/pocketbase/client'

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
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-72 w-full rounded-2xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    )

  if (!p)
    return (
      <div className="p-12 text-center text-xl text-muted-foreground w-full">
        Agente não encontrado.
      </div>
    )

  const getBadgeClass = (status: string) => {
    const base = 'text-[12px] font-bold px-[10px] py-[4px] rounded-full'
    const s = status.toLowerCase()
    if (s.includes('concluíd') || s.includes('concluid') || s.includes('finaliz'))
      return cn(base, 'bg-emerald-100 text-emerald-800')
    if (s.includes('andamento') || s.includes('execuç'))
      return cn(base, 'bg-blue-100 text-blue-800')
    if (s.includes('pendent') || s.includes('aguardando'))
      return cn(base, 'bg-yellow-100 text-yellow-800')
    if (s.includes('pendencia')) return cn(base, 'bg-[#F2485C]/10 text-[#F2485C]')
    return cn(base, 'bg-muted text-muted-foreground')
  }

  const getKPITextColor = (val?: string) => {
    if (!val) return 'text-muted-foreground'
    if (val.includes('NIVEL 1') || val.includes('ZERO') || val.includes('TREINAMENTO'))
      return 'text-destructive'
    if (val.includes('NIVEL 2') || val.includes('PARCIAL') || val.includes('JUNIOR'))
      return 'text-[#F2485C]'
    if (val.includes('NIVEL 3') || val.includes('ALTO') || val.includes('PLENO'))
      return 'text-blue-600'
    if (val.includes('NIVEL 4') || val.includes('TOTAL') || val.includes('SENIOR'))
      return 'text-emerald-600'
    return 'text-muted-foreground'
  }

  const recentes = processos.slice(0, 3)

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-[15px] font-semibold text-muted-foreground hover:text-primary hover:bg-transparent px-0"
          asChild
        >
          <Link to="/agentes">
            <ChevronLeft className="w-5 h-5" />
            Voltar para Agentes
          </Link>
        </Button>
        <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive h-11 px-4 rounded-xl flex-1 sm:flex-none font-semibold"
            title="Remover"
          >
            <Trash className="w-4 h-4 sm:mr-2" /> <span className="sm:hidden">Remover</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setEditModalOpen(true)}
            className="h-11 px-6 rounded-xl gap-2 font-semibold flex-1 sm:flex-none border-border"
          >
            <Edit className="w-4 h-4" /> Editar
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl h-11 px-6 gap-2 font-semibold shadow-sm w-full sm:w-auto"
            onClick={() => navigate(`/sindicancia/encaminhar?agente_id=${p.id}`)}
          >
            <Briefcase className="w-4 h-4" />
            Encaminhar Sindicância
          </Button>
        </div>
      </div>

      <Card className="border border-border/50 shadow-sm rounded-2xl overflow-hidden animate-in fade-in duration-300 ease-out bg-card">
        <CardContent className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[240px_1fr_1fr_1fr] gap-10 md:items-start">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <Avatar className="w-28 h-28 rounded-full border-4 border-white shadow-md">
              <AvatarImage
                src={p.foto_perfil ? pb.files.getUrl(p, p.foto_perfil) : ''}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl bg-muted text-foreground">
                {p.nomeCompleto?.charAt(0).toUpperCase() || 'AG'}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold text-primary mt-5 leading-tight">{p.nomeCompleto}</h2>
            {p.numero_controle && (
              <div className="flex items-center gap-2 mt-3 bg-primary/5 text-primary px-4 py-2 rounded-xl border border-primary/10">
                <span className="text-sm font-bold">Nº: {p.numero_controle}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-primary hover:bg-primary/20 rounded-md ml-1"
                  onClick={() => {
                    navigator.clipboard.writeText(p.numero_controle!)
                    toast({
                      title: 'Número copiado!',
                      className: 'bg-emerald-600 text-white border-none',
                    })
                  }}
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
            <Badge
              variant="outline"
              className="text-[13px] mt-4 bg-muted text-muted-foreground font-semibold border-none px-4 py-1.5 rounded-full"
            >
              {p.regiaoAbrangencia || 'Sem Especialidade'}
            </Badge>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-5">
              {p.naBlackList === 'Sim' && (
                <div className="bg-destructive/10 text-destructive text-[13px] font-bold px-4 py-1.5 rounded-full flex gap-2 items-center">
                  <AlertTriangle className="w-4 h-4" /> Blacklist
                </div>
              )}
              {p.ativo === 'Sim' && (
                <div className="bg-emerald-100 text-emerald-800 text-[13px] font-bold px-4 py-1.5 rounded-full flex gap-2 items-center">
                  <CheckCircle2 className="w-4 h-4" /> Ativo
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-5 lg:pt-3">
            <h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Informações de Contato
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">
                    E-mail
                  </span>
                  <span className="text-[15px] text-foreground font-semibold truncate">
                    {p.email || '-'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">
                    Telefone
                  </span>
                  <span className="text-[15px] text-foreground font-semibold truncate">
                    {p.telefone || '-'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">Base</span>
                  <span className="text-[15px] text-foreground font-semibold truncate">
                    {p.baseAtendimento || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-5 lg:pt-3">
            <h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Financeiro & Comercial
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">
                    Honorário
                  </span>
                  <span className="text-[15px] text-foreground font-semibold">
                    R$ {Number(p.valorHonorario || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <Car className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">
                    Valor KM
                  </span>
                  <span className="text-[15px] text-foreground font-semibold">
                    R$ {Number(p.valorKm || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <Key className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">
                    Chave Pix
                  </span>
                  <span
                    className="text-[15px] text-foreground font-semibold truncate max-w-[150px]"
                    title={p.chavePix}
                  >
                    {p.chavePix || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-5 lg:pt-3">
            <h3 className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Performance & Qualidade
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <Star className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">
                    Qualidade
                  </span>
                  <span
                    className={cn(
                      'text-[14px] font-bold truncate',
                      getKPITextColor(p.qualidade_nivel),
                    )}
                  >
                    {p.qualidade_nivel || 'Não Avaliado'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <Award className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">
                    Experiência
                  </span>
                  <span
                    className={cn(
                      'text-[14px] font-bold truncate',
                      getKPITextColor(p.experiencia_nivel),
                    )}
                  >
                    {p.experiencia_nivel || 'Não Avaliado'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0 border border-border/50">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[13px] text-muted-foreground font-medium mb-0.5">
                    Compliance
                  </span>
                  <span
                    className={cn(
                      'text-[14px] font-bold truncate',
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsLoading
          ? [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-[120px] rounded-2xl bg-card" />)
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
                className="border border-border/50 shadow-sm rounded-2xl overflow-hidden relative bg-card animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both"
                style={{ animationDelay: kpi.delay, animationDuration: '400ms' }}
              >
                <CardContent className="p-6">
                  <h4 className="text-[15px] font-semibold text-muted-foreground mb-3 relative z-10">
                    {kpi.title}
                  </h4>
                  <div className="text-4xl font-bold text-primary leading-none relative z-10">
                    {kpi.number}
                  </div>
                  <p className="text-[13px] text-muted-foreground font-medium mt-3 relative z-10">
                    {kpi.subtitle}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8">
        <Card className="border border-border/50 shadow-sm rounded-2xl p-8 bg-card">
          <div className="flex flex-row justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-primary">Processos Recentes</h3>
            <Button
              variant="outline"
              size="sm"
              className="font-bold rounded-xl text-primary h-10 px-5 border-border"
              asChild
            >
              <Link to={`/sindicancia/encaminhar?agente_id=${p.id}`}>Nova Sindicância</Link>
            </Button>
          </div>
          <div className="flex flex-col divide-y divide-border/50">
            {recentes.length === 0 ? (
              <div className="text-[15px] text-muted-foreground py-6 text-center font-medium">
                Nenhum processo vinculado.
              </div>
            ) : (
              recentes.map((proc, i) => (
                <div
                  key={proc.id}
                  className="py-5 hover:bg-muted/20 transition-colors animate-in fade-in slide-in-from-bottom-2 ease-out fill-mode-both flex flex-row items-center justify-between group"
                  style={{ animationDelay: `${i * 40}ms`, animationDuration: '250ms' }}
                >
                  <div className="flex flex-col">
                    <span className="text-[13px] text-muted-foreground font-bold tracking-wide">
                      {proc.numero_controle || proc.id}
                    </span>
                    <span className="text-[16px] text-foreground font-bold mt-1.5 group-hover:text-primary transition-colors">
                      {proc.tipo_servico || 'Sindicância'}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2.5">
                    <div className={getBadgeClass(proc.status || 'Pendente')}>
                      {proc.status || 'Pendente'}
                    </div>
                    <span className="text-[13px] text-muted-foreground font-semibold">
                      {formatDateBr(proc.data_entrada)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="border border-border/50 shadow-sm rounded-2xl p-8 bg-card">
          <h3 className="text-xl font-bold text-primary mb-8">Atividade Recente</h3>
          <div className="flex flex-col">
            {[
              { text: 'Documento CNH atualizado', time: 'Hoje, 14:30' },
              { text: 'Novo processo atribuído', time: 'Ontem, 09:15' },
              { text: 'Status alterado para Ativo', time: '10 Out 2023' },
            ].map((act, i, arr) => (
              <div key={i} className="flex flex-row gap-5 pb-8 relative">
                {i !== arr.length - 1 && (
                  <div className="absolute left-[7px] top-4 w-[2px] h-[calc(100%-8px)] bg-border/50" />
                )}
                <div className="w-4 h-4 rounded-full bg-secondary/20 border-2 border-secondary mt-1 shrink-0 relative z-10" />
                <div className="flex flex-col -mt-1.5">
                  <span className="text-[15px] font-bold text-foreground">{act.text}</span>
                  <span className="text-[13px] text-muted-foreground font-medium mt-1">
                    {act.time}
                  </span>
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
