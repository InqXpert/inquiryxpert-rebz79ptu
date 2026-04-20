import React, { lazy, Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
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
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans relative">
      {/* Main Content Column */}
      <div className="flex-1 space-y-6 min-w-0">
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
      </div>

      {/* Right Column (Desktop) / Bottom Stack (Mobile & Tablet) */}
      <div className="flex lg:w-[350px] flex-col shrink-0 gap-6 w-full lg:mt-0 mt-2">
        <div className="lg:hidden flex items-center justify-between border-b border-border pb-2 mb-2">
          <h3 className="text-lg font-bold text-foreground">Painel de Acompanhamento</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
          <div className="min-h-[450px] flex flex-col">
            <ZoneErrorBoundary zoneName="Calendário">
              <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                <InteractiveCalendar />
              </Suspense>
            </ZoneErrorBoundary>
          </div>
          <div className="min-h-[300px] flex flex-col">
            <ZoneErrorBoundary zoneName="Notificações">
              <Suspense fallback={<Skeleton className="h-full w-full rounded-lg" />}>
                <NotificationsPanel />
              </Suspense>
            </ZoneErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}
