import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const flowConfig = {
  receita: { label: 'Receita', color: 'hsl(var(--chart-2))' },
  custo: { label: 'Custo', color: 'hsl(var(--destructive))' },
}

const pieConfig = {
  value: { label: 'Receita' },
  'Porto Seguro': { label: 'Porto Seguro', color: 'hsl(var(--chart-1))' },
  Bradesco: { label: 'Bradesco', color: 'hsl(var(--chart-2))' },
  Azul: { label: 'Azul', color: 'hsl(var(--chart-3))' },
  Liberty: { label: 'Liberty', color: 'hsl(var(--chart-4))' },
}

export function PerformanceCharts({ flowData, pieData }: { flowData: any[]; pieData: any[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Caixa vs Custo (30 dias)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={flowConfig} className="h-[320px] w-full">
            <LineChart data={flowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickFormatter={(val) => `R$${(val / 1000).toFixed(1)}k`}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={70}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="receita"
                stroke="var(--color-receita)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="custo"
                stroke="var(--color-custo)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Receita (CIAs)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={pieConfig}
            className="h-[320px] w-full [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
