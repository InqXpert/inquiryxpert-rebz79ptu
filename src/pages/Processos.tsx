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
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8 pb-20 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-brand-navy dark:text-white mb-2">
            Processos
          </h1>
          <p className="text-[14px] text-brand-gray dark:text-brand-light font-medium">
            Gerenciamento operacional de solicitações e andamentos.
          </p>
        </div>
        <Button
          className="bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold h-11 px-6 rounded-lg shadow-sm"
          onClick={() => {
            setDefaultProvider('')
            setIsNewModalOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Novo Processo
        </Button>
      </div>

      <div className="p-4 md:p-6 bg-white dark:bg-brand-navy/80 rounded-xl border border-brand-teal dark:border-brand-cyan/50 shadow-sm">
        <DashboardFilters
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          onExport={handleExport}
          onImport={() => setIsImportModalOpen(true)}
          canExport={canExport()}
          canImport={canImport()}
        />
      </div>

      <div className="rounded-xl overflow-hidden border border-brand-teal dark:border-brand-cyan/50 bg-white dark:bg-brand-navy/80 shadow-sm mt-6">
        <ProcessosOperacionaisTable
          processos={processos}
          loading={loading}
          onViewDetail={setSelectedProcessoId}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>

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
