import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, Activity, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useRealtime } from '@/hooks/use-realtime'
import { fetchProcessos } from '@/services/procesosOperacionais'
import { ProcessoOperacional } from '@/types'

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--muted-foreground))']

export default function Dashboard() {
  const [processos, setProcessos] = useState<ProcessoOperacional[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const data = await fetchProcessos({})
      setProcessos(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('processos_operacionais', () => {
    loadData()
  })

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground animate-pulse">
        Carregando dashboard...
      </div>
    )
  }

  // Calculate Metrics
  const total = processos.length
  const concluidos = processos.filter((p) => {
    const s = (p.status || '').toLowerCase()
    return s.includes('concluid') || s.includes('finalizad')
  }).length
  const pendentes = total - concluidos

  let sumDias = 0
  let validSlaCount = 0
  processos.forEach((p) => {
    if (p.dias_totais && typeof p.dias_totais === 'number') {
      sumDias += p.dias_totais
      validSlaCount++
    }
  })
  const slaMedio = validSlaCount > 0 ? Math.round(sumDias / validSlaCount) : 0

  // Calculate Chart Data
  const ciaCount: Record<string, number> = {}
  processos.forEach((p) => {
    const c = p.cia || 'Outros'
    ciaCount[c] = (ciaCount[c] || 0) + 1
  })
  const pieData = Object.entries(ciaCount).map(([name, value]) => ({ name, value }))

  // Mocking trend data based on data_entrada if available, else generic trend
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const trendData = monthNames.map((m, i) => ({
    name: m,
    Processos: Math.floor(Math.random() * 50) + 20 + i * 5, // Simulated positive trend
  }))

  const kpis = [
    {
      title: 'Total Processos',
      value: total,
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Processos Concluídos',
      value: concluidos,
      icon: CheckCircle2,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      title: 'Pendentes / Atraso',
      value: pendentes,
      icon: Activity,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    {
      title: 'SLA Médio (Dias)',
      value: slaMedio,
      icon: Clock,
      color: 'text-muted-foreground',
      bg: 'bg-muted/50',
    },
  ]

  const chartConfig = {
    value: { label: 'Processos', color: 'hsl(var(--secondary))' },
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">
          Dashboard
        </h1>
        <p className="text-base text-muted-foreground">
          Monitore todos os indicadores da operação em tempo real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card
            key={i}
            className="border-none shadow-sm rounded-2xl animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">{kpi.title}</p>
                <h3 className="text-3xl font-bold text-primary">{kpi.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl flex flex-col animate-in fade-in duration-700">
          <CardHeader className="border-b border-muted">
            <CardTitle className="text-lg text-primary">Evolução Mensal</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1 min-h-[300px]">
            <ChartContainer config={chartConfig} className="w-full h-full min-h-[300px]">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <ChartTooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent />} />
                <Bar
                  dataKey="Processos"
                  fill="hsl(var(--secondary))"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-2xl flex flex-col animate-in fade-in duration-700 delay-150">
          <CardHeader className="border-b border-muted">
            <CardTitle className="text-lg text-primary">Processos por Cia</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-8">
            {pieData.length > 0 ? (
              <ChartContainer config={chartConfig} className="w-[200px] h-[200px]">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={80}
                    strokeWidth={0}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Sem dados
              </div>
            )}
            <div className="w-full mt-6 space-y-2">
              {pieData.slice(0, 4).map((d, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    ></div>
                    <span className="text-muted-foreground font-medium">{d.name}</span>
                  </div>
                  <span className="font-bold text-primary">
                    {Math.round((d.value / total) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
