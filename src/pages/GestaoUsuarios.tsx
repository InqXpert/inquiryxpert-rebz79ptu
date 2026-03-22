import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useGestaoUsuarios } from '@/hooks/useGestaoUsuarios'
import { UsuariosTable } from '@/components/usuarios/UsuariosTable'
import { UsuarioForm } from '@/components/usuarios/UsuarioForm'
import { HistoricoGeralTable } from '@/components/usuarios/HistoricoGeralTable'
import { MetricasDashboard } from '@/components/usuarios/MetricasDashboard'
import type { User } from '@/types'

export default function GestaoUsuarios() {
  const { user } = useAuth()
  const { users, loading, loadUsers } = useGestaoUsuarios()
  const [activeTab, setActiveTab] = useState('lista')
  const [userToEdit, setUserToEdit] = useState<User | null>(null)

  if (user?.role !== 'c-level') return <Navigate to="/dashboard" replace />

  const handleEdit = (u: User) => {
    setUserToEdit(u)
    setActiveTab('editar')
  }

  const handleSuccessForm = () => {
    setActiveTab('lista')
    setUserToEdit(null)
    loadUsers()
  }

  const handleCancelForm = () => {
    setActiveTab('lista')
    setUserToEdit(null)
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 pb-20 space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-brand-navy dark:text-white tracking-tight mb-2">
          Gestão de Usuários
        </h1>
        <p className="text-[14px] text-brand-gray dark:text-brand-light font-medium">
          Controle completo de acessos, permissões e auditoria da plataforma.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="lista">Lista de Usuários</TabsTrigger>
          <TabsTrigger value="novo">Novo Usuário</TabsTrigger>
          {userToEdit && <TabsTrigger value="editar">Editar Usuário</TabsTrigger>}
          <TabsTrigger value="historico">Histórico de Auditoria</TabsTrigger>
          <TabsTrigger value="metricas">Métricas e Relatórios</TabsTrigger>
        </TabsList>

        <div className="animate-in fade-in duration-300">
          <TabsContent value="lista">
            <UsuariosTable
              users={users}
              loading={loading}
              onEdit={handleEdit}
              onRefresh={loadUsers}
            />
          </TabsContent>

          <TabsContent value="novo">
            <UsuarioForm onSuccess={handleSuccessForm} onCancel={handleCancelForm} />
          </TabsContent>

          {userToEdit && (
            <TabsContent value="editar">
              <UsuarioForm
                userToEdit={userToEdit}
                onSuccess={handleSuccessForm}
                onCancel={handleCancelForm}
              />
            </TabsContent>
          )}

          <TabsContent value="historico">
            <HistoricoGeralTable />
          </TabsContent>

          <TabsContent value="metricas">
            <MetricasDashboard users={users} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
