import { useState } from 'react'
import { useOperacionalDashboard } from '@/hooks/useOperacionalDashboard'
import { DashboardFilters } from '@/components/operacional/DashboardFilters'
import { DashboardKPIs } from '@/components/operacional/DashboardKPIs'
import { ProcessosOperacionaisTable } from '@/components/operacional/ProcessosOperacionaisTable'
import { ProcessoDetailModal } from '@/components/operacional/ProcessoDetailModal'
import { ImportOperacionalDataModal } from '@/components/operacional/ImportOperacionalDataModal'
import { exportToExcel } from '@/services/procesosOperacionais'
import { useToast } from '@/hooks/use-toast'
import { Card } from '@/components/ui/card'

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
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    try {
      await exportToExcel(processos)
      toast({ title: 'Sucesso', description: 'Planilha exportada com sucesso!' })
    } catch (e) {
      toast({
        title: 'Erro',
        description: 'Erro ao exportar. Tente novamente.',
        variant: 'destructive',
      })
    }
  }

  const handleImportClick = () => {
    setIsImportModalOpen(true)
  }

  const handleImportComplete = () => {
    setIsImportModalOpen(false)
    fetchProcessos()
  }

  return (
    <div className="bg-background min-h-full">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Visão Geral Operacional
          </h1>
          <p className="text-base text-muted-foreground">
            Acompanhamento de todos os processos em andamento
          </p>
        </div>

        <Card className="p-5 shadow-sm border border-border/50 rounded-2xl bg-card">
          <DashboardFilters
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            onExport={handleExport}
            onImport={handleImportClick}
            canExport={canExport()}
            canImport={canImport()}
          />
        </Card>

        <DashboardKPIs processos={processos} loading={loading} />

        <Card className="shadow-sm border border-border/50 rounded-2xl overflow-hidden bg-card mt-6">
          <ProcessosOperacionaisTable
            processos={processos}
            loading={loading}
            onViewDetail={setSelectedProcessoId}
            pagination={pagination}
            setPagination={setPagination}
          />
        </Card>

        <ProcessoDetailModal
          processoId={selectedProcessoId}
          isOpen={!!selectedProcessoId}
          onClose={() => setSelectedProcessoId(null)}
          onUpdated={fetchProcessos}
        />

        <ImportOperacionalDataModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onComplete={handleImportComplete}
        />
      </div>
    </div>
  )
}
