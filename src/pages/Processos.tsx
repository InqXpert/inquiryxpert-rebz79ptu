import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useOperacionalDashboard } from '@/hooks/useOperacionalDashboard'
import { ProcessosOperacionaisTable } from '@/components/operacional/ProcessosOperacionaisTable'
import { DashboardFilters } from '@/components/operacional/DashboardFilters'
import { ProcessoDetailModal } from '@/components/operacional/ProcessoDetailModal'
import { ImportOperacionalDataModal } from '@/components/operacional/ImportOperacionalDataModal'
import { NewProcessoModal } from '@/components/operacional/NewProcessoModal'
import { exportToCSV } from '@/services/procesosOperacionais'
import { useToast } from '@/hooks/use-toast'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

  const location = useLocation()
  const navigate = useNavigate()

  const [selectedProcessoId, setSelectedProcessoId] = useState<string | null>(null)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [defaultProvider, setDefaultProvider] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    if (location.state?.openNewProcess) {
      setDefaultProvider(location.state.providerName || '')
      setIsNewModalOpen(true)
      // Clean up state so refresh doesn't reopen modal
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const handleExport = async () => {
    try {
      await exportToCSV(processos)
      toast({ title: 'Sucesso', description: 'Arquivo CSV exportado com sucesso!' })
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
        <Button
          className="rounded-xl shadow-sm px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12"
          onClick={() => {
            setDefaultProvider('')
            setIsNewModalOpen(true)
          }}
        >
          <Plus className="w-5 h-5 mr-2" /> NOVO PROCESSO
        </Button>
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

      <NewProcessoModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        defaultProvider={defaultProvider}
        onCreated={fetchProcessos}
      />
    </div>
  )
}
