import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usuariosService } from '@/services/usuariosService'
import { User } from '@/types'
import { AlertCircle } from 'lucide-react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  userToManage: User | null
  actionType: 'delete' | 'archive'
  onConfirm: (newUserId?: string) => void
  activeUsers: User[]
}

export function UserReassignDialog({
  open,
  onOpenChange,
  userToManage,
  actionType,
  onConfirm,
  activeUsers,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [activeProcessCount, setActiveProcessCount] = useState(0)
  const [newUserId, setNewUserId] = useState<string>('')

  useEffect(() => {
    if (open && userToManage) {
      setLoading(true)
      usuariosService
        .getActiveProcessesForUser(userToManage.id)
        .then((procs) => setActiveProcessCount(procs.length))
        .finally(() => setLoading(false))
    } else {
      setActiveProcessCount(0)
      setNewUserId('')
    }
  }, [open, userToManage])

  const handleConfirm = () => {
    onConfirm(activeProcessCount > 0 ? newUserId : undefined)
  }

  if (!userToManage) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actionType === 'delete' ? 'Deletar' : 'Arquivar'} Usuário</DialogTitle>
          <DialogDescription>
            Você está prestes a {actionType === 'delete' ? 'deletar' : 'arquivar'} o usuário{' '}
            <span className="font-bold">{userToManage.name || userToManage.email}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4 min-h-[100px]">
          {loading ? (
            <p className="text-sm text-muted-foreground">Verificando processos ativos...</p>
          ) : activeProcessCount > 0 ? (
            <div className="space-y-4">
              <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 p-3 rounded-md text-sm border border-amber-200 dark:border-amber-900">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  Este usuário possui <strong>{activeProcessCount} processos ativos</strong>. Você
                  precisa transferir a responsabilidade destes processos para outro usuário antes de
                  prosseguir.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Novo Responsável</Label>
                <Select value={newUserId} onValueChange={setNewUserId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeUsers
                      .filter((u) => u.id !== userToManage.id)
                      .map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name || u.email}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Este usuário não possui processos ativos. Você pode prosseguir.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant={actionType === 'delete' ? 'destructive' : 'default'}
            disabled={loading || (activeProcessCount > 0 && !newUserId)}
            onClick={handleConfirm}
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
