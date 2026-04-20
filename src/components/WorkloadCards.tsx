import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { useWorkloadStats } from '@/hooks/use-workload-stats'
import { cn } from '@/lib/utils'

export function WorkloadCards({ userId }: { userId?: string }) {
  const { counts, loading, error } = useWorkloadStats(userId)
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro',
        description: 'Nao foi possivel carregar carga de trabalho',
        variant: 'destructive',
      })
    }
  }, [error, toast])

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">Status de Trabalho</h2>
      <div
        className={cn(
          'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
          loading && 'pointer-events-none',
        )}
      >
        <Card className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105 border-border">
          <div
            className="w-8 h-8 text-2xl flex items-center justify-center"
            role="img"
            aria-label="blue circle icon"
          >
            🔵
          </div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
            EM ANALISE
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <div className="text-3xl font-bold text-foreground">{counts.emAnalise}</div>
          )}
        </Card>

        <Card className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105 border-border">
          <div
            className="w-8 h-8 text-2xl flex items-center justify-center"
            role="img"
            aria-label="yellow circle icon"
          >
            🟡
          </div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
            EM EXECUCAO
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <div className="text-3xl font-bold text-foreground">{counts.emExecucao}</div>
          )}
        </Card>

        <Card className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105 border-border">
          <div
            className="w-8 h-8 text-2xl flex items-center justify-center"
            role="img"
            aria-label="orange circle icon"
          >
            🟠
          </div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
            EM ELABORACAO
          </div>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <div className="text-3xl font-bold text-foreground">{counts.emElaboracao}</div>
          )}
        </Card>

        <Card className="bg-card rounded-lg p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-h-24 transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105 border-border">
          <div
            className="w-8 h-8 text-2xl flex items-center justify-center"
            role="img"
            aria-label="green circle icon"
          >
            🟢
          </div>
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
}
