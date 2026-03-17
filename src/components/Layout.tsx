import { Outlet, useLocation } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './layout/AppSidebar'
import { AppHeader } from './layout/AppHeader'

export default function Layout() {
  const location = useLocation()

  let title = 'Dashboard'
  if (location.pathname.includes('/prestadores/novo')) title = 'Novo Prestador'
  else if (location.pathname.includes('/editar')) title = 'Editar Prestador'
  else if (location.pathname.includes('/prestadores/')) title = 'Perfil do Prestador'
  else if (location.pathname.includes('/prestadores')) title = 'Prestadores'

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader title={title} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
