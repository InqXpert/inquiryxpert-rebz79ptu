import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { usuariosService } from '@/services/usuariosService'
import { toast } from 'sonner'
import { Download, FileText, CheckSquare, Square } from 'lucide-react'
import { trackAcao } from '@/utils/trackAcao'

const COLUMNS = [
  { id: 'name', label: 'Nome Completo' },
  { id: 'email', label: 'E-mail' },
  { id: 'role', label: 'Papel (Role)' },
  { id: 'status_conta', label: 'Status' },
  { id: 'tempo_uso_total', label: 'Tempo de Uso (min)' },
  { id: 'ultimo_login', label: 'Último Login' },
  { id: 'two_fa_enabled', label: '2FA Habilitado' },
  { id: 'created', label: 'Data de Criação' },
]

export function ExportUsuariosModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState<string[]>(COLUMNS.map((c) => c.id))
  const [loading, setLoading] = useState(false)

  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const toggleAll = () =>
    setSelected(selected.length === COLUMNS.length ? [] : COLUMNS.map((c) => c.id))

  const handleExport = async (format: 'csv' | 'xlsx') => {
    if (selected.length === 0) return toast.error('Selecione ao menos uma coluna.')
    setLoading(true)
    const tId = toast.loading(`Gerando arquivo ${format.toUpperCase()}...`)

    try {
      const users = await usuariosService.fetchUsuarios()

      const headerRow = COLUMNS.filter((c) => selected.includes(c.id))
        .map((c) => `"${c.label}"`)
        .join(',')
      const rows = users.map((u) => {
        return COLUMNS.filter((c) => selected.includes(c.id))
          .map((c) => {
            let val = (u as any)[c.id] || ''
            if (c.id === 'two_fa_enabled') val = val ? 'Sim' : 'Não'
            return `"${String(val).replace(/"/g, '""')}"`
          })
          .join(',')
      })

      const csvContent = [headerRow, ...rows].join('\n')

      const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvContent], {
        type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.ms-excel',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `usuarios-${new Date().toISOString().split('T')[0]}.${format}`
      link.click()

      await trackAcao(
        'exportar_dados',
        `Exportou ${users.length} usuários em formato ${format.toUpperCase()}`,
      )
      toast.success('Arquivo exportado com sucesso', { id: tId })
      onClose()
    } catch (e) {
      toast.error('Erro ao exportar dados', { id: tId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-brand-cyan" /> Exportar Usuários
          </DialogTitle>
          <DialogDescription>
            Selecione as colunas desejadas e o formato do arquivo para download.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-brand-teal/30">
            <span className="text-sm font-bold text-brand-navy dark:text-white">
              Colunas Disponíveis
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAll}
              className="h-8 text-xs text-brand-cyan"
            >
              {selected.length === COLUMNS.length ? (
                <Square className="w-4 h-4 mr-1" />
              ) : (
                <CheckSquare className="w-4 h-4 mr-1" />
              )}
              {selected.length === COLUMNS.length ? 'Desmarcar Todas' : 'Marcar Todas'}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto p-1">
            {COLUMNS.map((c) => (
              <div key={c.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`col-${c.id}`}
                  checked={selected.includes(c.id)}
                  onCheckedChange={() => toggle(c.id)}
                />
                <label
                  htmlFor={`col-${c.id}`}
                  className="text-sm font-medium leading-none cursor-pointer text-brand-gray dark:text-brand-light"
                >
                  {c.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-brand-teal/30">
          <Button
            disabled={loading}
            variant="outline"
            className="w-full border-brand-teal text-brand-navy"
            onClick={() => handleExport('csv')}
          >
            <FileText className="w-4 h-4 mr-2 text-brand-gray" /> Baixar CSV
          </Button>
          <Button
            disabled={loading}
            className="w-full bg-brand-cyan text-white hover:bg-brand-cyan/90"
            onClick={() => handleExport('xlsx')}
          >
            <FileText className="w-4 h-4 mr-2 text-white" /> Baixar XLSX
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
