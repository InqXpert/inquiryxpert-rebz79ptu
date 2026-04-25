import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2 } from 'lucide-react'
import { useCanDelete } from '@/hooks/useCanDelete'
import { useState } from 'react'
import { DoubleConfirmDialog } from '@/components/DoubleConfirmDialog'
import { batchSoftDeleteProcessos } from '@/services/processosService'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { Processo } from '@/types/processo'

export function ProcessosBatchToolbar({
  selectedIds,
  setSelectedIds,
  processos,
  onRefresh,
}: {
  selectedIds: string[]
  setSelectedIds: (ids: string[]) => void
  processos: Processo[]
  onRefresh: () => void
}) {
  const canDelete = useCanDelete()
  const { user } = useAuth()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!canDelete || selectedIds.length === 0) return null

  const handleSelectAll = () => {
    if (selectedIds.length === processos.length || selectedIds.length === 100) {
      setSelectedIds([])
    } else {
      const allIds = processos.map((p) => p.id).slice(0, 100)
      setSelectedIds(allIds)
      if (processos.length > 100) {
        toast.warning('A seleção foi limitada a 100 processos.')
      }
    }
  }

  const handleBatchDelete = async () => {
    setLoading(true)
    try {
      await batchSoftDeleteProcessos(selectedIds, user?.id)
      toast.success(`${selectedIds.length} processos foram deletados com sucesso.`)
      onRefresh()
    } catch (e) {
      toast.error('Erro ao deletar processos.')
    } finally {
      setLoading(false)
      setConfirmOpen(false)
    }
  }

  return (
    <>
      <div className="bg-card rounded-lg p-3 shadow-sm border border-border flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
        <div className="flex items-center gap-4 pl-2">
          <Checkbox
            checked={
              selectedIds.length > 0 && selectedIds.length === Math.min(processos.length, 100)
            }
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm font-bold">{selectedIds.length} processos selecionados</span>
          <Button variant="link" size="sm" onClick={() => setSelectedIds([])} className="h-8">
            Limpar
          </Button>
        </div>
        <div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setConfirmOpen(true)}
            className="h-8 font-bold"
            disabled={loading}
          >
            <Trash2 className="w-4 h-4 mr-2" /> Deletar Selecionados
          </Button>
        </div>
      </div>

      <DoubleConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Deletar Processos em Lote"
        description={`Tem certeza que deseja deletar ${selectedIds.length} processos?`}
        onConfirm={handleBatchDelete}
      />
    </>
  )
}
