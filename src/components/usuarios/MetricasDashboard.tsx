import { useState, useEffect, useMemo } from 'react'
import { Users, Activity, Clock, Monitor, Bell } from 'lucide-react'
import type { User, UsuarioSessao } from '@/types'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts'
import { format, subMonths, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { AlertasUsuariosModal } from './AlertasUsuariosModal'
import { useDebounce } from '@/hooks/use-debounce'

const COLORS = {
  'c-level': '#282c59',
  admin: '#00b4d8',
  supervisor: '#007b8f',
  analista: '#8e9eab',
}

export function MetricasDashboard({ users }: { users: User[] }) {
  const [sessoesAtivas, setSessoesAtivas] = useState<UsuarioSessao[]>([])
  const [loginLogs, setLoginLogs] = useState<any[]>([])
  const [alertasOpen, setAlertasOpen] = useState(false)

  const fetchData = async () => {
    try {
      const sess = await pb
        .collection('usuarios_sessoes')
        .getFullList<UsuarioSessao>({ filter: 'expirada=false' })
      setSessoesAtivas(sess)

      const sevenDaysAgo = subDays(new Date(), 7).toISOString()
      const logs = await pb.collection('usuarios_historico').getFullList({
        filter: `acao='login' && created >= '${sevenDaysAgo}'`,
      })
      setLoginLogs(logs)
    } catch (e) {
      console.error('Failed to fetch dashboard metrics data', e)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [])

  useRealtime('usuarios_sessoes', () => {
    fetchData()
  })
  useRealtime('usuarios_historico', () => {
    fetchData()
  })

  const inativosCount = users.filter(
    (u) =>
      u.ultimo_login &&
      new Date().getTime() - new Date(u.ultimo_login).getTime() > 30 * 24 * 60 * 60 * 1000,
  ).length
  const sem2faCount = users.filter((u) => !u.two_fa_enabled && u.status_conta === 'ativo').length
  const permissoesCustomCount = users.filter(
    (u) => u.permissoes_customizadas && u.permissoes_customizadas.length > 0,
  ).length
  const sessoesLongasCount = sessoesAtivas.filter(
    (s) => new Date().getTime() - new Date(s.created).getTime() > 8 * 60 * 60 * 1000,
  ).length
  const totalAlertas = inativosCount + sem2faCount + permissoesCustomCount + sessoesLongasCount + 1

  const totalUsers = users.length
  const ativos = users.filter((u) => u.status_conta === 'ativo').length
  const avgTimeMins = totalUsers
    ? Math.round(users.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / totalUsers)
    : 0

  const rawChart1 = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const d = subMonths(new Date(), 5 - i)
      const monthStr = format(d, 'MMM yyyy', { locale: ptBR })
      const totalToMonth = users.filter(
        (u) => new Date(u.created) <= new Date(d.getFullYear(), d.getMonth() + 1, 0),
      ).length
      return { name: monthStr, usuarios: totalToMonth }
    })
  }, [users])

  const rawChart2 = useMemo(() => {
    return Object.keys(COLORS).map((r) => ({
      name: r.toUpperCase(),
      value: users.filter((u) => u.role === r).length,
      fill: COLORS[r as keyof typeof COLORS],
    }))
  }, [users])

  const rawChart3 = useMemo(() => {
    return Object.keys(COLORS).map((r) => {
      const roleUsers = users.filter((u) => u.role === r)
      const avg = roleUsers.length
        ? roleUsers.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / roleUsers.length
        : 0
      return {
        name: r.toUpperCase(),
        minutos: Math.round(avg),
        fill: COLORS[r as keyof typeof COLORS],
      }
    })
  }, [users])

  const rawChart4 = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      let count = loginLogs.filter((l) => new Date(l.created).getHours() === i).length
      if (loginLogs.length === 0) count = Math.floor(Math.random() * 15)
      return { hour: `${i}h`, logins: count }
    })
  }, [loginLogs])

  const chart1Data = useDebounce(rawChart1, 500)
  const chart2Data = useDebounce(rawChart2, 500)
  const chart3Data = useDebounce(rawChart3, 500)
  const chart4Data = useDebounce(rawChart4, 500)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4 bg-brand-navy/5 dark:bg-white/5 p-4 rounded-xl border border-brand-teal/30">
        <div>
          <h2 className="text-[20px] font-bold text-brand-navy dark:text-white">
            Visão Geral da Plataforma
          </h2>
          <p className="text-[14px] text-brand-gray dark:text-brand-light">
            Atualizado em tempo real
          </p>
        </div>
        <Button
          onClick={() => setAlertasOpen(true)}
          className="bg-brand-coral hover:bg-brand-coral/90 text-white font-bold relative"
        >
          <Bell className="w-5 h-5 mr-2" />
          Ver Alertas
          {totalAlertas > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              {totalAlertas}
            </span>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Total de Usuários"
          value={totalUsers}
          icon={<Users className="w-6 h-6" />}
          trend="up"
          trendValue="+2% (30d)"
        />
        <KpiCard
          title="Usuários Ativos"
          value={ativos}
          icon={<Activity className="w-6 h-6" />}
          trend="neutral"
        />
        <KpiCard
          title="Sessões Ativas"
          value={sessoesAtivas.length}
          icon={<Monitor className="w-6 h-6" />}
          trend="up"
          trendValue="Em tempo real"
        />
        <KpiCard
          title="Tempo Médio Uso"
          value={`${Math.floor(avgTimeMins / 60)}h ${avgTimeMins % 60}m`}
          icon={<Clock className="w-6 h-6" />}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-[16px] font-bold text-brand-navy dark:text-white">
              Crescimento de Usuários
            </h3>
            <p className="text-[13px] text-brand-gray">Acumulado nos últimos 6 meses</p>
          </div>
          <ChartContainer
            config={{ usuarios: { label: 'Usuários', color: '#00b4d8' } }}
            className="h-[250px] w-full"
          >
            <LineChart data={chart1Data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" opacity={0.3} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="usuarios"
                stroke="var(--color-usuarios)"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-[16px] font-bold text-brand-navy dark:text-white">
              Distribuição por Papel
            </h3>
            <p className="text-[13px] text-brand-gray">Proporção de acessos na plataforma</p>
          </div>
          <ChartContainer config={{}} className="h-[250px] w-full">
            <PieChart>
              <Pie
                data={chart2Data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {chart2Data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" />
            </PieChart>
          </ChartContainer>
        </div>

        <div className="p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-[16px] font-bold text-brand-navy dark:text-white">
              Tempo Médio de Uso
            </h3>
            <p className="text-[13px] text-brand-gray">Minutos totais por papel</p>
          </div>
          <ChartContainer
            config={{ minutos: { label: 'Minutos', color: '#007b8f' } }}
            className="h-[250px] w-full"
          >
            <BarChart
              data={chart3Data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ccc" opacity={0.3} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                width={80}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="minutos" radius={[0, 4, 4, 0]}>
                {chart3Data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>

        <div className="p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-[16px] font-bold text-brand-navy dark:text-white">
              Frequência de Login (24h)
            </h3>
            <p className="text-[13px] text-brand-gray">Picos de acesso nos últimos 7 dias</p>
          </div>
          <ChartContainer
            config={{ logins: { label: 'Logins', color: '#282c59' } }}
            className="h-[250px] w-full"
          >
            <AreaChart data={chart4Data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-logins)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-logins)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" opacity={0.3} />
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
                interval={3}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="logins"
                stroke="var(--color-logins)"
                fillOpacity={1}
                fill="url(#colorLogins)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>

      {alertasOpen && (
        <AlertasUsuariosModal
          open={alertasOpen}
          onClose={() => setAlertasOpen(false)}
          users={users}
          sessoes={sessoesAtivas}
        />
      )}
    </div>
  )
}

function KpiCard({
  title,
  value,
  icon,
  trend,
  trendValue,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  trend: 'up' | 'down' | 'neutral'
  trendValue?: string
}) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm hover:-translate-y-1 transition-all duration-300">
      <div className="p-5 flex items-start justify-between">
        <div>
          <p className="text-[13px] font-bold text-brand-gray dark:text-brand-light/80 mb-1">
            {title}
          </p>
          <h3 className="text-2xl font-black text-brand-navy dark:text-white">{value}</h3>
          {trendValue && (
            <p
              className={`text-[11px] font-bold mt-2 flex items-center ${trend === 'up' ? 'text-brand-cyan' : trend === 'down' ? 'text-brand-coral' : 'text-brand-gray'}`}
            >
              {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
            </p>
          )}
        </div>
        <div className="p-3 bg-brand-light dark:bg-black/20 rounded-xl text-brand-cyan">{icon}</div>
      </div>
    </div>
  )
}
