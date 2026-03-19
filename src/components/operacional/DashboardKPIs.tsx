import { ProcessoOperacional } from '@/types'
import { TrendingUp } from 'lucide-react'

interface Props {
  processos: ProcessoOperacional[]
  loading: boolean
}

export function DashboardKPIs({ processos, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[24px]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[120px] rounded-[8px] bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  const kpis = [
    { title: 'Total de Processos', value: processos.length, subtitle: 'Todos os registros' },
    {
      title: 'Em Execução',
      value: processos.filter((p) => p.status === 'em_execucao').length,
      subtitle: 'Acompanhamento ativo',
    },
    {
      title: 'Finalizados',
      value: processos.filter((p) => p.status === 'finalizado').length,
      subtitle: 'Concluídos',
    },
    {
      title: 'Pendências',
      value: processos.filter((p) => ['em_elaboracao', 'analise_inicial'].includes(p.status))
        .length,
      subtitle: 'Requer atenção',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[24px]">
      {kpis.map((kpi, i) => (
        <div
          key={kpi.title}
          className="relative overflow-hidden rounded-[8px] p-[20px] min-h-[120px] flex flex-col justify-center animate-in slide-in-from-bottom-4 fade-in duration-400 ease-out fill-mode-both"
          style={{
            background: 'linear-gradient(135deg, hsl(210 60% 25%) 0%, hsl(210 60% 35%) 100%)',
            animationDelay: `${i * 80}ms`,
          }}
        >
          <div className="absolute -bottom-[20px] -right-[20px] w-[80px] h-[80px] bg-white/10 rounded-full" />
          <TrendingUp className="w-[16px] h-[16px] text-white/70 absolute top-[16px] right-[16px]" />
          <h3 className="text-[13px] font-medium text-white/85 mb-[8px] relative z-10">
            {kpi.title}
          </h3>
          <div className="text-[36px] font-bold text-white leading-[1] relative z-10">
            {kpi.value}
          </div>
          <p className="text-[12px] text-white/70 mt-[4px] relative z-10">{kpi.subtitle}</p>
        </div>
      ))}
    </div>
  )
}
