import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Users, UserCheck, UserX, Clock, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import UsuariosTable from '@/components/usuarios/UsuariosTable'
import pb from '@/lib/pocketbase/client'
import type { User } from '@/types'
import { useRealtime } from '@/hooks/use-realtime'
import { toast } from 'sonner'
import { format } from 'date-fns'

export default function GestaoUsuarios() {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])

  const loadUsers = async () => {
    try {
      const records = await pb.collection('users').getFullList<User>({ sort: '-created' })
      setUsers(records)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  useRealtime('users', () => {
    loadUsers()
  })

  if (user?.role !== 'c-level') return <Navigate to="/dashboard" replace />

  const ativos = users.filter((u) => u.status_conta === 'ativo').length
  const suspensos = users.filter((u) => u.status_conta === 'suspenso').length
  const avgTime = users.length
    ? Math.round(users.reduce((acc, u) => acc + (u.tempo_uso_total || 0), 0) / users.length)
    : 0

  const handleExport = () => {
    const header = 'Nome,Email,Papel,Status,Ultimo Login\n'
    const rows = users
      .map(
        (u) =>
          `${u.name},${u.email},${u.role},${u.status_conta},${u.ultimo_login ? format(new Date(u.ultimo_login), 'dd/MM/yyyy HH:mm') : '-'}`,
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `exportacao-usuarios-${format(new Date(), 'yyyyMMdd-HHmm')}.csv`
    a.click()
    toast.success('Lista de usuários exportada com sucesso!')
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">
            Gestão de Usuários
          </h1>
          <p className="text-base text-muted-foreground">
            Controle de acessos, papéis (RBAC) e auditoria de sessões.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleExport}
            className="rounded-xl shadow-sm h-12 px-6 flex-1 sm:flex-none border-border"
          >
            <Download className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
          <Button
            variant="outline"
            className="rounded-xl shadow-sm h-12 px-6 flex-1 sm:flex-none border-border"
          >
            <Upload className="w-4 h-4 mr-2" /> Importar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Usuários"
          value={users.length}
          icon={<Users className="w-5 h-5 text-muted-foreground" />}
        />
        <MetricCard
          title="Ativos Hoje"
          value={ativos}
          icon={<UserCheck className="w-5 h-5 text-primary" />}
        />
        <MetricCard
          title="Contas Suspensas"
          value={suspensos}
          icon={<UserX className="w-5 h-5 text-destructive" />}
        />
        <MetricCard
          title="Uso Médio (min)"
          value={avgTime}
          icon={<Clock className="w-5 h-5 text-muted-foreground" />}
        />
      </div>

      <Card className="rounded-2xl border border-border/50 shadow-sm mt-8 overflow-hidden bg-card">
        <CardContent className="p-0">
          <UsuariosTable users={users} />
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <Card className="rounded-2xl border-none shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-muted-foreground">{title}</CardTitle>
        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary">{value}</div>
      </CardContent>
    </Card>
  )
}
