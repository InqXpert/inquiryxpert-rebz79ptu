import { Suspense } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Search, Bell, Settings, HelpCircle, User as UserIcon, LogOut } from 'lucide-react'
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
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/AppSidebar'

export default function Layout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-[64px] shrink-0 items-center justify-between gap-2 border-b bg-background px-4 lg:px-6 shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-2" />
            <div className="hidden md:flex items-center text-sm text-muted-foreground font-medium ml-2">
              Olá, {user?.name?.split(' ')[0] || 'Usuário'}!
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
              onClick={() => navigate('/configuracoes')}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary relative"
              onClick={() => navigate('/ajuda')}
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-[8px] right-[8px] w-2 h-2 bg-destructive rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full ml-2 focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <Avatar className="h-9 w-9 border border-border shadow-sm">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=female&seed=${user?.id || 1}`}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
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
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=female&seed=${user?.id || 1}`}
                    />
                    <AvatarFallback>
                      {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-semibold text-sm">{user?.name}</p>
                    <p className="w-[160px] truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3">
                  <Link to="/perfil" className="w-full flex items-center">
                    <UserIcon className="mr-2.5 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Meu Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 px-3">
                  <Link to="/configuracoes" className="w-full flex items-center">
                    <Settings className="mr-2.5 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Configurações</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={signOut}
                  className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive py-2.5 px-3"
                >
                  <LogOut className="mr-2.5 h-4 w-4" />
                  <span className="font-medium">Sair do sistema</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="mx-auto w-full p-6 lg:p-8 max-w-[1600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Suspense
              fallback={
                <div className="py-32 flex flex-col items-center justify-center text-muted-foreground animate-pulse gap-4">
                  <div className="w-8 h-8 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
                  <span className="text-sm font-medium tracking-wide">Carregando...</span>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
