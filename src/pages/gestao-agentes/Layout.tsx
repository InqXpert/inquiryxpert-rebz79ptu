import { Suspense } from 'react'
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { GestaoAgentesErrorBoundary } from './GestaoAgentesErrorBoundary'
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  GraduationCap,
  MessageSquare,
  UserCircle,
  FileSignature,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function GestaoAgentesLayout() {
  const location = useLocation()
  const { user } = useAuth()

  // RBAC: Accessible to authenticated users with roles: "agente", "c-level", "admin", "supervisor"
  const allowedRoles = ['c-level', 'admin', 'supervisor', 'agente']
  if (!user || !allowedRoles.includes(user.role as string)) {
    return <Navigate to="/login" replace />
  }

  const navItems = [
    { title: 'Painel Geral', icon: LayoutDashboard, url: '/gestao-agentes' },
    { title: 'Processos', icon: FolderKanban, url: '/gestao-agentes/processos' },
    { title: 'Relatórios', icon: FileText, url: '/gestao-agentes/relatorios' },
    { title: 'Treinamentos', icon: GraduationCap, url: '/gestao-agentes/treinamentos' },
    { title: 'Mensagens', icon: MessageSquare, url: '/gestao-agentes/mensagens' },
    { title: 'Meu Perfil', icon: UserCircle, url: '/gestao-agentes/perfil' },
    { title: 'Termos e Assinaturas', icon: FileSignature, url: '/gestao-agentes/termos' },
  ]

  const isActive = (url: string) => {
    if (url === '/gestao-agentes' && location.pathname === '/gestao-agentes') return true
    if (url !== '/gestao-agentes' && location.pathname.startsWith(url)) return true
    return false
  }

  return (
    <div className="flex w-full min-h-screen bg-[#f5f8fa]">
      <aside className="w-64 bg-white border-r border-border shrink-0 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h2 className="text-[16px] font-bold text-primary tracking-tight">Portal do Agente</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-colors',
                isActive(item.url)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5',
                  isActive(item.url) ? 'text-primary' : 'text-muted-foreground',
                )}
              />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col w-full h-full min-h-screen overflow-y-auto relative">
        <div className="p-4 sm:p-6 md:p-8 flex-1 w-full max-w-[1200px] mx-auto">
          <GestaoAgentesErrorBoundary>
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-muted-foreground">
                  <div className="w-10 h-10 rounded-full border-[3px] border-primary border-t-transparent animate-spin mb-4" />
                  <span className="text-[14px] font-medium">Carregando módulo...</span>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </GestaoAgentesErrorBoundary>
        </div>
      </main>
    </div>
  )
}
