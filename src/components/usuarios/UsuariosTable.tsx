import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, History, Ban, CheckCircle, Activity, ShieldCheck, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { usuariosService } from '@/services/usuariosService'
import type { User } from '@/types'
import UsuarioHistoricoDialog from './UsuarioHistoricoDialog'
import { SessoesDialog } from './SessoesDialog'
import { BulkActionsBar } from './BulkActionsBar'
import { TempPasswordsDialog } from './TempPasswordsDialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AvatarUpload } from './AvatarUpload'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/hooks/use-auth'
import { totpService } from '@/services/totpService'
import { TwoFactorModal } from './TwoFactorModal'
import { DisableTwoFactorModal } from './DisableTwoFactorModal'

export function UsuariosTable({
  users,
  activeSessions,
  loading,
  onEdit,
  onRefresh,
}: {
  users: User[]
  activeSessions: Record<string, number>
  loading: boolean
  onEdit: (u: User) => void
  onRefresh: () => void
}) {
  const { user: currentUser } = useAuth()
  const [selected, setSelected] = useState<string[]>([])
  const [historicoUser, setHistoricoUser] = useState<string | null>(null)
  const [sessoesUser, setSessoesUser] = useState<string | null>(null)
  const [tempPwdData, setTempPwdData] = useState<{ email: string; pwd: string }[] | null>(null)

  const [tfaData, setTfaData] = useState<{ user: User; secret: string; qrUrl: string } | null>(null)
  const [disableTfaUser, setDisableTfaUser] = useState<{ user: User; hasSessions: boolean } | null>(
    null,
  )

  const toggleSelect = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const toggleAll = () =>
    setSelected(selected.length === users.length && users.length > 0 ? [] : users.map((u) => u.id))

  const handleBulkAction = async (action: string, val?: string) => {
    if (!selected.length) return toast.error('Selecione usuários para prosseguir')
    try {
      const resetResults = []
      for (const id of selected) {
        if (action === 'permitir') await usuariosService.permitirUsuario(id)
        if (action === 'bloquear') await usuariosService.bloquearUsuario(id)
        if (action === 'role' && val) await usuariosService.alterarRole(id, val)
        if (action === 'reset') {
          const pwd = await usuariosService.resetSenha(id)
          const user = users.find((u) => u.id === id)
          if (user) resetResults.push({ email: user.email, pwd })
        }
      }
      if (resetResults.length > 0) setTempPwdData(resetResults)
      else toast.success('Ação em lote executada com sucesso!')
      setSelected([])
      onRefresh()
    } catch {
      toast.error('Erro ao executar ação em lote')
    }
  }

  const handlePhotoUpload = async (userId: string, file: File) => {
    await usuariosService.updateFotoPerfil(userId, file)
    onRefresh()
  }

  const handle2FAToggle = async (u: User, enable: boolean) => {
    if (enable) {
      const { secret, qrUrl } = totpService.generateSecret(u.email)
      setTfaData({ user: u, secret, qrUrl })
    } else {
      const hasSessions = await usuariosService.checkActiveSessionsFor2FA(u.id)
      setDisableTfaUser({ user: u, hasSessions })
    }
  }

  const confirmEnable2FA = async () => {
    if (!tfaData) return
    try {
      await usuariosService.toggle2FA(tfaData.user.id, true, tfaData.secret)
      toast.success('2FA habilitado com sucesso')
      setTfaData(null)
      onRefresh()
    } catch {
      toast.error('Erro ao habilitar 2FA')
    }
  }

  const confirmDisable2FA = async () => {
    if (!disableTfaUser) return
    try {
      await usuariosService.toggle2FA(disableTfaUser.user.id, false)
      toast.success('2FA desabilitado com sucesso')
      setDisableTfaUser(null)
      onRefresh()
    } catch {
      toast.error('Erro ao desabilitar 2FA')
    }
  }

  const roleColors: Record<string, string> = {
    'c-level': 'bg-brand-navy text-white',
    admin: 'bg-brand-cyan text-white',
    supervisor: 'bg-brand-teal text-brand-navy',
    analista: 'bg-brand-gray text-white',
  }

  const statusColors: Record<string, string> = {
    ativo: 'bg-brand-cyan text-white',
    suspenso: 'bg-brand-orange text-white',
    bloqueado: 'bg-brand-coral text-white',
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 px-4">
              <Checkbox
                checked={selected.length === users.length && users.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead className="w-14 px-2 text-center">Foto</TableHead>
            <TableHead className="sticky left-0 bg-brand-teal/20 dark:bg-brand-navy z-10 min-w-[200px]">
              Usuário
            </TableHead>
            <TableHead>Papel</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center w-20">2FA</TableHead>
            <TableHead>Último Login</TableHead>
            <TableHead>Tempo Uso</TableHead>
            <TableHead>Sessões</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={10}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))
            : users.map((u, i) => {
                const sessoesCount = activeSessions[u.id] || 0
                return (
                  <TableRow
                    key={u.id}
                    className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <TableCell className="w-12 px-4">
                      <Checkbox
                        checked={selected.includes(u.id)}
                        onCheckedChange={() => toggleSelect(u.id)}
                      />
                    </TableCell>
                    <TableCell className="px-2">
                      <AvatarUpload user={u} onUpload={(f) => handlePhotoUpload(u.id, f)} />
                    </TableCell>
                    <TableCell className="sticky left-0 bg-white dark:bg-[#282c59]/90 group-hover:bg-brand-light dark:group-hover:bg-white/10 group-even:bg-brand-light/50 dark:group-even:bg-white/5 transition-colors z-10 border-r border-brand-teal/20">
                      <div className="flex flex-col">
                        <span className="font-bold text-[14px] text-brand-navy dark:text-white">
                          {u.name}
                        </span>
                        <span className="text-[13px] text-brand-gray">{u.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`uppercase text-[10px] font-bold tracking-wider border-none ${roleColors[u.role || 'analista']}`}
                      >
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`capitalize text-[11px] font-bold tracking-wide border-none ${statusColors[u.status_conta || 'ativo']}`}
                      >
                        {u.status_conta}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <TooltipProvider>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <div>
                              <Switch
                                checked={u.two_fa_enabled}
                                disabled={currentUser?.role !== 'c-level'}
                                onCheckedChange={(c) => handle2FAToggle(u, c)}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {u.two_fa_enabled
                              ? 'Autenticação em Dois Fatores Ativa'
                              : '2FA Desabilitado'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-[13px] text-brand-gray dark:text-brand-light whitespace-nowrap">
                      {u.ultimo_login
                        ? formatDistanceToNow(new Date(u.ultimo_login), {
                            addSuffix: true,
                            locale: ptBR,
                          })
                        : 'Nunca acessou'}
                    </TableCell>
                    <TableCell className="text-[13px] font-bold text-brand-navy dark:text-white whitespace-nowrap">
                      {Math.floor((u.tempo_uso_total || 0) / 60)}h {(u.tempo_uso_total || 0) % 60}m
                    </TableCell>
                    <TableCell>
                      <Badge
                        onClick={() => setSessoesUser(u.id)}
                        className={`cursor-pointer border-none px-3 py-1 ${
                          sessoesCount > 3
                            ? 'bg-brand-coral text-white hover:bg-brand-coral/80'
                            : 'bg-brand-teal text-brand-navy hover:bg-brand-teal/80'
                        }`}
                      >
                        {sessoesCount} {sessoesCount === 1 ? 'ativa' : 'ativas'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <div className="flex items-center justify-end gap-1">
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Editar usuario"
                                onClick={() => onEdit(u)}
                                className="text-brand-navy dark:text-brand-cyan hover:bg-brand-teal/20"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Editar usuário</TooltipContent>
                          </Tooltip>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Ver sessoes"
                                onClick={() => setSessoesUser(u.id)}
                                className="text-brand-cyan hover:bg-brand-teal/20"
                              >
                                <Activity className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Gerenciar sessões</TooltipContent>
                          </Tooltip>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Ver historico"
                                onClick={() => setHistoricoUser(u.id)}
                                className="text-brand-gray dark:text-brand-light hover:bg-brand-teal/20"
                              >
                                <History className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Ver histórico</TooltipContent>
                          </Tooltip>
                          {u.status_conta === 'ativo' ? (
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  aria-label="Bloquear usuario"
                                  onClick={async () => {
                                    await usuariosService.bloquearUsuario(u.id)
                                    onRefresh()
                                  }}
                                  className="text-brand-coral hover:bg-brand-coral/20"
                                >
                                  <Ban className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Bloquear usuário</TooltipContent>
                            </Tooltip>
                          ) : (
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  aria-label="Permitir usuario"
                                  onClick={async () => {
                                    await usuariosService.permitirUsuario(u.id)
                                    onRefresh()
                                  }}
                                  className="text-brand-cyan hover:bg-brand-cyan/20"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Permitir usuário</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                )
              })}
        </TableBody>
      </Table>

      <BulkActionsBar
        selectedCount={selected.length}
        totalCount={users.length}
        onClear={() => setSelected([])}
        onToggleAll={toggleAll}
        onAction={handleBulkAction}
      />

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
        <TempPasswordsDialog data={tempPwdData} onClose={() => setTempPwdData(null)} />
      )}
      {tfaData && (
        <TwoFactorModal
          open={!!tfaData}
          onClose={() => setTfaData(null)}
          onConfirm={confirmEnable2FA}
          secret={tfaData.secret}
          qrUrl={tfaData.qrUrl}
          email={tfaData.user.email}
        />
      )}
      {disableTfaUser && (
        <DisableTwoFactorModal
          open={!!disableTfaUser}
          onClose={() => setDisableTfaUser(null)}
          onConfirm={confirmDisable2FA}
          hasActiveSessions={disableTfaUser.hasSessions}
        />
      )}
    </>
  )
}
