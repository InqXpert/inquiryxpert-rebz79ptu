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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Gestão de Usuários</h1>
          <p className="text-muted-foreground text-sm">
            Controle de acessos, papéis (RBAC) e auditoria de sessões.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="rounded-none shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
          <Button variant="outline" className="rounded-none shadow-sm">
            <Upload className="w-4 h-4 mr-2" /> Importar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Usuários"
          value={users.length}
          icon={<Users className="w-4 h-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Ativos Hoje"
          value={ativos}
          icon={<UserCheck className="w-4 h-4 text-primary" />}
        />
        <MetricCard
          title="Contas Suspensas"
          value={suspensos}
          icon={<UserX className="w-4 h-4 text-destructive" />}
        />
        <MetricCard
          title="Uso Médio (min)"
          value={avgTime}
          icon={<Clock className="w-4 h-4 text-muted-foreground" />}
        />
      </div>

      <Card className="rounded-none border shadow-sm">
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
    <Card className="rounded-none border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
