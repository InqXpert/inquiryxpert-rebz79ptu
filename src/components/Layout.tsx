import { Suspense, useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Bell,
  Settings,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Moon,
  Sun,
  Menu,
  Briefcase,
  FileText,
  Users,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { useNotifications } from '@/hooks/use-notifications'
import { useTheme } from '@/components/ThemeProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'

export default function Layout() {
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { title: 'Dashboard', url: '/', icon: LayoutDashboard },
    { title: 'Processos', url: '/processos', icon: FileText },
    { title: 'Nova Sindicância', url: '/sindicancia/nova', icon: ShieldAlert },
    ...(user?.role === 'c-level' || user?.role === 'admin'
      ? [{ title: 'Financeiro', url: '/financeiro', icon: Briefcase }]
      : []),
    { title: 'Agentes', url: '/agentes', icon: Users },
    { title: 'Notificações', url: '/notificacoes', icon: Bell },
  ]

  const isActive = (url: string) => {
    if (url === '/' && location.pathname !== '/') return false
    return location.pathname.startsWith(url)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex flex-col gap-2 p-4">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.url)
        return (
          <Link
            key={item.title}
            to={item.url}
            onClick={onClick}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              active
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon className={cn('w-5 h-5', active ? 'text-primary' : 'text-muted-foreground')} />
            {item.title}
            {active && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
          </Link>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen flex bg-background font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card shadow-sm z-10 shrink-0 h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-sm text-primary-foreground shadow-sm">
              CR
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Crextio</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <NavLinks />
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage
                src={`https://img.usecurling.com/ppl/thumbnail?gender=female&seed=${user?.id || 'default'}`}
              />
              <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                {user?.name?.substring(0, 2).toUpperCase() || 'US'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate capitalize">
                {user?.role || 'Usuário'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-card border-b border-border z-20 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-foreground hover:bg-muted focus-visible:ring-primary"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-card border-r-border">
                <SheetHeader className="h-16 flex items-center justify-center px-6 border-b border-border text-left">
                  <SheetTitle asChild>
                    <Link
                      to="/"
                      className="flex items-center gap-2 mr-auto"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-sm text-primary-foreground shadow-sm">
                        CR
                      </div>
                      <span className="font-bold text-xl tracking-tight text-foreground">
                        Crextio
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                  <NavLinks onClick={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden sm:flex items-center text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Bem-vindo(a)</span>
              <span className="mx-2">•</span>
              <span>
                {new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground hover:bg-muted h-9 w-9 focus-visible:ring-primary"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-muted h-9 w-9 relative focus-visible:ring-primary"
              onClick={() => navigate('/notificacoes')}
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-destructive ring-2 ring-card" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full ml-1 focus-visible:ring-2 focus-visible:ring-primary p-0"
                >
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=female&seed=${user?.id || 'default'}`}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                      {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 rounded-xl shadow-lg border-border"
              >
                <div className="flex items-center justify-start gap-3 p-3">
                  <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-semibold text-sm text-foreground">{user?.name}</p>
                    <p className="truncate text-xs text-muted-foreground max-w-[180px]">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3">
                  <Link to="/perfil" className="w-full flex items-center">
                    <UserIcon className="mr-2.5 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-[13px]">Meu Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3">
                  <Link to="/configuracoes" className="w-full flex items-center">
                    <Settings className="mr-2.5 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-[13px]">Configurações</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={signOut}
                  className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive py-2.5 px-3"
                >
                  <LogOut className="mr-2.5 h-4 w-4" />
                  <span className="font-medium text-[13px]">Sair do sistema</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-background/50">
          <div className="w-full max-w-7xl mx-auto h-full flex flex-col p-4 sm:p-6 lg:p-8">
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                  <div className="w-8 h-8 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
                  <span className="text-sm font-medium tracking-wide">Carregando...</span>
                </div>
              }
            >
              <div className="w-full h-full animate-in fade-in duration-300">
                <Outlet />
              </div>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
