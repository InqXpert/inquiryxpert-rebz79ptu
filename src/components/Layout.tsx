import { Outlet, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './layout/AppSidebar'
import { AppHeader } from './layout/AppHeader'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const location = useLocation()
  const { signOut } = useAuth()

  let title = 'Dashboard'
  if (location.pathname.includes('/prestadores/novo')) title = 'Novo Prestador'
  else if (location.pathname.includes('/editar')) title = 'Editar Prestador'
  else if (location.pathname.includes('/prestadores/')) title = 'Perfil do Prestador'
  else if (location.pathname.includes('/prestadores')) title = 'Prestadores'

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground relative">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="relative">
            <AppHeader title={title} />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
              <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
          <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in relative">
            <div className="md:hidden flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" /> Sair
              </Button>
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
