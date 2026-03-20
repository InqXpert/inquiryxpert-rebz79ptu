import { ProcessoOperacional } from '@/types'
import { TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  processos: ProcessoOperacional[]
  loading: boolean
}

export function DashboardKPIs({ processos, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[140px] rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  // Normalize status internally so KPIs work even with legacy un-normalized data in DB
  const normalizedProcessos = processos.map((p) => ({
    ...p,
    normalizedStatus: String(p.status || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim(),
  }))

  const kpis = [
    {
      title: 'Total de Processos',
      value: processos.length,
      subtitle: 'Todos os registros',
    },
    {
      title: 'Em Execução',
      value: normalizedProcessos.filter((p) => p.normalizedStatus.includes('execucao')).length,
      subtitle: 'Acompanhamento ativo',
    },
    {
      title: 'Finalizados',
      value: normalizedProcessos.filter(
        (p) => p.normalizedStatus.includes('finalizad') || p.normalizedStatus.includes('concluid'),
      ).length,
      subtitle: 'Concluídos',
    },
    {
      title: 'Pendências',
      value: normalizedProcessos.filter(
        (p) => p.normalizedStatus.includes('elaboracao') || p.normalizedStatus.includes('analise'),
      ).length,
      subtitle: 'Requer atenção',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
      {kpis.map((kpi, i) => (
        <Card
          key={kpi.title}
          className="border-none shadow-sm rounded-2xl overflow-hidden relative animate-in slide-in-from-bottom-4 fade-in duration-400 ease-out fill-mode-both"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)',
            animationDelay: `${i * 80}ms`,
          }}
        >
          <CardContent className="p-6 h-full flex flex-col justify-center min-h-[140px]">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
            <TrendingUp className="w-5 h-5 text-white/70 absolute top-5 right-5" />
            <h3 className="text-sm font-semibold text-white/85 mb-2 relative z-10 tracking-wide uppercase">
              {kpi.title}
            </h3>
            <div className="text-4xl font-bold text-white leading-none relative z-10 mb-2 mt-1">
              {kpi.value}
            </div>
            <p className="text-[13px] text-white/70 font-medium relative z-10">{kpi.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
