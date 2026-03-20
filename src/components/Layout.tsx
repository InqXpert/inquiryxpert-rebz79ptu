import { Suspense } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Bell, Settings, HelpCircle, User as UserIcon, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

function TopNav() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { title: 'Dashboard', url: '/dashboard', show: true },
    { title: 'Processos', url: '/processos', show: true },
    { title: 'Agentes', url: '/agentes', show: true },
    { title: 'Gestão de Usuários', url: '/gestao-usuarios', show: user?.role === 'c-level' },
  ].filter((item) => item.show)

  return (
    <header className="h-[56px] bg-[hsl(var(--primary))] text-primary-foreground flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 shadow-sm border-b border-primary-foreground/10">
      <div className="flex items-center gap-6 h-full">
        <Link to="/" className="flex items-center gap-2 mr-4 group">
          <div className="w-7 h-7 rounded-none bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xs">
            IX
          </div>
          <span className="font-semibold text-[16px] tracking-tight hidden sm:block group-hover:text-white text-primary-foreground/90 transition-colors">
            InquiryXperty
          </span>
        </Link>

        <nav className="hidden md:flex h-full">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.url)
            return (
              <Link
                key={item.title}
                to={item.url}
                className={cn(
                  'px-4 h-full flex items-center text-[14px] font-medium transition-colors border-b-[3px]',
                  isActive
                    ? 'border-secondary text-primary-foreground bg-white/5'
                    : 'border-transparent text-primary-foreground/70 hover:bg-white/5 hover:text-primary-foreground',
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 rounded-none h-9 w-9 focus-visible:ring-0"
        >
          <Search className="w-[18px] h-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 rounded-none h-9 w-9 focus-visible:ring-0"
          onClick={() => navigate('/configuracoes')}
        >
          <Settings className="w-[18px] h-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 rounded-none h-9 w-9 relative focus-visible:ring-0"
          onClick={() => navigate('/ajuda')}
        >
          <HelpCircle className="w-[18px] h-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10 rounded-none h-9 w-9 relative focus-visible:ring-0"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-[6px] right-[6px] w-[8px] h-[8px] bg-secondary rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-8 h-8 ml-2 cursor-pointer border border-primary-foreground/30 hover:border-primary-foreground transition-colors bg-white/10 rounded-none">
              <AvatarImage
                src={`https://img.usecurling.com/ppl/thumbnail?gender=female&seed=${user?.id || 1}`}
              />
              <AvatarFallback className="bg-transparent text-xs text-primary-foreground rounded-none">
                {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 mt-2 rounded-none border-border shadow-md"
          >
            <DropdownMenuItem className="text-foreground flex items-center py-2 px-3 font-medium cursor-pointer rounded-none">
              <UserIcon className="w-[14px] h-[14px] mr-2 text-muted-foreground" /> Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={signOut}
              className="text-destructive focus:bg-destructive/10 cursor-pointer py-2 px-3 font-medium border-t border-border mt-1 rounded-none"
            >
              <LogOut className="w-[14px] h-[14px] mr-2" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/30 font-sans text-foreground">
      <TopNav />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto w-full p-6 md:p-8 animate-in fade-in duration-500">
          <Suspense
            fallback={
              <div className="py-20 flex flex-col items-center justify-center text-muted-foreground animate-pulse gap-3">
                <div className="w-6 h-6 rounded-full border-[3px] border-secondary border-t-transparent animate-spin" />
                <span className="text-[13px] font-medium">Carregando...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
