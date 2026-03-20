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
      <div className="flex justify-between items-center p-4 bg-muted/20 border-b">
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('suspenso')}
            className="rounded-none text-xs"
          >
            <Ban className="w-3 h-3 mr-2" /> Suspender Lote
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('ativo')}
            className="rounded-none text-xs"
          >
            <CheckCircle className="w-3 h-3 mr-2" /> Ativar Lote
          </Button>
        </div>
        <Button
          onClick={() => {
            setEditingUser(null)
            setIsDialogOpen(true)
          }}
          className="rounded-none shadow-sm text-xs"
        >
          Novo Usuário
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                className="rounded-none"
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
              <TableCell>
                <Checkbox
                  className="rounded-none"
                  checked={selected.includes(u.id)}
                  onCheckedChange={() => toggleSelect(u.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="text-muted-foreground">{u.email}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="rounded-none uppercase text-[10px] tracking-wider font-semibold border-secondary/20 text-secondary"
                >
                  {u.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className="rounded-none capitalize text-[10px]"
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
              <TableCell className="text-xs text-muted-foreground">
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
                      className="rounded-none h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-none min-w-[180px]">
                    <DropdownMenuItem
                      className="rounded-none cursor-pointer"
                      onClick={() => {
                        setEditingUser(u)
                        setIsDialogOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" /> Editar Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-none cursor-pointer"
                      onClick={() => setHistoryUser(u)}
                    >
                      <History className="w-4 h-4 mr-2" /> Ver Histórico
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-none cursor-pointer"
                      onClick={() => handlePasswordReset(u.email)}
                    >
                      <Key className="w-4 h-4 mr-2" /> Resetar Senha
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-none cursor-pointer text-destructive focus:bg-destructive/10"
                      onClick={() => handleDisable2FA(u.id)}
                    >
                      <ShieldOff className="w-4 h-4 mr-2" /> Desabilitar 2FA
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
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
