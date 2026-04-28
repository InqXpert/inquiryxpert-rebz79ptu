import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'

interface Props {
  despesaId: string
  honorario: number
  despesas: number
  iss: number
  dataRecebimento: string
  totalAPagar: number
  userRole?: string
  onSuccess: () => void
}

export function EditarRecebiveisModal({
  despesaId,
  honorario,
  despesas,
  iss,
  dataRecebimento,
  totalAPagar,
  userRole,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<any>({
    honorario_a_receber: honorario || 0,
    despesas_a_receber: despesas || 0,
    iss: iss || 0,
    data_recebimento: dataRecebimento ? dataRecebimento.substring(0, 10) : '',
  })

  // Automatically calculated values
  const numHonorario = Number(form.honorario_a_receber) || 0
  const numDespesas = Number(form.despesas_a_receber) || 0
  const numIss = Number(form.iss) || 0

  const totalAReceber = numHonorario + numDespesas + numIss
  const liquido = totalAReceber - totalAReceber * 0.2
  const margem = totalAReceber > 0 ? ((totalAReceber - totalAPagar) / totalAReceber) * 100 : 0

  const canEdit = userRole === 'c-level' || userRole === 'admin'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'data_recebimento') {
      setForm((prev: any) => ({ ...prev, [name]: value }))
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value === '' ? '' : parseFloat(value) }))
    }
  }

  const handleSave = async () => {
    if (numHonorario < 0 || numDespesas < 0 || numIss < 0) {
      toast({
        title: 'Valores inválidos',
        description: 'Os valores não podem ser negativos.',
        variant: 'destructive',
      })
      return
    }

    if (form.data_recebimento) {
      const today = new Date().toISOString().split('T')[0]
      if (form.data_recebimento > today) {
        toast({
          title: 'Data inválida',
          description: 'A data de recebimento não pode ser no futuro.',
          variant: 'destructive',
        })
        return
      }
    }

    if (totalAReceber === 0) {
      toast({
        title: 'Aviso',
        description: 'Total a receber não pode ser zero',
        variant: 'destructive',
      })
      return
    }

    try {
      setLoading(true)
      await pb.collection('processos_despesas').update(despesaId, {
        honorario_a_receber: numHonorario,
        despesas_a_receber: numDespesas,
        iss: numIss,
        total_a_receber: totalAReceber,
        data_recebimento: form.data_recebimento ? `${form.data_recebimento} 12:00:00` : null,
        liquido: liquido,
        margem: margem,
      })
      toast({
        title: 'Sucesso',
        description: 'Valores a receber atualizados com sucesso',
      })
      setOpen(false)
      onSuccess()
    } catch (err) {
      console.error(err)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={!canEdit}
          className="h-8 px-2"
          title={!canEdit ? 'Apenas C-Level e Admin podem editar' : 'Editar Valores'}
        >
          <Pencil className="w-4 h-4 text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Valores a Receber</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Honorário a Receber (R$)</Label>
              <Input
                type="number"
                name="honorario_a_receber"
                value={form.honorario_a_receber}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label>Despesas a Receber (R$)</Label>
              <Input
                type="number"
                name="despesas_a_receber"
                value={form.despesas_a_receber}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label>ISS (R$)</Label>
              <Input
                type="number"
                name="iss"
                value={form.iss}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label>Data de Recebimento</Label>
              <Input
                type="date"
                name="data_recebimento"
                value={form.data_recebimento}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-md space-y-3 mt-2">
            <h4 className="text-sm font-semibold mb-2">Cálculos Automáticos</h4>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total a Pagar (Agente)</span>
              <span className="font-medium text-red-600">R$ {totalAPagar.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total a Receber</span>
              <span className="font-semibold text-green-600">R$ {totalAReceber.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Líquido (-20%)</span>
              <span className="font-semibold">R$ {liquido.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Margem (%)</span>
              <span className="font-semibold">{margem.toFixed(2)}%</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading || totalAReceber === 0}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
