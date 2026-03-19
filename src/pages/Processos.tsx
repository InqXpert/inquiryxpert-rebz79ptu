import { useState } from 'react'
import { useOperacionalDashboard } from '@/hooks/useOperacionalDashboard'
import { ProcessosOperacionaisTable } from '@/components/operacional/ProcessosOperacionaisTable'
import { DashboardFilters } from '@/components/operacional/DashboardFilters'
import { ProcessoDetailModal } from '@/components/operacional/ProcessoDetailModal'
import { ImportOperacionalDataModal } from '@/components/operacional/ImportOperacionalDataModal'
import { exportToExcel } from '@/services/procesosOperacionais'
import { useToast } from '@/hooks/use-toast'
import { Card } from '@/components/ui/card'

export default function Processos() {
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
      toast({ title: 'Erro', description: 'Erro ao exportar.', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Processos</h1>
          <p className="text-muted-foreground mt-1">
            Gerenciamento operacional de solicitações e andamentos.
          </p>
        </div>
      </div>

      <Card className="p-4 shadow-sm border-none rounded-2xl">
        <DashboardFilters
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          onExport={handleExport}
          onImport={() => setIsImportModalOpen(true)}
          canExport={canExport()}
          canImport={canImport()}
        />
      </Card>

      <Card className="shadow-sm border-none rounded-2xl overflow-hidden pt-2">
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
        onComplete={fetchProcessos}
      />
    </div>
  )
}
