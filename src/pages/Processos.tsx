import { useProcessosList } from '@/hooks/useProcessosList'
import { ProcessosListTable } from '@/components/operacional/ProcessosListTable'
import { ProcessosListFilters } from '@/components/operacional/ProcessosListFilters'

export default function Processos() {
  const state = useProcessosList()

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-brand-navy dark:text-white mb-2">
          Processos
        </h1>
        <p className="text-[14px] text-brand-gray dark:text-brand-light font-medium">
          Acompanhamento de investigacoes
        </p>
      </div>

      <div className="sticky top-0 z-20 bg-background/95 pb-4 pt-2 backdrop-blur-sm -mx-4 px-4 md:-mx-6 md:px-6">
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
