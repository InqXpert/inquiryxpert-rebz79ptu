import { memo } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useWorkloadStats } from '@/hooks/use-workload-stats'
import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'

export const WorkloadCards = memo(function WorkloadCards() {
  const { user } = useCurrentUser()
  const { counts, loading, error } = useWorkloadStats(user?.id)

  if (error) {
    throw error
  }

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">Status de Trabalho</h2>
      <div
        className={cn(
          'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
          loading && 'pointer-events-none',
        )}
      >
        <Card className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
            EM ANALISE
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <div className="text-3xl font-bold text-foreground">{counts.emAnalise}</div>
          )}
        </Card>

        <Card className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
            EM EXECUCAO
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <div className="text-3xl font-bold text-foreground">{counts.emExecucao}</div>
          )}
        </Card>

        <Card className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
            EM ELABORACAO
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <div className="text-3xl font-bold text-foreground">{counts.emElaboracao}</div>
          )}
        </Card>

        <Card className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 hover:shadow-md hover:scale-105 border-border">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
            CONCLUIDOS
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <div className="text-3xl font-bold text-foreground">{counts.concluidos}</div>
          )}
        </Card>
      </div>
    </section>
  )
})
