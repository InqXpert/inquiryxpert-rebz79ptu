import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'

interface Props {
  periodos: any[]
  onGenerate: (periodoId: string, vencimento: string) => Promise<void>
}

export function GerarNotaFiscalSheet({ periodos, onGenerate }: Props) {
  const [open, setOpen] = useState(false)
  const [periodoId, setPeriodoId] = useState('')
  const [vencimento, setVencimento] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!periodoId || !vencimento) return
    setLoading(true)
    try {
      await onGenerate(periodoId, vencimento)
      setOpen(false)
      setPeriodoId('')
      setVencimento('')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="inline-flex h-9 items-center justify-center rounded-md bg-[var(--primary,theme(colors.primary.DEFAULT))] px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50">
          <Plus className="mr-2 h-4 w-4" />
          Gerar NFs
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Gerar Faturamento</SheetTitle>
          <SheetDescription>
            Selecione um período fechado para calcular impostos e emitir a NF.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="periodo">Período Fechado</Label>
            <select
              id="periodo"
              value={periodoId}
              onChange={(e) => setPeriodoId(e.target.value)}
              required
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="" disabled>
                Selecione um período...
              </option>
              {periodos.length === 0 && <option disabled>Nenhum período disponível</option>}
              {periodos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.expand?.cliente_id?.razao_social} ({formatCurrency(p.faturamento_total)})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vencimento">Data de Vencimento</Label>
            <input
              id="vencimento"
              type="date"
              required
              value={vencimento}
              onChange={(e) => setVencimento(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !periodoId || !vencimento}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Gerando...' : 'Gerar NF'}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
