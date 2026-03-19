import { Suspense } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Search,
  LayoutDashboard,
  ClipboardList,
  Users,
  Settings,
  HelpCircle,
  Bell,
  LogOut,
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
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Processos', url: '/processos', icon: ClipboardList },
  { title: 'Prestadores', url: '/prestadores', icon: Users },
  { title: 'Configurações', url: '/configuracoes', icon: Settings },
  { title: 'Ajuda', url: '/ajuda', icon: HelpCircle },
]

function AppSidebar() {
  const location = useLocation()
  const { signOut } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader className="h-20 flex justify-center px-6">
        <h1 className="text-2xl font-bold text-white flex items-center h-full tracking-tight gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary font-bold">
            IX
          </div>
          InquiryXperty
        </h1>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-4">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-12 transition-colors rounded-xl font-medium"
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 opacity-80" />
                        <span className="text-[15px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          onClick={signOut}
          className="w-full bg-destructive hover:bg-destructive/90 text-white rounded-xl h-12 flex items-center justify-center gap-2 font-semibold shadow-sm"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

function Header() {
  return (
    <header className="h-20 bg-background flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-primary md:hidden" />
      </div>

      <div className="flex-1 max-w-2xl px-4 hidden md:flex items-center">
        <div className="relative group w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
          <Input
            type="search"
            placeholder="Search Management..."
            className="w-full pl-11 bg-white border-none rounded-full h-12 shadow-sm focus-visible:ring-2 focus-visible:ring-secondary/50 text-[15px] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-primary hover:bg-muted relative shadow-sm bg-white"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white"></span>
        </Button>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-sm">
            <span className="font-semibold text-primary">Inquiry Admin</span>
            <span className="text-muted-foreground text-xs">admin@inquiry.com</span>
          </div>
          <Avatar className="w-10 h-10 border-2 border-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
            <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 bg-[#F5F6FA]">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto w-full p-4 md:p-8 animate-in fade-in duration-500">
              <Suspense
                fallback={
                  <div className="py-20 flex flex-col items-center justify-center text-primary animate-pulse gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
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
