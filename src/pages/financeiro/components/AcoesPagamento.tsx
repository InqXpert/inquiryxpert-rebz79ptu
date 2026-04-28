import { useState } from 'react'
import { format } from 'date-fns'
import { Check, Edit2, DollarSign, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import pb from '@/lib/pocketbase/client'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  despesaId: string
  nfNumero: string
  dataRecebimento: string
  totalAReceber: number
  totalAPagar: number
  iss20: number
  liquido: number
  despesaComplemento: string
  userRole?: string
  onSuccess: () => void
}

export function AcoesPagamento({
  despesaId,
  nfNumero,
  dataRecebimento,
  totalAReceber,
  totalAPagar,
  iss20,
  liquido,
  despesaComplemento,
  userRole,
  onSuccess,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    data_recebimento: '',
    valor_recebido: 0,
    iss_20: 0,
    despesa_complemento: '',
  })

  const isPago = !!dataRecebimento
  const canEdit = userRole === 'c-level' || userRole === 'admin'

  const handleOpen = () => {
    setFormData({
      data_recebimento: dataRecebimento
        ? dataRecebimento.substring(0, 10)
        : format(new Date(), 'yyyy-MM-dd'),
      valor_recebido: isPago ? liquido + iss20 : totalAReceber,
      iss_20: iss20 || 0,
      despesa_complemento: despesaComplemento || '',
    })
    setIsOpen(true)
  }

  const handleSave = async () => {
    if (formData.valor_recebido > totalAReceber) {
      return toast.error('Valor Recebido não pode exceder o Total a Receber')
    }
    if (!formData.data_recebimento) {
      return toast.error('Data de Recebimento é obrigatória')
    }

    setIsLoading(true)
    try {
      const calcLiquido = formData.valor_recebido - formData.iss_20
      let calcMargem = 100
      if (totalAPagar > 0 && totalAReceber > 0) {
        calcMargem = ((totalAReceber - totalAPagar) / totalAReceber) * 100
      }

      await pb.collection('processos_despesas').update(despesaId, {
        data_recebimento: new Date(formData.data_recebimento + 'T12:00:00Z').toISOString(),
        iss_20: formData.iss_20,
        liquido: calcLiquido,
        despesa_complemento: formData.despesa_complemento,
        margem: calcMargem,
      })
      toast.success(
        isPago ? 'Pagamento atualizado com sucesso' : 'Pagamento registrado com sucesso',
      )
      setIsOpen(false)
      onSuccess()
    } catch (e) {
      toast.error('Erro ao registrar pagamento. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!nfNumero || nfNumero === '-') {
    return <div className="text-muted-foreground text-xs text-center md:text-left">-</div>
  }

  const liquidoCalc = formData.valor_recebido - formData.iss_20
  const isInvalid = formData.valor_recebido > totalAReceber

  return (
    <>
      <div className="flex items-center gap-2">
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : isPago ? (
          <>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Check className="w-3 h-3 mr-1" /> Pago
            </Badge>
            {canEdit && (
              <Button variant="ghost" size="icon" onClick={handleOpen} className="h-8 w-8">
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
          </>
        ) : (
          canEdit && (
            <Button
              size="sm"
              onClick={handleOpen}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <DollarSign className="w-4 h-4 mr-1" /> Registrar Pagamento
            </Button>
          )
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isPago ? 'Editar Pagamento' : 'Registrar Pagamento'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                Data Recebimento <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                value={formData.data_recebimento}
                onChange={(e) => setFormData({ ...formData, data_recebimento: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>
                Valor Recebido <span className="text-destructive">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.valor_recebido}
                onChange={(e) =>
                  setFormData({ ...formData, valor_recebido: parseFloat(e.target.value) || 0 })
                }
                className={isInvalid ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {isInvalid && (
                <p className="text-xs text-destructive flex items-center mt-1">
                  <AlertTriangle className="w-3 h-3 mr-1" /> Max:{' '}
                  {totalAReceber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>ISS 20% (Opcional)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.iss_20}
                onChange={(e) =>
                  setFormData({ ...formData, iss_20: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Líquido</Label>
              <Input
                type="text"
                readOnly
                value={liquidoCalc.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                className="bg-muted font-semibold"
              />
            </div>
            <div className="space-y-2">
              <Label>Despesa Complemento (Opcional)</Label>
              <Textarea
                value={formData.despesa_complemento}
                onChange={(e) => setFormData({ ...formData, despesa_complemento: e.target.value })}
                className="resize-none"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading || isInvalid || !formData.data_recebimento}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
