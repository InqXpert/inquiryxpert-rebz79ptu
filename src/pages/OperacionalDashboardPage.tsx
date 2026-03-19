import { useState } from 'react'
import { useOperacionalDashboard } from '@/hooks/useOperacionalDashboard'
import { DashboardFilters } from '@/components/operacional/DashboardFilters'
import { DashboardKPIs } from '@/components/operacional/DashboardKPIs'
import { ProcessosOperacionaisTable } from '@/components/operacional/ProcessosOperacionaisTable'
import { ProcessoDetailModal } from '@/components/operacional/ProcessoDetailModal'
import { exportToExcel } from '@/services/procesosOperacionais'
import { useToast } from '@/hooks/use-toast'

export default function OperacionalDashboardPage() {
  const {
    processos,
    loading,
    filters,
    pagination,
    setPagination,
    setFilters,
    clearFilters,
    canExport,
    canImport,
    fetchProcessos,
  } = useOperacionalDashboard()

  const [selectedProcessoId, setSelectedProcessoId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleExport = async () => {
    try {
      await exportToExcel(processos)
      toast({ title: 'Sucesso', description: 'Exportação concluída.' })
    } catch (e) {
      toast({ title: 'Erro', description: 'Erro na exportação.', variant: 'destructive' })
    }
  }

  const handleImport = () => {
    toast({ title: 'Info', description: 'Funcionalidade de importação em desenvolvimento.' })
  }

  return (
    <div className="bg-background min-h-full">
      <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-[20px]">
        <div className="mb-0">
          <h1 className="text-[28px] font-bold text-foreground mb-[4px]">
            Visão Geral Operacional
          </h1>
          <p className="text-[14px] text-muted-foreground mb-[24px]">
            Acompanhamento de todos os processos em andamento
          </p>
        </div>

        <DashboardFilters
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          onExport={handleExport}
          onImport={handleImport}
          canExport={canExport()}
          canImport={canImport()}
        />

        <DashboardKPIs processos={processos} loading={loading} />

        <ProcessosOperacionaisTable
          processos={processos}
          loading={loading}
          onViewDetail={setSelectedProcessoId}
          pagination={pagination}
          setPagination={setPagination}
        />

        <ProcessoDetailModal
          processoId={selectedProcessoId}
          isOpen={!!selectedProcessoId}
          onClose={() => setSelectedProcessoId(null)}
          onUpdated={fetchProcessos}
        />
      </div>
    </div>
  )
}
