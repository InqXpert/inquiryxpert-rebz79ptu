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

export interface MetaIndividual {
  id: string
  nome: string
  role: string
  receita: number
  processos: number
  margem: number
  periodo: string
}

interface MetaIndividualModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (meta: MetaIndividual) => void
  editingGoal?: MetaIndividual | null
  existingGoals: MetaIndividual[]
}

const MOCK_USERS = [
  { id: 'u1', nome: 'Ana Silva', role: 'analista' },
  { id: 'u2', nome: 'Carlos Oliveira', role: 'supervisor' },
  { id: 'u3', nome: 'Mariana Santos', role: 'analista' },
  { id: 'u4', nome: 'João Pedro', role: 'agente' },
]

export function MetaIndividualModal({
  isOpen,
  onClose,
  onSave,
  editingGoal,
  existingGoals,
}: MetaIndividualModalProps) {
  const [form, setForm] = useState<Partial<MetaIndividual>>({
    nome: '',
    role: '',
    receita: 0,
    processos: 0,
    margem: 0,
    periodo: 'mensal',
  })

  useEffect(() => {
    if (editingGoal) {
      setForm(editingGoal)
    } else {
      setForm({ nome: '', role: '', receita: 0, processos: 0, margem: 0, periodo: 'mensal' })
    }
  }, [editingGoal, isOpen])

  const handleSubmit = () => {
    if (
      !form.nome ||
      form.receita === undefined ||
      form.processos === undefined ||
      form.margem === undefined
    ) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    // Validation: prevent saving if user already has a meta for the same period
    const isDuplicate = existingGoals.some(
      (g) => g.nome === form.nome && g.periodo === form.periodo && g.id !== form.id,
    )

    if (isDuplicate) {
      toast.error(`O usuário já possui uma meta ${form.periodo} configurada.`)
      return
    }

    onSave({
      id: form.id || Math.random().toString(36).substr(2, 9),
      nome: form.nome!,
      role: form.role || 'analista',
      receita: Number(form.receita),
      processos: Number(form.processos),
      margem: Number(form.margem),
      periodo: form.periodo || 'mensal',
    })
  }

  const handleUserSelect = (val: string) => {
    const user = MOCK_USERS.find((u) => u.nome === val)
    setForm({ ...form, nome: val, role: user?.role || '' })
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Usuário</Label>
            <div className="col-span-3">
              <Select value={form.nome} onValueChange={handleUserSelect} disabled={!!editingGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_USERS.map((u) => (
                    <SelectItem key={u.id} value={u.nome}>
                      {u.nome} ({u.role})
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
            <Label className="text-right">Receita (R$)</Label>
            <Input
              type="number"
              className="col-span-3"
              value={form.receita}
              onChange={(e) => setForm({ ...form, receita: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Processos</Label>
            <Input
              type="number"
              className="col-span-3"
              value={form.processos}
              onChange={(e) => setForm({ ...form, processos: Number(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Margem (%)</Label>
            <Input
              type="number"
              className="col-span-3"
              value={form.margem}
              onChange={(e) => setForm({ ...form, margem: Number(e.target.value) })}
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
