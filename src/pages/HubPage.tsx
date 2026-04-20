import React, { lazy, Suspense } from 'react'
import { Menu } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { HubPageProvider } from '@/contexts/hub-page-context'
import { ZoneErrorBoundary } from '@/components/hub/ZoneErrorBoundary'

const UserGreeting = lazy(() =>
  import('@/components/UserGreeting').then((m) => ({ default: m.UserGreeting })),
)
const AlertsBlock = lazy(() =>
  import('@/components/dashboard/AlertsBlock').then((m) => ({ default: m.AlertsBlock })),
)
const WorkloadCards = lazy(() =>
  import('@/components/WorkloadCards').then((m) => ({ default: m.WorkloadCards })),
)
const PerformanceSection = lazy(() =>
  import('@/components/PerformanceSection').then((m) => ({ default: m.PerformanceSection })),
)
const InteractiveCalendar = lazy(() =>
  import('@/components/InteractiveCalendar').then((m) => ({ default: m.InteractiveCalendar })),
)
const NotificationsPanel = lazy(() =>
  import('@/components/NotificationsPanel').then((m) => ({ default: m.NotificationsPanel })),
)

export default function HubPage() {
  return (
    <HubPageProvider>
      <div className="flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans relative">
        {/* Left Column (Main Content) */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Mobile/Tablet Trigger for Sidebar Sheet */}
          <div className="md:hidden flex justify-end mb-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Menu className="w-4 h-4" />
                  Ver Calendário e Notificações
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-sm overflow-y-auto bg-background p-6"
              >
                <SheetTitle className="sr-only">Calendário e Notificações</SheetTitle>
                <SheetDescription className="sr-only">
                  Painel lateral com calendário e notificações.
                </SheetDescription>
                <div className="flex flex-col gap-6 mt-6 h-full">
                  <ZoneErrorBoundary zoneName="Calendário (Mobile)">
                    <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
                      <InteractiveCalendar />
                    </Suspense>
                  </ZoneErrorBoundary>
                  <ZoneErrorBoundary zoneName="Notificações (Mobile)">
                    <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
                      <NotificationsPanel />
                    </Suspense>
                  </ZoneErrorBoundary>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <ZoneErrorBoundary zoneName="Boas-vindas">
            <Suspense fallback={<Skeleton className="h-[120px] w-full rounded-lg" />}>
              <UserGreeting />
            </Suspense>
          </ZoneErrorBoundary>

          <ZoneErrorBoundary zoneName="Alertas Críticos">
            <Suspense fallback={<Skeleton className="h-[250px] w-full rounded-lg" />}>
              <AlertsBlock />
            </Suspense>
          </ZoneErrorBoundary>

          <ZoneErrorBoundary zoneName="Status de Trabalho">
            <Suspense fallback={<Skeleton className="h-[160px] w-full rounded-lg" />}>
              <WorkloadCards />
            </Suspense>
          </ZoneErrorBoundary>

          <ZoneErrorBoundary zoneName="Performance Pessoal">
            <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
              <PerformanceSection />
            </Suspense>
          </ZoneErrorBoundary>

          {/* Tablet view: Render Sidebar elements below main content */}
          <div className="hidden md:flex lg:hidden flex-col gap-6 mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-bold text-foreground mb-2">Painel de Acompanhamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
              <ZoneErrorBoundary zoneName="Calendário">
                <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                  <InteractiveCalendar />
                </Suspense>
              </ZoneErrorBoundary>
              <ZoneErrorBoundary zoneName="Notificações">
                <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                  <NotificationsPanel />
                </Suspense>
              </ZoneErrorBoundary>
            </div>
          </div>
        </div>

        {/* Right Column (Desktop only sidebar) */}
        <div className="hidden lg:flex w-[350px] flex-col shrink-0">
          <div className="sticky top-6 flex flex-col gap-6 h-[calc(100vh-3rem)]">
            <div className="flex-1 min-h-[450px]">
              <ZoneErrorBoundary zoneName="Calendário">
                <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                  <InteractiveCalendar />
                </Suspense>
              </ZoneErrorBoundary>
            </div>
            <div className="flex-1 min-h-[300px]">
              <ZoneErrorBoundary zoneName="Notificações">
                <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                  <NotificationsPanel />
                </Suspense>
              </ZoneErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </HubPageProvider>
  )
}
