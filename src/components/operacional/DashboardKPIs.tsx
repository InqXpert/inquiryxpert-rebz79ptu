import { ProcessoOperacional } from '@/types'
import { TrendingUp } from 'lucide-react'

interface Props {
  processos: ProcessoOperacional[]
  loading: boolean
}

export function DashboardKPIs({ processos, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-[120px] rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  const kpis = [
    { title: 'Total de Processos', value: processos.length, subtitle: 'Todos os registros' },
    { title: 'Em Execução', value: processos.filter(p => p.status === 'em_execucao').length, subtitle: 'Acompanhamento ativo' },
    { title: 'Finalizados', value: processos.filter(p => p.status === 'finalizado').length, subtitle: 'Concluídos' },
    { title: 'Pendências', value: processos.filter(p => ['em_elaboracao', 'analise_inicial'].includes(p.status)).length, subtitle: 'Requer atenção' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, i) => (
        <div
          key={kpi.title}
          className="relative overflow-hidden rounded-2xl p-5 min-h-[120px] flex flex-col justify-center animate-in slide-in-from-bottom-4 fade-in duration-400 fill-mode-both"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)',
            animationDelay: `${i * 80}ms`
          }}
        >
          <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-white/10 rounded-full" />
          <TrendingUp className="w-4 h-4 text-white/70 absolute top-4 right-4" />
          <h3 className="text-[13px] font-medium text-white/85 mb-2 z-10">{kpi.title}</h3>
          <div className="text-3xl font-bold text-white leading-none z-10">{kpi.value}</div>
          <p className="text-[12px] text-white/70 mt-1 z-10">{kpi.subtitle}</p>
        </div>
      ))}
    </div>
  )
}
