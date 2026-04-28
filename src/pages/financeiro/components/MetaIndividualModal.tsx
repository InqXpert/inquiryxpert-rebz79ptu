import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { getUsersForMetas } from '@/services/metasFinanceiras'
import { IndividualGoalData } from './MetasIndividuaisTab'

export interface MetaIndividualForm {
  usuario_id: string
  meta_receita: number
  meta_processos: number
  meta_margem: number
  periodo: string
  mes_inicio: number
  ano_inicio: number
}

interface MetaIndividualModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (meta: MetaIndividualForm) => void
  editingGoal?: IndividualGoalData | null
  existingGoals: IndividualGoalData[]
}

export function MetaIndividualModal({
  isOpen,
  onClose,
  onSave,
  editingGoal,
  existingGoals,
}: MetaIndividualModalProps) {
  const [users, setUsers] = useState<any[]>([])

  const [form, setForm] = useState<Partial<MetaIndividualForm>>({
    usuario_id: '',
    meta_receita: 0,
    meta_processos: 0,
    meta_margem: 0,
    periodo: 'mensal',
    mes_inicio: new Date().getMonth() + 1,
    ano_inicio: new Date().getFullYear(),
  })

  useEffect(() => {
    if (isOpen) {
      getUsersForMetas().then(setUsers)
      if (editingGoal) {
        setForm({
          usuario_id: editingGoal.usuario_id,
          meta_receita: editingGoal.meta_receita,
          meta_processos: editingGoal.meta_processos,
          meta_margem: editingGoal.meta_margem,
          periodo: editingGoal.periodo,
          mes_inicio: editingGoal.mes_inicio,
          ano_inicio: editingGoal.ano_inicio,
        })
      } else {
        setForm({
          usuario_id: '',
          meta_receita: 0,
          meta_processos: 0,
          meta_margem: 0,
          periodo: 'mensal',
          mes_inicio: new Date().getMonth() + 1,
          ano_inicio: new Date().getFullYear(),
        })
      }
    }
  }, [editingGoal, isOpen])

  const handleSubmit = () => {
    if (
      !form.usuario_id ||
      form.meta_receita === undefined ||
      form.meta_receita <= 0 ||
      form.meta_processos === undefined ||
      form.meta_processos <= 0 ||
      form.meta_margem === undefined ||
      form.meta_margem < 0 ||
      form.meta_margem > 100 ||
      !form.mes_inicio ||
      !form.ano_inicio
    ) {
      toast.error('Preencha todos os campos obrigatórios com valores válidos')
      return
    }

    const isDuplicate = existingGoals.some(
      (g) =>
        g.usuario_id === form.usuario_id &&
        g.periodo === form.periodo &&
        g.mes_inicio === form.mes_inicio &&
        g.ano_inicio === form.ano_inicio &&
        (!editingGoal || g.id !== editingGoal.id),
    )

    if (isDuplicate) {
      toast.error(`O usuário já possui uma meta para o período e mês informados.`)
      return
    }

    onSave({
      usuario_id: form.usuario_id!,
      meta_receita: Number(form.meta_receita),
      meta_processos: Number(form.meta_processos),
      meta_margem: Number(form.meta_margem),
      periodo: form.periodo || 'mensal',
      mes_inicio: Number(form.mes_inicio),
      ano_inicio: Number(form.ano_inicio),
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingGoal ? 'Editar Meta Individual' : 'Nova Meta Individual'}
          </DialogTitle>
          <DialogDescription>
            Configure os objetivos de performance para um colaborador específico.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Usuário</Label>
            <div className="col-span-3">
              <Select
                value={form.usuario_id}
                onValueChange={(v) => setForm({ ...form, usuario_id: v })}
                disabled={!!editingGoal}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name || u.email} ({u.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Período</Label>
            <div className="col-span-3">
              <Select
                value={form.periodo}
                onValueChange={(val) => setForm({ ...form, periodo: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Mês Início</Label>
            <Input
              type="number"
              className="col-span-3"
              value={form.mes_inicio || ''}
              onChange={(e) => setForm({ ...form, mes_inicio: Number(e.target.value) })}
              min={1}
              max={12}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Ano Início</Label>
            <Input
              type="number"
              className="col-span-3"
              value={form.ano_inicio || ''}
              onChange={(e) => setForm({ ...form, ano_inicio: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Receita (R$)</Label>
            <Input
              type="number"
              className="col-span-3"
              value={form.meta_receita || ''}
              onChange={(e) => setForm({ ...form, meta_receita: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Processos</Label>
            <Input
              type="number"
              className="col-span-3"
              value={form.meta_processos || ''}
              onChange={(e) => setForm({ ...form, meta_processos: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Margem (%)</Label>
            <Input
              type="number"
              className="col-span-3"
              value={form.meta_margem || ''}
              onChange={(e) => setForm({ ...form, meta_margem: Number(e.target.value) })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar Meta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
