import { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
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
    <section className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-foreground">Status de Trabalho</h2>
      <div
        className={cn(
          'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
          loading && 'pointer-events-none',
        )}
      >
        <Card className="shadow-sm hover:shadow-md transition-shadow bg-card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-foreground">EM ANALISE</CardTitle>
            <span role="img" aria-label="blue circle icon" className="text-sm">
              🔵
            </span>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-foreground">{counts.emAnalise}</div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow bg-card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-foreground">EM EXECUCAO</CardTitle>
            <span role="img" aria-label="yellow circle icon" className="text-sm">
              🟡
            </span>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-foreground">{counts.emExecucao}</div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow bg-card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-foreground">EM ELABORACAO</CardTitle>
            <span role="img" aria-label="orange circle icon" className="text-sm">
              🟠
            </span>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-foreground">{counts.emElaboracao}</div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow bg-card">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-foreground">CONCLUIDOS</CardTitle>
            <span role="img" aria-label="green circle icon" className="text-sm">
              🟢
            </span>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold text-foreground">{counts.concluidos}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
