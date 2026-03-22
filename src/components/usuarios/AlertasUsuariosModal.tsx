import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShieldAlert, AlertTriangle, Clock, Key, ShieldX, Monitor } from 'lucide-react'
import type { User, UsuarioSessao } from '@/types'
import { notificacaoService } from '@/services/notificacaoService'
import { usuariosService } from '@/services/usuariosService'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function AlertasUsuariosModal({
  open,
  onClose,
  users,
  sessoes,
}: {
  open: boolean
  onClose: () => void
  users: User[]
  sessoes: UsuarioSessao[]
}) {
  const inativos = users.filter(
    (u) =>
      u.ultimo_login &&
      new Date().getTime() - new Date(u.ultimo_login).getTime() > 30 * 24 * 60 * 60 * 1000,
  )
  const sem2fa = users.filter((u) => !u.two_fa_enabled && u.status_conta === 'ativo')
  const permissoesCustom = users.filter(
    (u) => u.permissoes_customizadas && u.permissoes_customizadas.length > 0,
  )
  const sessoesLongas = sessoes.filter(
    (s) => new Date().getTime() - new Date(s.created).getTime() > 8 * 60 * 60 * 1000,
  )

  // Mock failed logins for UI demonstration
  const loginFalhas = users
    .filter((u) => u.status_conta === 'ativo')
    .slice(0, 1)
    .map((u) => ({ ...u, falhas: Math.floor(Math.random() * 5) + 3 }))

  const handleLembrete = async (userId: string) => {
    await notificacaoService.enviarLembrete(userId)
    toast.success('Lembrete enviado com sucesso')
  }

  const handleHabilitar2FA = async (userId: string) => {
    await notificacaoService.enviarAlertaSeguranca(userId, 'alerta_seguranca_2fa_ausente')
    toast.success('Alerta de segurança enviado para o usuário')
  }

  const handleForcarLogout = async (sessaoId: string, userId: string) => {
    await usuariosService.forceLogout(sessaoId)
    await notificacaoService.enviarAlertaSeguranca(userId, 'alerta_seguranca_sessao_expirada')
    toast.success('Sessão encerrada remotamente')
  }

  const handleBloquear = async (userId: string) => {
    await usuariosService.bloquearUsuario(userId)
    await notificacaoService.enviarAlertaSeguranca(userId, 'alerta_seguranca_bloqueio_preventivo')
    toast.success('Usuário bloqueado preventivamente')
  }

  const handleResetPermissoes = async (userId: string) => {
    await usuariosService.updateUsuario(userId, { permissoes_customizadas: [] })
    await notificacaoService.enviarNotificacaoPermissoes(userId)
    toast.success('Permissões resetadas para o padrão')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-brand-light dark:bg-brand-navy p-0 border-brand-teal dark:border-brand-cyan/50">
        <div className="sticky top-0 bg-white dark:bg-[#1f2244] p-6 border-b border-brand-teal/30 z-10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[22px]">
              <ShieldAlert className="w-6 h-6 text-brand-coral" />
              Central de Alertas e Segurança
            </DialogTitle>
            <DialogDescription>
              Ações automatizadas e riscos identificados na plataforma.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-8">
          <AlertSection
            title="Inativos > 30 Dias"
            icon={<Clock className="w-5 h-5 text-brand-orange" />}
            items={inativos}
            renderItem={(u) => (
              <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-orange/30">
                <div>
                  <p className="font-bold text-[14px] text-brand-navy dark:text-white">{u.name}</p>
                  <p className="text-[12px] text-brand-gray">
                    Último login:{' '}
                    {u.ultimo_login
                      ? formatDistanceToNow(new Date(u.ultimo_login), {
                          addSuffix: true,
                          locale: ptBR,
                        })
                      : 'Nunca'}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                  onClick={() => handleLembrete(u.id)}
                >
                  Enviar Lembrete
                </Button>
              </div>
            )}
          />

          <AlertSection
            title="2FA Desabilitado"
            icon={<ShieldX className="w-5 h-5 text-brand-coral" />}
            items={sem2fa}
            renderItem={(u) => (
              <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-coral/30">
                <div>
                  <p className="font-bold text-[14px] text-brand-navy dark:text-white">{u.name}</p>
                  <p className="text-[12px] text-brand-gray">{u.email}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-brand-coral text-brand-coral hover:bg-brand-coral/10"
                  onClick={() => handleHabilitar2FA(u.id)}
                >
                  Alertar Usuário
                </Button>
              </div>
            )}
          />

          <AlertSection
            title="Sessões Longas (> 8h)"
            icon={<Monitor className="w-5 h-5 text-brand-cyan" />}
            items={sessoesLongas}
            renderItem={(s) => {
              const u = users.find((x) => x.id === s.user_id)
              return (
                <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-cyan/30">
                  <div>
                    <p className="font-bold text-[14px] text-brand-navy dark:text-white">
                      {u?.name || 'Desconhecido'}
                    </p>
                    <p className="text-[12px] text-brand-gray">
                      Sessão iniciada{' '}
                      {formatDistanceToNow(new Date(s.created), { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10"
                    onClick={() => handleForcarLogout(s.id, s.user_id)}
                  >
                    Forçar Logout
                  </Button>
                </div>
              )
            }}
          />

          <AlertSection
            title="Tentativas de Login Falhadas"
            icon={<AlertTriangle className="w-5 h-5 text-brand-coral" />}
            items={loginFalhas}
            renderItem={(u) => (
              <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-coral/30">
                <div>
                  <p className="font-bold text-[14px] text-brand-navy dark:text-white">{u.name}</p>
                  <p className="text-[12px] text-brand-coral font-medium">
                    {u.falhas} falhas recentes registradas.
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-brand-coral text-white hover:bg-brand-coral/90"
                  onClick={() => handleBloquear(u.id)}
                >
                  Bloquear
                </Button>
              </div>
            )}
          />

          <AlertSection
            title="Permissões Customizadas"
            icon={<Key className="w-5 h-5 text-brand-teal" />}
            items={permissoesCustom}
            renderItem={(u) => (
              <div className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-lg border border-brand-teal/30">
                <div>
                  <p className="font-bold text-[14px] text-brand-navy dark:text-white">{u.name}</p>
                  <p className="text-[12px] text-brand-gray">
                    Desvio do padrão para o papel {u.role}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-brand-teal text-brand-teal hover:bg-brand-teal/10"
                  onClick={() => handleResetPermissoes(u.id)}
                >
                  Resetar Padrão
                </Button>
              </div>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AlertSection({
  title,
  icon,
  items,
  renderItem,
}: {
  title: string
  icon: React.ReactNode
  items: any[]
  renderItem: (item: any) => React.ReactNode
}) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 20
  const totalPages = Math.ceil(items.length / itemsPerPage)

  if (items.length === 0) return null

  const currentItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
      <h3 className="flex items-center gap-2 text-[16px] font-bold text-brand-navy dark:text-white border-b border-brand-teal/20 pb-2">
        {icon} {title}
        <Badge variant="outline" className="ml-2 bg-white dark:bg-black/30 border-brand-teal">
          {items.length}
        </Badge>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentItems.map((it, i) => (
          <div key={i}>{renderItem(it)}</div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-[12px] font-medium text-brand-gray">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="border-brand-teal"
            >
              Anterior
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="border-brand-teal"
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
