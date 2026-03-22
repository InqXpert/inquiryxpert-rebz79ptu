import { Users, Activity, AlertCircle, LogIn } from 'lucide-react'
import type { User } from '@/types'

export function MetricasDashboard({ users }: { users: User[] }) {
  const total = users.length
  const status = {
    ativos: users.filter((u) => u.status_conta === 'ativo').length,
    bloqueados: users.filter((u) => u.status_conta === 'bloqueado').length,
  }
  const hoje = new Date().toDateString()
  const loginsHoje = users.filter(
    (u) => u.ultimo_login && new Date(u.ultimo_login).toDateString() === hoje,
  ).length
  const avgTimeHrs = total
    ? Math.round(users.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / 60 / total)
    : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard title="Total de Usuários" value={total} icon={<Users className="w-6 h-6" />} />
        <KpiCard
          title="Usuários Ativos"
          value={status.ativos}
          icon={<Activity className="w-6 h-6" />}
        />
        <KpiCard
          title="Contas Bloqueadas"
          value={status.bloqueados}
          icon={<AlertCircle className="w-6 h-6" />}
        />
        <KpiCard title="Logins Hoje" value={loginsHoje} icon={<LogIn className="w-6 h-6" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 relative overflow-hidden bg-white dark:bg-brand-navy/80 rounded-lg border border-brand-teal dark:border-brand-cyan/50 hover:shadow-[0_10px_25px_rgba(40,44,89,0.1)] transition-all duration-300">
          <div className="bg-gradient-to-r from-brand-navy to-brand-cyan p-4">
            <h3 className="text-[16px] font-bold text-white">Distribuição por Papel (RBAC)</h3>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <RoleStat
              label="C-Level"
              count={users.filter((u) => u.role === 'c-level').length}
              total={total}
              color="brand-navy"
            />
            <RoleStat
              label="Administradores"
              count={users.filter((u) => u.role === 'admin').length}
              total={total}
              color="brand-cyan"
            />
            <RoleStat
              label="Supervisores"
              count={users.filter((u) => u.role === 'supervisor').length}
              total={total}
              color="brand-teal"
            />
            <RoleStat
              label="Analistas"
              count={users.filter((u) => u.role === 'analista').length}
              total={total}
              color="brand-gray"
            />
          </div>
        </div>

        <div className="relative overflow-hidden bg-white dark:bg-brand-navy/80 rounded-lg border border-brand-teal dark:border-brand-cyan/50 hover:shadow-[0_10px_25px_rgba(40,44,89,0.1)] transition-all duration-300 flex flex-col justify-center items-center p-8 text-center">
          <div className="bg-gradient-to-r from-brand-navy to-brand-cyan p-4 w-full absolute top-0">
            <h3 className="text-[16px] font-bold text-white">Tempo Médio de Uso</h3>
          </div>
          <div className="mt-10 mb-2 p-4 bg-brand-light dark:bg-black/20 rounded-full text-brand-cyan">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-brand-navy dark:text-white">{avgTimeHrs}h</h2>
          <p className="text-[14px] text-brand-gray dark:text-brand-light mt-2">
            Por usuário na plataforma
          </p>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-brand-navy/80 rounded-lg border border-brand-teal dark:border-brand-cyan/50 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(40,44,89,0.1)] transition-all duration-300">
      <div className="bg-gradient-to-r from-brand-navy to-brand-cyan h-2 w-full absolute top-0 left-0" />
      <div className="p-6 pt-8 flex items-start justify-between">
        <div className="p-3 bg-brand-light dark:bg-black/20 rounded-xl text-brand-cyan">{icon}</div>
        <div className="text-right">
          <h3 className="text-3xl font-bold text-brand-navy dark:text-white">{value}</h3>
          <p className="text-[14px] font-bold text-brand-gray dark:text-brand-light/80 mt-1">
            {title}
          </p>
        </div>
      </div>
    </div>
  )
}

function RoleStat({
  label,
  count,
  total,
  color,
}: {
  label: string
  count: number
  total: number
  color: string
}) {
  const pct = total ? Math.round((count / total) * 100) : 0
  return (
    <div
      className={`p-4 rounded-xl border border-brand-teal/50 bg-brand-light/50 dark:bg-black/20 flex flex-col items-center justify-center text-center hover:bg-${color}/10 transition-colors`}
    >
      <span className="text-[24px] font-bold text-brand-navy dark:text-white mb-1">{count}</span>
      <span className="text-[12px] font-bold text-brand-gray dark:text-brand-light/80 uppercase tracking-wider mb-2">
        {label}
      </span>
      <Badge bg={color} label={`${pct}%`} />
    </div>
  )
}

function Badge({ bg, label }: { bg: string; label: string }) {
  const bgClass = `bg-${bg}`
  return (
    <div
      className={`px-2 py-0.5 rounded-full text-white text-[11px] font-bold ${bgClass} shadow-sm`}
    >
      {label}
    </div>
  )
}
