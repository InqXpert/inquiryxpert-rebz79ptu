import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart,
  Settings,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'

export function AppSidebar() {
  const location = useLocation()
  const { user } = useAuth()

  const items = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Processos', url: '/processos', icon: FolderOpen },
    { title: 'Agentes', url: '/agentes', icon: Users },
    ...(user?.role === 'c-level'
      ? [{ title: 'Gestão de Usuários', url: '/gestao-usuarios', icon: ShieldCheck }]
      : []),
    { title: 'Financeiro', url: '#', icon: CreditCard },
    { title: 'Analytics', url: '#', icon: BarChart },
    { title: 'Configurações', url: '/configuracoes', icon: Settings },
  ]

  const isActive = (url: string) => {
    if (url === '/' && location.pathname !== '/') return false
    return location.pathname.startsWith(url)
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 px-2 group">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center font-bold text-sm text-sidebar-primary-foreground shadow-sm group-hover:bg-sidebar-accent-foreground transition-colors">
            IX
          </div>
          <span className="font-bold text-lg tracking-tight text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">
            InquiryXperty
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5 mt-2 px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className="py-5 px-3 transition-all hover:translate-x-1"
                  >
                    <Link to={item.url}>
                      <item.icon className="!size-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Link
          to="/perfil"
          className="flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3 hover:bg-sidebar-accent transition-colors group cursor-pointer"
        >
          <Avatar className="w-10 h-10 border border-sidebar-border group-hover:border-sidebar-primary transition-colors">
            <AvatarImage
              src={`https://img.usecurling.com/ppl/thumbnail?gender=female&seed=${user?.id || 1}`}
            />
            <AvatarFallback className="bg-sidebar-background text-sidebar-foreground">
              {user?.name?.substring(0, 2).toUpperCase() || 'US'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold text-sidebar-foreground truncate">
              {user?.name || 'Usuário'}
            </span>
            <span className="text-xs text-sidebar-foreground/70 capitalize truncate">
              {user?.role || 'Visitante'}
            </span>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
