import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, CreditCard, BarChart, Settings } from 'lucide-react'
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

const items = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Prestadores', url: '/prestadores', icon: Users },
  { title: 'Financeiro', url: '#', icon: CreditCard },
  { title: 'Analytics', url: '#', icon: BarChart },
  { title: 'Configurações', url: '#', icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()

  const isActive = (url: string) => {
    if (url === '/' && location.pathname !== '/') return false
    return location.pathname.startsWith(url)
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <h1 className="text-2xl font-bold tracking-wider text-sidebar-primary-foreground">
          NL CORP.
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className="py-6 transition-all hover:translate-x-1"
                  >
                    <Link to={item.url}>
                      <item.icon className="!size-5" />
                      <span className="text-base font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-sidebar-accent p-3 shadow-elevation">
          <Avatar>
            <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1" />
            <AvatarFallback>OL</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-primary-foreground">Olivia T.</span>
            <span className="text-xs text-sidebar-primary-foreground/70">Design Lead</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
