import { useProcessosList } from '@/hooks/useProcessosList'
import { ProcessosListTable } from '@/components/operacional/ProcessosListTable'
import { ProcessosListFilters } from '@/components/operacional/ProcessosListFilters'

export default function Processos() {
  const state = useProcessosList()

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold tracking-tight text-foreground mb-1">Processos</h1>
        <p className="text-[14px] text-muted-foreground font-medium">
          Acompanhamento de investigações
        </p>
      </div>

      <div className="sticky top-0 z-20 bg-card border-b border-border py-4 px-4 md:px-6 -mx-4 md:-mx-6 mb-6 animate-in slide-in-from-top-4 duration-200 shadow-sm">
        <ProcessosListFilters {...state} />
      </div>

      <ProcessosListTable
        processos={state.data}
        loading={state.loading}
        hasMore={state.hasMore}
        onLoadMore={state.loadMore}
        rawCount={state.rawCount}
      />
    </div>
  )
}
