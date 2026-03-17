import { Bell, Search } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function AppHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h2 className="text-2xl font-bold tracking-tight text-primary">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="w-64 rounded-full bg-card pl-10 shadow-subtle"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full bg-card shadow-subtle hover:bg-muted"
        >
          <Bell className="h-5 w-5 text-primary" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-card" />
        </Button>
      </div>
    </header>
  )
}
