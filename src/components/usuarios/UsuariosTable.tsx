import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Key, Edit, History, ShieldOff, CheckCircle, Ban } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { User } from '@/types'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import UsuarioDialog from './UsuarioDialog'
import UsuarioHistoricoDialog from './UsuarioHistoricoDialog'

export default function UsuariosTable({ users }: { users: User[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [historyUser, setHistoryUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setSelected(selected.length === users.length ? [] : users.map((u) => u.id))
  }

  const handleBulkAction = async (status: string) => {
    if (!selected.length) return toast.error('Selecione usuários para prosseguir')
    try {
      await Promise.all(
        selected.map((id) => pb.collection('users').update(id, { status_conta: status })),
      )
      toast.success(`Status atualizado para ${status}`)
      setSelected([])
    } catch (e) {
      toast.error('Erro ao atualizar status em lote')
    }
  }

  const handlePasswordReset = async (email: string) => {
    try {
      await pb.collection('users').requestPasswordReset(email)
      toast.success('E-mail de redefinição de senha enviado!')
    } catch (e) {
      toast.error('Erro ao solicitar reset de senha')
    }
  }

  const handleDisable2FA = async (id: string) => {
    try {
      await pb.collection('users').update(id, { two_fa_enabled: false, two_fa_secret: '' })
      toast.success('2FA desativado para o usuário.')
    } catch (e) {
      toast.error('Erro ao desativar 2FA')
    }
  }

  return (
    <div className="space-y-0 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-muted/20 border-b gap-4">
        <div className="flex gap-3 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('suspenso')}
            className="rounded-xl text-[13px] font-semibold h-10 px-4"
          >
            <Ban className="w-4 h-4 mr-2" /> Suspender Lote
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('ativo')}
            className="rounded-xl text-[13px] font-semibold h-10 px-4"
          >
            <CheckCircle className="w-4 h-4 mr-2" /> Ativar Lote
          </Button>
        </div>
        <Button
          onClick={() => {
            setEditingUser(null)
            setIsDialogOpen(true)
          }}
          className="rounded-xl shadow-sm text-[13px] font-semibold h-10 px-5"
        >
          Novo Usuário
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 px-6">
              <Checkbox
                className="rounded-md"
                checked={selected.length === users.length && users.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Papel / Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Último Login</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} className="group">
              <TableCell className="px-6">
                <Checkbox
                  className="rounded-md"
                  checked={selected.includes(u.id)}
                  onCheckedChange={() => toggleSelect(u.id)}
                />
              </TableCell>
              <TableCell className="font-semibold text-[14px]">{u.name}</TableCell>
              <TableCell className="text-muted-foreground text-[14px]">{u.email}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="uppercase text-[11px] tracking-wider font-bold border-secondary/30 text-secondary bg-secondary/5 px-3 py-1"
                >
                  {u.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className="capitalize text-[12px] px-3 py-1 font-bold"
                  variant={
                    u.status_conta === 'ativo'
                      ? 'default'
                      : u.status_conta === 'bloqueado'
                        ? 'destructive'
                        : 'secondary'
                  }
                >
                  {u.status_conta}
                </Badge>
              </TableCell>
              <TableCell className="text-[13px] text-muted-foreground font-medium">
                {u.ultimo_login
                  ? format(new Date(u.ultimo_login), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                  : 'Nunca acessou'}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl min-w-[200px]">
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer py-2.5"
                      onClick={() => {
                        setEditingUser(u)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-3 text-muted-foreground" />
                      <span className="font-medium text-[13px]">Editar Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer py-2.5"
                      onClick={() => setHistoryUser(u)}
                    >
                      <History className="w-4 h-4 mr-3 text-muted-foreground" />
                      <span className="font-medium text-[13px]">Ver Histórico</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer py-2.5"
                      onClick={() => handlePasswordReset(u.email)}
                    >
                      <Key className="w-4 h-4 mr-3 text-muted-foreground" />
                      <span className="font-medium text-[13px]">Resetar Senha</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer text-destructive focus:bg-destructive/10 py-2.5 mt-1"
                      onClick={() => handleDisable2FA(u.id)}
                    >
                      <ShieldOff className="w-4 h-4 mr-3" />
                      <span className="font-medium text-[13px]">Desabilitar 2FA</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground text-[14px]">
                Nenhum usuário cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <UsuarioDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} user={editingUser} />
      {historyUser && (
        <UsuarioHistoricoDialog
          open={!!historyUser}
          onOpenChange={() => setHistoryUser(null)}
          userId={historyUser.id}
        />
      )}
    </div>
  )
}
