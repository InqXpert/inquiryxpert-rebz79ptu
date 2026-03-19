import { Suspense } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Search,
  Moon,
  Sun,
  LayoutDashboard,
  FileText,
  BarChart,
  Settings,
  HelpCircle,
  User,
} from 'lucide-react'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTheme } from './ThemeProvider'

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Processos', url: '/processos', icon: FileText },
  { title: 'Relatórios', url: '/relatorios', icon: BarChart },
  { title: 'Configurações', url: '/configuracoes', icon: Settings },
  { title: 'Ajuda', url: '/ajuda', icon: HelpCircle },
]

function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex justify-center px-6 border-b border-sidebar-border/50">
        <h1 className="text-2xl font-bold text-primary flex items-center h-full tracking-tight">
          Organix
        </h1>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-10 transition-colors"
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      </div>

      <div className="flex-1 max-w-lg px-4 mx-auto hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="Buscar informações..."
            className="w-full pl-10 bg-muted border-none rounded-full h-10 focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full text-muted-foreground hover:text-foreground"
          title="Alternar Tema"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <Avatar className="w-9 h-9 border border-border cursor-pointer hover:opacity-80 transition-opacity shadow-sm">
          <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2" />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary/20">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
              <Suspense
                fallback={
                  <div className="py-20 flex flex-col items-center justify-center text-muted-foreground animate-pulse gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <span className="text-sm font-medium">Carregando...</span>
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
