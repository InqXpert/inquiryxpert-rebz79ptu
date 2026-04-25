import { Suspense, useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { Bell, Settings, User as UserIcon, LogOut, Moon, Sun, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { useCurrentUser } from '@/hooks/use-current-user'
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
  const { avatarUrl } = useCurrentUser()
  const { theme, setTheme } = useTheme()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { title: 'DASHBOARD', url: '/' },
    { title: 'PROCESSOS', url: '/processos' },
    { title: 'AGENTES', url: '/agentes' },
    ...(user?.role === 'c-level' || user?.role === 'admin'
      ? [{ title: 'FINANCEIRO', url: '/financeiro' }]
      : []),
    ...(user?.role === 'c-level' || user?.role === 'admin'
      ? [{ title: 'GESTÃO DE USUÁRIOS', url: '/gestao-usuarios' }]
      : []),
    { title: 'PORTAL DO AGENTE', url: '/gestao-agentes' },
  ]

  const isActive = (url: string) => {
    if (url === '/' && location.pathname !== '/') return false
    return location.pathname.startsWith(url)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const NavLinksMobile = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex flex-col gap-2 p-4">
      {navItems.map((item) => {
        const active = isActive(item.url)
        return (
          <Link
            key={item.title}
            to={item.url}
            onClick={onClick}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              active
                ? 'bg-brand-cyan/10 text-brand-cyan'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </div>
  )

  const NavLinksDesktop = () => (
    <nav className="hidden xl:flex items-center gap-1 mx-6">
      {navItems.map((item) => {
        const active = isActive(item.url)
        return (
          <Link
            key={item.title}
            to={item.url}
            className={cn(
              'px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200 tracking-wide',
              active
                ? 'bg-brand-cyan/10 text-brand-cyan'
                : 'text-brand-navy dark:text-brand-light hover:bg-muted hover:text-foreground',
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen flex bg-background font-sans">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 h-16 flex items-center justify-between px-4 sm:px-6 bg-card border-b border-border z-20 shrink-0">
          <div className="flex items-center">
            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden mr-2 text-foreground hover:bg-muted focus-visible:ring-primary"
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
                      <div className="w-8 h-8 rounded bg-brand-cyan flex items-center justify-center font-bold text-sm text-white shadow-sm">
                        IH
                      </div>
                      <span className="font-bold text-xl tracking-tight text-brand-navy dark:text-white">
                        Inquiry HUB
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                  <NavLinksMobile onClick={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-brand-cyan flex items-center justify-center font-bold text-sm text-white shadow-sm">
                IH
              </div>
              <span className="font-bold text-xl tracking-tight text-brand-navy dark:text-white hidden sm:inline-block">
                Inquiry HUB
              </span>
            </Link>

            {/* Desktop Navigation */}
            <NavLinksDesktop />
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
              aria-label="Notificações"
              onClick={() => navigate('/notificacoes')}
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
                    <AvatarImage src={avatarUrl || ''} className="object-cover" />
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
        <main className="flex-1 flex flex-col bg-background/50">
          <div className="w-full max-w-7xl mx-auto flex flex-col p-4 sm:p-6 lg:p-8 flex-1">
            <Suspense
              fallback={
                <div className="w-full flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
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
