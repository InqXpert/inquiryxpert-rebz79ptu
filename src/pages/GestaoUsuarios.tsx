import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useGestaoUsuarios } from '@/hooks/useGestaoUsuarios'
import { useRealtime } from '@/hooks/use-realtime'
import { UsuariosTable } from '@/components/usuarios/UsuariosTable'
import { UsuarioForm } from '@/components/usuarios/UsuarioForm'
import { HistoricoGeralTable } from '@/components/usuarios/HistoricoGeralTable'
import { MetricasDashboard } from '@/components/usuarios/MetricasDashboard'
import { ArquivadosTable } from '@/components/usuarios/ArquivadosTable'
import { ImportUsuariosModal } from '@/components/usuarios/ImportUsuariosModal'
import { ExportUsuariosModal } from '@/components/usuarios/ExportUsuariosModal'
import { Button } from '@/components/ui/button'
import { Upload, Download } from 'lucide-react'
import type { User } from '@/types'

export default function GestaoUsuarios() {
  const { user } = useAuth()
  const { users, archivedUsers, activeSessions, loading, loadUsers } = useGestaoUsuarios()
  const [activeTab, setActiveTab] = useState('lista')
  const [userToEdit, setUserToEdit] = useState<User | null>(null)

  const [importOpen, setImportOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  // Verify that an Analista cannot access the Gestao de Usuarios tab
  if (user?.role === 'analista') return <Navigate to="/dashboard" replace />

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

  const roleLevel = { 'c-level': 4, admin: 3, supervisor: 2 }[user?.role as string] || 0

  useRealtime(
    'registros_auditoria_adm',
    (e) => {
      if (e.action === 'create' && e.record.executor_id !== user?.id) {
        import('sonner').then((m) =>
          m.toast.info(`Ação administrativa: ${e.record.acao}`, {
            description: e.record.motivo,
          }),
        )
      }
    },
    roleLevel >= 4,
  )

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 pb-20 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-brand-navy dark:text-white tracking-tight mb-2">
            Gestão de Usuários
          </h1>
          <p className="text-[14px] text-brand-gray dark:text-brand-light font-medium">
            Controle completo de acessos, permissões e auditoria da plataforma.
          </p>
        </div>
        {roleLevel >= 3 && ( // Admin and C-Level only
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setImportOpen(true)}
              className="border-brand-teal text-brand-navy dark:text-white"
            >
              <Upload className="w-4 h-4 mr-2" /> Importar
            </Button>
            <Button
              onClick={() => setExportOpen(true)}
              className="bg-brand-cyan text-white hover:bg-brand-cyan/90"
            >
              <Download className="w-4 h-4 mr-2" /> Exportar
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none p-0 h-auto gap-2 md:gap-6 overflow-x-auto overflow-y-hidden">
          <TabsTrigger
            value="lista"
            className="data-[state=active]:bg-brand-navy data-[state=active]:text-white rounded-t-md rounded-b-none px-4 md:px-6 py-2.5 data-[state=active]:shadow-none bg-transparent text-brand-gray hover:text-brand-navy dark:hover:text-white"
          >
            Lista de Usuários
          </TabsTrigger>
          {roleLevel >= 3 && (
            <TabsTrigger
              value="novo"
              className="data-[state=active]:bg-brand-navy data-[state=active]:text-white rounded-t-md rounded-b-none px-4 md:px-6 py-2.5 data-[state=active]:shadow-none bg-transparent text-brand-gray hover:text-brand-navy dark:hover:text-white"
            >
              Novo Usuário
            </TabsTrigger>
          )}
          {userToEdit && (
            <TabsTrigger
              value="editar"
              className="data-[state=active]:bg-brand-navy data-[state=active]:text-white rounded-t-md rounded-b-none px-4 md:px-6 py-2.5 data-[state=active]:shadow-none bg-transparent text-brand-gray hover:text-brand-navy dark:hover:text-white"
            >
              Editar Usuário
            </TabsTrigger>
          )}
          <TabsTrigger
            value="historico"
            className="data-[state=active]:bg-brand-navy data-[state=active]:text-white rounded-t-md rounded-b-none px-4 md:px-6 py-2.5 data-[state=active]:shadow-none bg-transparent text-brand-gray hover:text-brand-navy dark:hover:text-white"
          >
            Histórico de Auditoria
          </TabsTrigger>
          <TabsTrigger
            value="metricas"
            className="data-[state=active]:bg-brand-navy data-[state=active]:text-white rounded-t-md rounded-b-none px-4 md:px-6 py-2.5 data-[state=active]:shadow-none bg-transparent text-brand-gray hover:text-brand-navy dark:hover:text-white"
          >
            Métricas e Relatórios
          </TabsTrigger>
          {roleLevel >= 4 && (
            <TabsTrigger
              value="arquivados"
              className="data-[state=active]:bg-brand-navy data-[state=active]:text-white rounded-t-md rounded-b-none px-4 md:px-6 py-2.5 data-[state=active]:shadow-none bg-transparent text-brand-gray hover:text-brand-navy dark:hover:text-white"
            >
              Arquivados
            </TabsTrigger>
          )}
        </TabsList>

        <div className="animate-in fade-in duration-300">
          <TabsContent value="lista">
            <UsuariosTable
              users={users}
              activeSessions={activeSessions}
              loading={loading}
              onEdit={handleEdit}
              onRefresh={loadUsers}
            />
          </TabsContent>

          {roleLevel >= 3 && (
            <TabsContent value="novo">
              <UsuarioForm onSuccess={handleSuccessForm} onCancel={handleCancelForm} />
            </TabsContent>
          )}

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

          {roleLevel >= 4 && (
            <TabsContent value="arquivados">
              <ArquivadosTable users={archivedUsers} loading={loading} onRefresh={loadUsers} />
            </TabsContent>
          )}
        </div>
      </Tabs>

      <ImportUsuariosModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onSuccess={() => {
          setImportOpen(false)
          loadUsers()
        }}
      />
      <ExportUsuariosModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  )
}
