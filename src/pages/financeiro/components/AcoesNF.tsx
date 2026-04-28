import { useState } from 'react'
import { FilePlus, Edit, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Props {
  despesaId: string
  nfNumero: string
  dataEmissao: string
  issValue: number
  totalAReceber: number
  totalAPagar: number
  dataRecebimento: string
  userRole: string | undefined
  onSuccess: () => void
}

export function AcoesNF({
  despesaId,
  nfNumero,
  dataEmissao,
  issValue,
  totalAReceber,
  totalAPagar,
  dataRecebimento,
  userRole,
  onSuccess,
}: Props) {
  const isAdmin = userRole === 'c-level' || userRole === 'admin'
  const [modalOpen, setModalOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    nf_numero: '',
    data_emissao_nf: '',
    descricao: '',
    iss: 0,
  })

  if (!isAdmin) {
    return <span className="text-muted-foreground text-xs italic">Sem permissão</span>
  }

  const isEditing = !!nfNumero
  const isCancelDisabled = !!dataRecebimento

  const openModal = () => {
    setFormData({
      nf_numero: nfNumero || '',
      data_emissao_nf: dataEmissao
        ? dataEmissao.split(' ')[0]
        : new Date().toISOString().split('T')[0],
      descricao: '',
      iss: issValue || 0,
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.nf_numero || !formData.data_emissao_nf) {
      toast.error('Preencha os campos obrigatórios.')
      return
    }

    setIsLoading(true)
    try {
      const filter = `nf_numero = "${formData.nf_numero}" && id != "${despesaId}"`
      const duplicates = await pb.collection('processos_despesas').getList(1, 1, { filter })

      if (duplicates.items.length > 0) {
        toast.error('Número de NF já existe em outro processo.')
        setIsLoading(false)
        return
      }

      const issNum = Number(formData.iss) || 0
      const liquido = totalAReceber - issNum

      let margem = 100
      if (totalAPagar > 0 && totalAReceber > 0) {
        margem = ((totalAReceber - totalAPagar) / totalAReceber) * 100
      }

      await pb.collection('processos_despesas').update(despesaId, {
        nf_numero: formData.nf_numero,
        data_emissao_nf: `${formData.data_emissao_nf} 12:00:00.000Z`,
        iss: issNum,
        liquido: liquido,
        margem: margem,
      })

      toast.success(isEditing ? 'NF atualizada com sucesso' : 'NF gerada com sucesso')
      setModalOpen(false)
      onSuccess()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar NF. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    setIsLoading(true)
    try {
      let margem = 100
      if (totalAPagar > 0 && totalAReceber > 0) {
        margem = ((totalAReceber - totalAPagar) / totalAReceber) * 100
      }

      await pb.collection('processos_despesas').update(despesaId, {
        nf_numero: '',
        data_emissao_nf: '',
        iss: 0,
        liquido: totalAReceber,
        margem: margem,
      })

      toast.success('NF cancelada com sucesso')
      setCancelOpen(false)
      onSuccess()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cancelar NF. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const calculatedLiquido = totalAReceber - (Number(formData.iss) || 0)

  return (
    <div className="flex items-center gap-2 justify-center">
      {!isEditing && totalAReceber > 0 && (
        <Button
          size="sm"
          variant="outline"
          className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 whitespace-nowrap"
          onClick={openModal}
        >
          <FilePlus className="w-4 h-4 mr-1" />
          Gerar NF
        </Button>
      )}

      {isEditing && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="text-gray-600 border-gray-300 hover:bg-gray-100 whitespace-nowrap"
            onClick={openModal}
          >
            <Edit className="w-4 h-4 mr-1" />
            Editar NF
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            onClick={() => setCancelOpen(true)}
            disabled={isCancelDisabled}
            title={
              isCancelDisabled
                ? 'Não é possível cancelar NF com data de recebimento preenchida'
                : ''
            }
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Cancelar NF
          </Button>
        </>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Nota Fiscal' : 'Gerar Nota Fiscal'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nf_numero" className="text-right">
                Número NF *
              </Label>
              <Input
                id="nf_numero"
                value={formData.nf_numero}
                onChange={(e) => setFormData({ ...formData, nf_numero: e.target.value })}
                className="col-span-3"
                placeholder="Ex: 20230001"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="data_emissao" className="text-right">
                Data Emissão *
              </Label>
              <Input
                id="data_emissao"
                type="date"
                value={formData.data_emissao_nf}
                onChange={(e) => setFormData({ ...formData, data_emissao_nf: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-right">
                Descrição
              </Label>
              <Input
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="col-span-3"
                placeholder="Opcional"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Valor Total</Label>
              <Input
                value={new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalAReceber)}
                disabled
                className="col-span-3 bg-muted"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="iss" className="text-right">
                ISS (R$)
              </Label>
              <Input
                id="iss"
                type="number"
                step="0.01"
                min="0"
                value={formData.iss}
                onChange={(e) => setFormData({ ...formData, iss: parseFloat(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Líquido</Label>
              <Input
                value={new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(calculatedLiquido)}
                disabled
                className="col-span-3 bg-muted font-bold text-green-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEditing ? 'Atualizar' : 'Gerar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar NF</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar esta NF? Os dados de número da NF e ISS serão
              removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Voltar</AlertDialogCancel>
            <Button variant="destructive" onClick={handleCancel} disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
