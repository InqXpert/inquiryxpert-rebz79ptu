import React, { lazy, Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { ZoneErrorBoundary } from '@/components/hub/ZoneErrorBoundary'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'

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
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <ZoneErrorBoundary zoneName="Boas-vindas">
              <Suspense fallback={<Skeleton className="h-[120px] w-full rounded-lg" />}>
                <UserGreeting />
              </Suspense>
            </ZoneErrorBoundary>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
            <Link
              to="/processos/novo"
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:opacity-90 text-center transition-opacity"
            >
              Novo Processo
            </Link>
            <Button
              asChild
              className="bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold w-full shadow-md"
            >
              <Link to="/sindicancia/encaminhar">
                <ShieldAlert className="w-4 h-4 mr-2" />
                NOVA SINDICÂNCIA
              </Link>
            </Button>
          </div>
        </div>

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
