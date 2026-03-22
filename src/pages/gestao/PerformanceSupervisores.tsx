import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Clock, CheckSquare, TrendingDown, Users } from 'lucide-react'

export default function PerformanceSupervisores() {
  const kpis = [
    {
      title: 'Tempo Médio de Validação',
      value: '4.2 horas',
      trend: '-12%',
      trendUp: false,
      icon: <Clock className="w-5 h-5 text-[#00A8B5]" />,
    },
    {
      title: 'Processos Validados Hoje',
      value: '84',
      trend: '+15%',
      trendUp: true,
      icon: <CheckSquare className="w-5 h-5 text-emerald-500" />,
    },
    {
      title: 'Pendentes de Revisão',
      value: '23',
      trend: '-5%',
      trendUp: false,
      icon: <Users className="w-5 h-5 text-amber-500" />,
    },
    {
      title: 'Gargalo Crítico',
      value: '14 horas',
      trend: 'Supervisor Carlos',
      trendUp: false,
      icon: <TrendingDown className="w-5 h-5 text-destructive" />,
    },
  ]

  const chartData = [
    { name: 'Ana Souza', tempo: 2.5, pendentes: 4 },
    { name: 'Carlos Silva', tempo: 14.1, pendentes: 12 },
    { name: 'Mariana Reis', tempo: 3.8, pendentes: 2 },
    { name: 'João Pedro', tempo: 5.2, pendentes: 5 },
  ]

  const chartConfig = {
    tempo: {
      label: 'Tempo Médio (horas)',
      color: 'hsl(var(--primary))',
    },
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-2">
          Performance de Supervisão
        </h1>
        <p className="text-muted-foreground text-base">
          Acompanhamento de métricas de validação e gargalos operacionais.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="rounded-2xl border-none shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                  {kpi.icon}
                </div>
                <div
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${kpi.trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}
                >
                  {kpi.trend}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase">{kpi.title}</p>
                <h3 className="text-3xl font-bold text-foreground mt-1">{kpi.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-none shadow-sm bg-card">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-xl">Tempo de Validação por Supervisor</CardTitle>
          <CardDescription>
            Média em horas desde o envio do relatório pelo agente até a aprovação.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px] w-full mt-4">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    dx={-10}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                  />
                  <Bar
                    dataKey="tempo"
                    fill="var(--color-tempo)"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
