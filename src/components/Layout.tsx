import { Suspense } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Search,
  Bell,
  Settings,
  HelpCircle,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  BarChart3,
  Moon,
  Sun,
  Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { useTheme } from '@/components/ThemeProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function Layout() {
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Processos', url: '/processos' },
    { title: 'Agentes', url: '/agentes' },
    ...(user?.role === 'c-level' ||
    user?.role === 'admin' ||
    user?.role === 'supervisor' ||
    user?.role === 'agente'
      ? [{ title: 'Portal do Agente', url: '/gestao-agentes' }]
      : []),
    ...(user?.role === 'c-level' ? [{ title: 'Gestão de Usuários', url: '/gestao-usuarios' }] : []),
    ...(user?.role === 'c-level' || user?.role === 'admin'
      ? [{ title: 'Performance', url: '/gestao/performance-supervisores' }]
      : []),
  ]

  const isActive = (url: string) => {
    if (url === '/' && location.pathname !== '/') return false
    return location.pathname.startsWith(url)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30 font-sans">
      <header className="flex h-14 items-center justify-between px-4 bg-brand-navy text-white shadow-md z-30 shrink-0">
        <div className="flex items-center h-full overflow-hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 md:hidden text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-brand-navy text-white border-r-brand-teal/30 p-0 w-64"
            >
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-brand-coral flex items-center justify-center font-bold text-sm text-white shadow-sm">
                  IX
                </div>
                <span className="font-bold text-lg tracking-tight">InquiryXpert</span>
              </div>
              <div className="flex flex-col py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={cn(
                      'px-6 py-3 text-[14px] font-medium transition-colors hover:bg-white/10',
                      isActive(item.url)
                        ? 'text-brand-cyan bg-white/5 border-l-2 border-brand-cyan'
                        : 'text-white/80 border-l-2 border-transparent',
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2 mr-2 sm:mr-6 shrink-0">
            <div className="w-8 h-8 rounded bg-brand-coral flex items-center justify-center font-bold text-sm text-white shadow-sm">
              IX
            </div>
            <span className="font-bold text-lg tracking-tight hidden md:block">InquiryXpert</span>
          </Link>

          <nav className="hidden md:flex items-center h-full overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={cn(
                  'px-3 lg:px-4 h-full flex items-center text-[13px] font-medium transition-colors hover:bg-white/10 relative whitespace-nowrap',
                  isActive(item.url) ? 'text-white bg-white/10' : 'text-white/80',
                )}
              >
                {item.title}
                {isActive(item.url) && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-cyan" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 hidden sm:flex"
          >
            <Search className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 hidden sm:flex"
            onClick={() => navigate('/configuracoes')}
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 relative hidden sm:flex"
            onClick={() => navigate('/ajuda')}
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 relative"
            onClick={() => navigate('/processos/alertas')}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-coral rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full ml-1 focus-visible:ring-1 focus-visible:ring-brand-cyan p-0"
              >
                <Avatar className="h-8 w-8 border border-white/20">
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/thumbnail?gender=female&seed=${user?.id || 'default'}`}
                  />
                  <AvatarFallback className="bg-white/10 text-white text-xs font-medium">
                    {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 mt-2 rounded-xl shadow-lg border-border"
            >
              <div className="flex items-center justify-start gap-3 p-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/thumbnail?gender=female&seed=${user?.id || 'default'}`}
                  />
                  <AvatarFallback>
                    {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5 leading-none">
                  <p className="font-semibold text-sm text-foreground">{user?.name}</p>
                  <p className="w-[160px] truncate text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3">
                <Link to="/perfil" className="w-full flex items-center">
                  <UserIcon className="mr-2.5 h-4 w-4 text-brand-cyan" />
                  <span className="font-medium text-[13px]">Meu Perfil</span>
                </Link>
              </DropdownMenuItem>
              {(user?.role === 'c-level' || user?.role === 'admin') && (
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3">
                  <Link to="/gestao/performance-supervisores" className="w-full flex items-center">
                    <BarChart3 className="mr-2.5 h-4 w-4 text-brand-cyan" />
                    <span className="font-medium text-[13px]">Performance</span>
                  </Link>
                </DropdownMenuItem>
              )}
              {(user?.role === 'c-level' ||
                user?.role === 'admin' ||
                user?.role === 'supervisor' ||
                user?.role === 'agente') && (
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3">
                  <Link to="/gestao-agentes" className="w-full flex items-center">
                    <LayoutDashboard className="mr-2.5 h-4 w-4 text-brand-cyan" />
                    <span className="font-medium text-[13px]">Portal do Agente</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3">
                <Link to="/configuracoes" className="w-full flex items-center">
                  <Settings className="mr-2.5 h-4 w-4 text-brand-cyan" />
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full h-full items-center justify-start overflow-auto">
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
          <Suspense
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                <div className="w-8 h-8 rounded-full border-[3px] border-brand-cyan border-t-transparent animate-spin" />
                <span className="text-sm font-medium tracking-wide">Carregando...</span>
              </div>
            }
          >
            <div className="w-full h-full flex flex-col animate-in fade-in duration-300">
              <Outlet />
            </div>
          </Suspense>
        </div>
      </main>
    </div>
  )
}
