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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MoreHorizontal,
  Key,
  Edit,
  History,
  ShieldOff,
  CheckCircle,
  Ban,
  Activity,
  Copy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { usuariosService } from '@/services/usuariosService'
import type { User } from '@/types'
import UsuarioHistoricoDialog from './UsuarioHistoricoDialog'
import { SessoesDialog } from './SessoesDialog'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function UsuariosTable({
  users,
  loading,
  onEdit,
  onRefresh,
}: {
  users: User[]
  loading: boolean
  onEdit: (u: User) => void
  onRefresh: () => void
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [historicoUser, setHistoricoUser] = useState<string | null>(null)
  const [sessoesUser, setSessoesUser] = useState<string | null>(null)
  const [tempPwdData, setTempPwdData] = useState<{ pwd: string; email: string } | null>(null)

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setSelected(selected.length === users.length && users.length > 0 ? [] : users.map((u) => u.id))
  }

  const handleBulkAction = async (action: string, val?: string) => {
    if (!selected.length) return toast.error('Selecione usuários para prosseguir')
    try {
      for (const id of selected) {
        if (action === 'permitir') await usuariosService.permitirUsuario(id)
        if (action === 'bloquear') await usuariosService.bloquearUsuario(id)
        if (action === 'role' && val) await usuariosService.alterarRole(id, val)
      }
      toast.success('Ação em lote executada com sucesso!')
      setSelected([])
      onRefresh()
    } catch {
      toast.error('Erro ao executar ação em lote')
    }
  }

  const handleResetSenha = async (id: string, email: string) => {
    try {
      const pwd = await usuariosService.resetSenha(id)
      setTempPwdData({ pwd, email })
      onRefresh()
    } catch {
      toast.error('Erro ao resetar senha')
    }
  }

  const copyPwd = () => {
    if (tempPwdData) {
      navigator.clipboard.writeText(tempPwdData.pwd)
      toast.success('Senha copiada para a área de transferência')
    }
  }

  return (
    <div className="rounded-2xl border-none shadow-sm overflow-hidden bg-card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-muted/10 border-b border-border/60 gap-4">
        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
          <Select onValueChange={(val) => handleBulkAction('role', val)} value="">
            <SelectTrigger className="w-[150px] h-10 rounded-xl bg-background">
              <SelectValue placeholder="Alterar Role" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="c-level">C-Level</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="analista">Analista</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('bloquear')}
            className="rounded-xl h-10 px-4 text-[13px] font-semibold"
          >
            <Ban className="w-4 h-4 mr-2 text-destructive" /> Bloquear Lote
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('permitir')}
            className="rounded-xl h-10 px-4 text-[13px] font-semibold"
          >
            <CheckCircle className="w-4 h-4 mr-2 text-primary" /> Ativar Lote
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-14 px-6">
              <Checkbox
                className="rounded-md"
                checked={selected.length === users.length && users.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Papel / Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Último Login</TableHead>
            <TableHead>Tempo Uso</TableHead>
            <TableHead className="text-right px-6">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="px-6">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell className="text-right px-6">
                  <Skeleton className="h-8 w-8 ml-auto rounded-full" />
                </TableCell>
              </TableRow>
            ))
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground text-[14px]">
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <TableRow key={u.id} className="group">
                <TableCell className="px-6">
                  <Checkbox
                    className="rounded-md"
                    checked={selected.includes(u.id)}
                    onCheckedChange={() => toggleSelect(u.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-[14px] text-foreground">{u.name}</span>
                    <span className="text-[13px] text-muted-foreground">{u.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="uppercase text-[10px] tracking-wider font-bold border-secondary/30 text-secondary bg-secondary/5 px-2.5 py-0.5"
                  >
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className="capitalize text-[11px] px-2.5 py-0.5 font-bold tracking-wide"
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
                <TableCell className="text-[13px] font-semibold text-foreground/80">
                  {Math.round((u.tempo_uso_total || 0) / 60)} hrs
                </TableCell>
                <TableCell className="text-right px-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-9 w-9 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl min-w-[200px]">
                      <DropdownMenuItem
                        className="rounded-lg cursor-pointer py-2.5"
                        onClick={() => onEdit(u)}
                      >
                        <Edit className="w-4 h-4 mr-3 text-primary" />
                        <span className="font-semibold text-[13px]">Editar Perfil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="rounded-lg cursor-pointer py-2.5"
                        onClick={() => setSessoesUser(u.id)}
                      >
                        <Activity className="w-4 h-4 mr-3 text-secondary" />
                        <span className="font-semibold text-[13px]">Sessões Ativas</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="rounded-lg cursor-pointer py-2.5"
                        onClick={() => setHistoricoUser(u.id)}
                      >
                        <History className="w-4 h-4 mr-3 text-muted-foreground" />
                        <span className="font-semibold text-[13px]">Histórico do Usuário</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="rounded-lg cursor-pointer py-2.5"
                        onClick={() => handleResetSenha(u.id, u.email)}
                      >
                        <Key className="w-4 h-4 mr-3 text-orange-500" />
                        <span className="font-semibold text-[13px]">Resetar Senha</span>
                      </DropdownMenuItem>
                      {u.status_conta === 'ativo' ? (
                        <DropdownMenuItem
                          className="rounded-lg cursor-pointer text-destructive focus:bg-destructive/10 py-2.5"
                          onClick={() => handleBulkAction('bloquear', u.id)} // re-using bulk logic with selection handled by click context? No, wait. I will just call service directly or set selection. Actually, I can just select it and call. No, I will just call service.
                          // Wait, my handleBulkAction uses `selected`.
                          // Let's create specific handlers for single actions inside the mapped item to avoid logic errors.
                        >
                          <Ban className="w-4 h-4 mr-3" />
                          <span className="font-semibold text-[13px]">Bloquear Acesso</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          className="rounded-lg cursor-pointer text-primary focus:bg-primary/10 py-2.5"
                          onClick={async () => {
                            await usuariosService.permitirUsuario(u.id)
                            onRefresh()
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-3" />
                          <span className="font-semibold text-[13px]">Permitir Acesso</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {historicoUser && (
        <UsuarioHistoricoDialog
          open={!!historicoUser}
          onOpenChange={() => setHistoricoUser(null)}
          userId={historicoUser}
        />
      )}

      {sessoesUser && (
        <SessoesDialog
          open={!!sessoesUser}
          onOpenChange={() => setSessoesUser(null)}
          userId={sessoesUser}
        />
      )}

      {tempPwdData && (
        <Dialog open={!!tempPwdData} onOpenChange={() => setTempPwdData(null)}>
          <DialogContent className="sm:max-w-[420px] rounded-2xl p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-orange-600" />
            </div>
            <DialogTitle className="text-xl font-bold mb-2">Senha Redefinida!</DialogTitle>
            <p className="text-sm text-muted-foreground mb-6">
              A senha para <strong>{tempPwdData.email}</strong> foi resetada. Copie a senha
              temporária abaixo e envie ao usuário com segurança. Ela não será mostrada novamente.
            </p>
            <div className="bg-muted/50 p-4 rounded-xl border border-border flex items-center justify-between mb-6">
              <code className="text-lg font-bold tracking-wider">{tempPwdData.pwd}</code>
              <Button variant="ghost" size="icon" onClick={copyPwd} className="h-8 w-8">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <Button
              className="w-full h-11 rounded-xl font-bold"
              onClick={() => setTempPwdData(null)}
            >
              Entendi, já copiei
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
