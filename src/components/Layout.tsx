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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { user, signOut } = useAuth()
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
  ]

  const isActive = (url: string) => {
    if (url === '/' && location.pathname !== '/') return false
    return location.pathname.startsWith(url)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fa] font-sans">
      {/* Top Navigation Bar - CRM Style */}
      <header className="flex h-14 items-center justify-between px-4 bg-[#2A3B4C] text-white shadow-md z-30 shrink-0">
        <div className="flex items-center h-full overflow-hidden">
          <Link to="/" className="flex items-center gap-2 mr-2 sm:mr-6 shrink-0">
            <div className="w-8 h-8 rounded bg-[#F2485C] flex items-center justify-center font-bold text-sm text-white shadow-sm">
              IX
            </div>
            <span className="font-bold text-lg tracking-tight hidden md:block">InquiryXpert</span>
          </Link>

          <nav className="flex items-center h-full overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={cn(
                  'px-3 sm:px-4 h-full flex items-center text-[13px] font-medium transition-colors hover:bg-white/10 relative whitespace-nowrap',
                  isActive(item.url) ? 'text-white bg-white/10' : 'text-white/80',
                )}
              >
                {item.title}
                {isActive(item.url) && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A8B5]" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
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
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#F2485C] rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full ml-1 focus-visible:ring-1 focus-visible:ring-[#00A8B5] p-0"
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
              className="w-64 mt-2 rounded-xl shadow-lg border-border bg-white"
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
                  <p className="font-semibold text-sm text-[#2A3B4C]">{user?.name}</p>
                  <p className="w-[160px] truncate text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3 hover:bg-[#f5f8fa]">
                <Link to="/perfil" className="w-full flex items-center text-[#2A3B4C]">
                  <UserIcon className="mr-2.5 h-4 w-4 text-[#00A8B5]" />
                  <span className="font-medium text-[13px]">Meu Perfil</span>
                </Link>
              </DropdownMenuItem>
              {(user?.role === 'c-level' ||
                user?.role === 'admin' ||
                user?.role === 'supervisor' ||
                user?.role === 'agente') && (
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3 hover:bg-[#f5f8fa]">
                  <Link to="/gestao-agentes" className="w-full flex items-center text-[#2A3B4C]">
                    <LayoutDashboard className="mr-2.5 h-4 w-4 text-[#00A8B5]" />
                    <span className="font-medium text-[13px]">Portal do Agente</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3 hover:bg-[#f5f8fa]">
                <Link to="/configuracoes" className="w-full flex items-center text-[#2A3B4C]">
                  <Settings className="mr-2.5 h-4 w-4 text-[#00A8B5]" />
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
      <main className="flex-1 overflow-auto flex flex-col relative w-full h-full">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-[#f5f8fa]/50 backdrop-blur-sm gap-4 z-50">
              <div className="w-8 h-8 rounded-full border-[3px] border-[#00A8B5] border-t-transparent animate-spin" />
              <span className="text-sm font-medium tracking-wide">Carregando...</span>
            </div>
          }
        >
          <div className="animate-in fade-in zoom-in-95 duration-300 w-full h-full flex flex-col">
            <Outlet />
          </div>
        </Suspense>
      </main>
    </div>
  )
}
