import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield, Clock, LogIn, Activity, AlertCircle } from 'lucide-react'
import type { User } from '@/types'

export function MetricasDashboard({ users }: { users: User[] }) {
  const total = users.length
  const roles = {
    'c-level': users.filter((u) => u.role === 'c-level').length,
    admin: users.filter((u) => u.role === 'admin').length,
    supervisor: users.filter((u) => u.role === 'supervisor').length,
    analista: users.filter((u) => u.role === 'analista').length,
  }
  const status = {
    ativos: users.filter((u) => u.status_conta === 'ativo').length,
    suspensos: users.filter((u) => u.status_conta === 'suspenso').length,
    bloqueados: users.filter((u) => u.status_conta === 'bloqueado').length,
  }
  const avgTimeHrs = total
    ? Math.round(users.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / 60 / total)
    : 0

  const hoje = new Date().toDateString()
  const loginsHoje = users.filter(
    (u) => u.ultimo_login && new Date(u.ultimo_login).toDateString() === hoje,
  ).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total de Usuários"
          value={total.toString()}
          icon={<Users className="w-5 h-5 text-primary" />}
        />
        <MetricCard
          title="Usuários Ativos"
          value={status.ativos.toString()}
          icon={<Activity className="w-5 h-5 text-[#00A8B5]" />}
        />
        <MetricCard
          title="Contas Bloqueadas"
          value={status.bloqueados.toString()}
          icon={<AlertCircle className="w-5 h-5 text-destructive" />}
        />
        <MetricCard
          title="Logins Hoje"
          value={loginsHoje.toString()}
          icon={<LogIn className="w-5 h-5 text-secondary" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-none shadow-sm bg-card lg:col-span-2">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-lg font-bold">Distribuição por Papel (RBAC)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <RoleStat label="C-Level" count={roles['c-level']} total={total} />
              <RoleStat label="Administradores" count={roles.admin} total={total} />
              <RoleStat label="Supervisores" count={roles.supervisor} total={total} />
              <RoleStat label="Analistas" count={roles.analista} total={total} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-sm bg-card flex flex-col justify-center items-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">
            Tempo Médio de Uso
          </p>
          <h2 className="text-4xl font-bold text-foreground">{avgTimeHrs}h</h2>
          <p className="text-xs text-muted-foreground mt-2">Por usuário na plataforma</p>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <Card className="rounded-2xl border-none shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground">{title}</CardTitle>
        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  )
}

function RoleStat({ label, count, total }: { label: string; count: number; total: number }) {
  const percent = total ? Math.round((count / total) * 100) : 0
  return (
    <div className="p-4 rounded-xl border border-border/60 bg-muted/10 flex flex-col justify-between min-h-[100px]">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <div className="flex items-end justify-between mt-4">
        <span className="text-2xl font-bold">{count}</span>
        <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md text-foreground">
          {percent}%
        </span>
      </div>
    </div>
  )
}
