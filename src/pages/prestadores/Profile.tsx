import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  DollarSign,
  Car,
  Building,
  Key,
  TrendingUp,
  Trash,
  Edit,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getPrestador, deletePrestador } from '@/services/prestadores'
import { Prestador } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { cn } from '@/lib/utils'

export default function ProfilePrestador() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [p, setP] = useState<Prestador | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    if (!id) return
    try {
      const data = await getPrestador(id)
      setP(data)
    } catch (err) {
      toast({ title: 'Erro', description: 'Prestador não encontrado', variant: 'destructive' })
      navigate('/prestadores')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  useRealtime('prestadores', (e) => {
    if (e.record.id === id) {
      if (e.action === 'delete') navigate('/prestadores')
      else loadData()
    }
  })

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja remover este prestador?')) {
      try {
        await deletePrestador(id!)
        toast({ title: 'Removido', description: 'Prestador deletado com sucesso.' })
        navigate('/prestadores')
      } catch (err) {
        toast({ title: 'Erro', description: 'Falha ao remover.', variant: 'destructive' })
      }
    }
  }

  if (loading) return <div className="p-8 text-center">Carregando...</div>
  if (!p) return <div className="p-8 text-center text-xl">Prestador não encontrado.</div>

  const getBadgeClass = (status: string) => {
    const base = 'text-[11px] font-semibold px-[8px] py-[2px] rounded-full border'
    if (status === 'Concluido') return cn(base, 'bg-green-100 text-green-700 border-green-200')
    if (status === 'Em Andamento') return cn(base, 'bg-blue-100 text-blue-700 border-blue-200')
    if (status === 'Pendente') return cn(base, 'bg-yellow-100 text-yellow-700 border-yellow-200')
    if (status === 'Entregue com Pendencia')
      return cn(base, 'bg-orange-100 text-orange-700 border-orange-200')
    return base
  }

  return (
    <div className="bg-background min-h-screen pb-10">
      <div className="max-w-[1280px] mx-auto px-[24px] space-y-[20px] pt-6">
        {/* Top bar */}
        <div className="h-[56px] flex flex-row justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="gap-[8px] text-[14px] text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
            asChild
          >
            <Link to="/prestadores">
              <ChevronLeft className="w-[16px] h-[16px]" />
              Voltar para Prestadores
            </Link>
          </Button>
          <div className="flex gap-[12px] items-center">
            <Button
              variant="ghost"
              onClick={handleDelete}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive h-[40px] px-[12px] rounded-lg"
              title="Remover"
            >
              <Trash className="w-[16px] h-[16px]" />
            </Button>
            <Button variant="outline" asChild className="h-[40px] px-[16px] rounded-lg gap-2">
              <Link to={`/prestadores/${p.id}/editar`}>
                <Edit className="w-[16px] h-[16px]" /> Editar
              </Link>
            </Button>
            <Button
              className="bg-primary text-white rounded-lg h-[40px] px-[16px] gap-[8px] hover:brightness-110 transition-all"
              asChild
            >
              <Link to={`/prestadores/${p.id}/processos/novo`}>
                <Plus className="w-[16px] h-[16px]" />
                Novo Processo
              </Link>
            </Button>
          </div>
        </div>

        {/* Profile header card */}
        <div className="bg-card border border-border rounded-[16px] p-[24px] mb-[24px] grid grid-cols-1 md:grid-cols-[200px_auto_220px] gap-[32px] md:items-start text-center md:text-left animate-in fade-in duration-300 ease-out">
          <div className="flex flex-col items-center md:items-start">
            <img
              src={`https://img.usecurling.com/ppl/large?gender=male&seed=${p.id}`}
              className="w-[80px] h-[80px] rounded-full object-cover border-[3px] border-primary"
              alt="Profile"
            />
            <h2 className="text-[22px] font-bold text-foreground mt-[12px] leading-tight">
              {p.nomeCompleto}
            </h2>
            <Badge variant="secondary" className="text-[12px] mt-[4px]">
              {p.regiaoAbrangencia || 'Sem Especialidade'}
            </Badge>
            <div className="flex flex-row justify-center md:justify-start gap-[8px] mt-[12px]">
              {p.naBlackList === 'Sim' && (
                <div className="bg-red-100 text-red-700 border border-red-200 text-[12px] font-semibold px-[8px] py-[2px] rounded-full flex flex-row gap-[4px] items-center">
                  <AlertTriangle className="w-[12px] h-[12px]" /> Blacklist
                </div>
              )}
              {p.ativo === 'Sim' && (
                <div className="bg-green-100 text-green-700 border border-green-200 text-[12px] font-semibold px-[8px] py-[2px] rounded-full flex flex-row gap-[4px] items-center">
                  <CheckCircle2 className="w-[12px] h-[12px]" /> Ativo
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-[12px]">
              Informações de Contato
            </h3>
            <div className="flex flex-row gap-[8px] items-center mb-[8px]">
              <Mail className="w-[14px] h-[14px] text-muted-foreground shrink-0" />
              <span className="text-[12px] text-muted-foreground w-[60px]">Email</span>
              <span className="text-[13px] text-foreground font-medium truncate">
                {p.email || 'Não informado'}
              </span>
            </div>
            <div className="flex flex-row gap-[8px] items-center mb-[8px]">
              <Phone className="w-[14px] h-[14px] text-muted-foreground shrink-0" />
              <span className="text-[12px] text-muted-foreground w-[60px]">Telefone</span>
              <span className="text-[13px] text-foreground font-medium">
                {p.telefone || 'Não informado'}
              </span>
            </div>
            <div className="flex flex-row gap-[8px] items-center mb-[8px]">
              <MapPin className="w-[14px] h-[14px] text-muted-foreground shrink-0" />
              <span className="text-[12px] text-muted-foreground w-[60px]">Base</span>
              <span className="text-[13px] text-foreground font-medium truncate">
                {p.baseAtendimento || 'Não informada'}
              </span>
            </div>
            <div className="flex flex-row gap-[8px] items-center mb-[8px]">
              <CreditCard className="w-[14px] h-[14px] text-muted-foreground shrink-0" />
              <span className="text-[12px] text-muted-foreground w-[60px]">Doc</span>
              <span className="text-[13px] text-foreground font-medium">
                {p.cpf || p.cnpj || 'Não informado'}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-[12px]">
              Informações Comerciais
            </h3>
            <div className="flex flex-row gap-[8px] items-center mb-[8px]">
              <DollarSign className="w-[14px] h-[14px] text-muted-foreground shrink-0" />
              <span className="text-[12px] text-muted-foreground w-[80px]">Honorário</span>
              <span className="text-[13px] text-foreground font-medium">
                R$ {Number(p.valorHonorario || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex flex-row gap-[8px] items-center mb-[8px]">
              <Car className="w-[14px] h-[14px] text-muted-foreground shrink-0" />
              <span className="text-[12px] text-muted-foreground w-[80px]">Valor KM</span>
              <span className="text-[13px] text-foreground font-medium">
                R$ {Number(p.valorKm || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex flex-row gap-[8px] items-center mb-[8px]">
              <Building className="w-[14px] h-[14px] text-muted-foreground shrink-0" />
              <span className="text-[12px] text-muted-foreground w-[80px]">Banco</span>
              <span className="text-[13px] text-foreground font-medium truncate">
                {p.banco || '-'}
              </span>
            </div>
            <div className="flex flex-row gap-[8px] items-center mb-[8px]">
              <Key className="w-[14px] h-[14px] text-muted-foreground shrink-0" />
              <span className="text-[12px] text-muted-foreground w-[80px]">Chave Pix</span>
              <span className="text-[13px] text-foreground font-medium truncate" title={p.chavePix}>
                {p.chavePix || '-'}
              </span>
            </div>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] mb-[24px]">
          {[
            { title: 'Total Processos', number: '142', subtitle: '+12 esse mês', delay: '0ms' },
            { title: 'Concluídos', number: '98', subtitle: '69% de sucesso', delay: '80ms' },
            { title: 'Em Andamento', number: '41', subtitle: 'No prazo', delay: '160ms' },
            { title: 'Pendências', number: '3', subtitle: 'Atenção necessária', delay: '240ms' },
          ].map((kpi, i) => (
            <div
              key={i}
              className="rounded-[16px] p-[20px] min-h-[120px] overflow-hidden relative bg-gradient-to-br from-primary to-primary/85 animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both"
              style={{ animationDelay: kpi.delay, animationDuration: '400ms' }}
            >
              <div className="absolute -bottom-[20px] -right-[20px] w-[80px] h-[80px] bg-white/10 rounded-full" />
              <h4 className="text-[13px] font-medium text-white/85 mb-[8px] relative z-10">
                {kpi.title}
              </h4>
              <div className="text-[36px] font-bold text-white leading-none relative z-10">
                {kpi.number}
              </div>
              <p className="text-[12px] text-white/70 mt-[4px] relative z-10">{kpi.subtitle}</p>
              <TrendingUp className="w-[16px] h-[16px] text-white/70 absolute top-[16px] right-[16px] z-10" />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-[20px]">
          {/* ProcessList */}
          <div className="bg-card border border-border rounded-[16px] p-[20px]">
            <div className="flex flex-row justify-between items-center mb-[16px]">
              <h3 className="text-[16px] font-semibold text-foreground">Processos Recentes</h3>
              <Button variant="outline" size="sm" className="border-primary text-primary" asChild>
                <Link to={`/prestadores/${p.id}/processos/novo`}>Novo Processo</Link>
              </Button>
            </div>
            <div className="flex flex-col">
              {[
                {
                  id: 'PRC-2023-001',
                  title: 'Investigação Patrimonial',
                  status: 'Concluido',
                  date: '10 Out 2023',
                },
                {
                  id: 'PRC-2023-002',
                  title: 'Busca de Veículos',
                  status: 'Em Andamento',
                  date: '15 Out 2023',
                },
                {
                  id: 'PRC-2023-003',
                  title: 'Diligência Presencial',
                  status: 'Pendente',
                  date: '18 Out 2023',
                },
                {
                  id: 'PRC-2023-004',
                  title: 'Notificação Extrajudicial',
                  status: 'Entregue com Pendencia',
                  date: '20 Out 2023',
                },
              ].map((proc, i) => (
                <div
                  key={proc.id}
                  className="border-b border-border py-[12px] hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-bottom-2 ease-out fill-mode-both flex flex-row items-center justify-between"
                  style={{ animationDelay: `${i * 40}ms`, animationDuration: '250ms' }}
                >
                  <div className="flex flex-col">
                    <span className="text-[12px] text-muted-foreground font-medium">{proc.id}</span>
                    <span className="text-[14px] text-foreground font-medium mt-[2px]">
                      {proc.title}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-[4px]">
                    <div
                      className={cn(
                        getBadgeClass(proc.status),
                        'animate-in zoom-in-[0.8] duration-200 ease-out fill-mode-both',
                      )}
                      style={{ animationDelay: `${i * 40 + 50}ms` }}
                    >
                      {proc.status}
                    </div>
                    <span className="text-[12px] text-muted-foreground">{proc.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[8px] justify-end mt-[16px]">
              <Button variant="outline" size="sm" className="w-[32px] h-[32px] p-0">
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-[32px] h-[32px] p-0 bg-primary text-white border-primary"
              >
                2
              </Button>
              <Button variant="outline" size="sm" className="w-[32px] h-[32px] p-0">
                3
              </Button>
            </div>
          </div>

          {/* RecentActivityCard */}
          <div className="bg-card border border-border rounded-[16px] p-[20px]">
            <h3 className="text-[16px] font-semibold text-foreground mb-[16px]">
              Atividade Recente
            </h3>
            <div className="flex flex-col">
              {[
                { text: 'Documento CNH atualizado', time: 'Hoje, 14:30' },
                { text: 'Novo processo atribuído: PRC-2023-005', time: 'Ontem, 09:15' },
                { text: 'Honorários pagos (R$ 450,00)', time: '12 Out 2023' },
                { text: 'Status alterado para Ativo', time: '10 Out 2023' },
              ].map((act, i, arr) => (
                <div key={i} className="flex flex-row gap-[12px] pb-[16px] relative">
                  {i !== arr.length - 1 && (
                    <div className="absolute left-[3px] top-[14px] w-[2px] h-[calc(100%-14px)] bg-border" />
                  )}
                  <div className="w-[8px] h-[8px] rounded-full bg-primary mt-[6px] shrink-0 relative z-10" />
                  <div className="flex flex-col">
                    <span className="text-[13px] text-foreground">{act.text}</span>
                    <span className="text-[11px] text-muted-foreground mt-[2px]">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
