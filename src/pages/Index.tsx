import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PieChart, Pie, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { usePrestadores } from '@/hooks/use-prestadores'

const chartConfig = {
  ativos: { label: 'Ativos', color: 'hsl(var(--secondary))' },
  inativos: { label: 'Inativos', color: 'hsl(var(--muted-foreground))' },
}

export default function Dashboard() {
  const { prestadores, loading } = usePrestadores()

  if (loading)
    return <div className="p-8 text-center text-muted-foreground">Carregando métricas...</div>

  const ativosCount = prestadores.filter((p) => p.ativo === 'Sim').length
  const totalCount = prestadores.length
  const blackListCount = prestadores.filter((p) => p.naBlackList === 'Sim').length

  const chartData = [
    { name: 'Ativos', value: ativosCount, fill: 'var(--color-ativos)' },
    { name: 'Inativos', value: totalCount - ativosCount, fill: 'var(--color-inativos)' },
  ]

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
        <Button asChild className="rounded-full shadow-elevation">
          <Link to="/prestadores/novo">Novo Prestador</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl border-none shadow-elevation bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
              Total de Prestadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-primary">{totalCount}</div>
            <p className="mt-2 text-sm text-secondary font-semibold">+12% este mês</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-elevation bg-card flex flex-col">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
              Prestadores Ativos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center -mt-4">
            <ChartContainer config={chartConfig} className="h-[120px] w-[120px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={60}
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="ml-4 text-3xl font-bold text-primary">
              {Math.round((ativosCount / (totalCount || 1)) * 100)}%
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-elevation bg-gradient-to-br from-[#f43b53] to-[#d6283e] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase text-white/80">
              Em Black List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold">{blackListCount}</div>
            <p className="mt-2 text-sm text-white/90 font-medium">Requer atenção imediata</p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 bg-white text-[#f43b53] hover:bg-white/90 rounded-full w-full"
            >
              Ver Detalhes <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-none shadow-elevation bg-card h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <CardTitle className="text-lg font-bold">Onboarding Tasks</CardTitle>
            <span className="text-2xl font-bold text-primary">98%</span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 p-6">
              {[
                {
                  title: 'Onboarding Session',
                  date: 'Mon, Feb 3 | 10:00',
                  done: true,
                  img: 'meeting',
                },
                { title: 'Interview', date: 'Mon, Feb 3 | 14:00', done: true, img: 'interview' },
                { title: 'Project Update', date: 'Tue, Feb 4 | 14:30', done: true, img: 'office' },
                { title: 'Team Meeting', date: 'Mon, Feb 5 | 17:00', done: false, img: 'team' },
              ].map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 justify-between bg-background p-3 rounded-xl border"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://img.usecurling.com/p/64/64?q=${task.img}`}
                      alt="task"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">{task.date}</p>
                    </div>
                  </div>
                  {task.done ? (
                    <CheckCircle2 className="text-secondary w-5 h-5" />
                  ) : (
                    <Circle className="text-muted-foreground w-5 h-5" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="rounded-2xl border-none shadow-elevation bg-card flex flex-col justify-center p-6 items-start">
            <div className="text-4xl font-bold">38</div>
            <div className="text-sm font-semibold uppercase mt-1">Projetos Concluídos</div>
            <div className="text-xs text-muted-foreground mt-1">+4 Mês Passado</div>
            <Button variant="link" className="mt-4 px-0 text-primary">
              Ver Tudo
            </Button>
          </Card>
          <Card className="rounded-2xl border-none shadow-elevation bg-card flex flex-col justify-center p-6 items-start">
            <div className="text-4xl font-bold">8</div>
            <div className="text-sm font-semibold uppercase mt-1">Projetos em Andamento</div>
            <div className="text-xs text-muted-foreground mt-1">+2 Mês Passado</div>
            <Button variant="link" className="mt-4 px-0 text-primary">
              Ver Tudo
            </Button>
          </Card>
          <Card className="rounded-2xl border-none shadow-elevation bg-gradient-to-tr from-accent to-background col-span-2 flex justify-between items-center p-6">
            <div>
              <div className="text-4xl font-bold">$6,110</div>
              <div className="text-sm font-semibold uppercase mt-1">Pagamentos Estimados</div>
              <div className="text-xs text-primary/70 mt-1">+40% Mês Passado</div>
            </div>
            <img
              src="https://img.usecurling.com/p/120/120?q=finance"
              alt="Finance"
              className="rounded-xl w-24 h-24 object-cover"
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
