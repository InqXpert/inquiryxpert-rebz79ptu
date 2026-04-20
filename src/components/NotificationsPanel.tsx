import { memo, useEffect, useState, useCallback } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Mail,
  MessageCircle,
  Info,
  RefreshCw,
} from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useHubPage } from '@/contexts/hub-page-context'
import type { NotificacaoAgente } from '@/services/notificacoes_agente'
import { cn } from '@/lib/utils'

function getNotificationIcon(titulo: string, tipo: string) {
  const lowerTitle = titulo.toLowerCase()
  const lowerTipo = tipo.toLowerCase()

  if (
    lowerTitle.includes('concluid') ||
    lowerTitle.includes('sucesso') ||
    lowerTipo === 'processo_aprovado'
  ) {
    return <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500" />
  }
  if (
    lowerTitle.includes('vencend') ||
    lowerTitle.includes('prazo') ||
    lowerTipo === 'prazo_proximo'
  ) {
    return <AlertTriangle className="w-5 h-5 flex-shrink-0 text-yellow-500" />
  }
  if (
    lowerTitle.includes('atrasad') ||
    lowerTipo.includes('faltando') ||
    lowerTipo.includes('rejeitado')
  ) {
    return <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
  }
  if (lowerTitle.includes('e-mail') || lowerTitle.includes('email')) {
    return <Mail className="w-5 h-5 flex-shrink-0 text-blue-500" />
  }
  if (lowerTitle.includes('whatsapp') || lowerTipo === 'mensagem') {
    return <MessageCircle className="w-5 h-5 flex-shrink-0 text-green-500" />
  }
  return <Info className="w-5 h-5 flex-shrink-0 text-blue-500" />
}

export const NotificationsPanel = memo(function NotificationsPanel() {
  const { user } = useCurrentUser()
  const { setNotificationCount } = useHubPage()
  const [notifications, setNotifications] = useState<NotificacaoAgente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return
    try {
      setLoading(true)
      setError(null)
      const res = await pb.collection('notificacoes_agente').getList<NotificacaoAgente>(1, 10, {
        filter: `agente_id.user_id = "${user.id}"`,
        sort: '-created',
      })
      setNotifications(res.items)
    } catch (err: any) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useRealtime('notificacoes_agente', () => {
    fetchNotifications().catch(console.error)
  })

  const unreadCount = notifications.filter((n) => !n.lida).length

  useEffect(() => {
    setNotificationCount(unreadCount)
  }, [unreadCount, setNotificationCount])

  if (error) {
    throw error
  }

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border border-border transition-all duration-200 ease-in-out hover:shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground uppercase tracking-wide">
            NOTIFICAÇÕES
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchNotifications}
            disabled={loading}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            title="Atualizar"
          >
            <RefreshCw className={cn('w-4 h-4 text-muted-foreground', loading && 'animate-spin')} />
          </button>
          {unreadCount > 0 && (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-[250px]">
        {loading && notifications.length === 0 ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-2 rounded-md flex gap-2">
              <Skeleton className="w-5 h-5 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-2 text-muted-foreground py-8">
            <CheckCircle className="w-8 h-8 opacity-20" />
            <p className="text-sm font-medium">Você está em dia!</p>
            <p className="text-xs opacity-70">Nenhuma notificação recente.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                'flex flex-row gap-3 p-2.5 rounded-md border border-transparent transition-all duration-200 ease-in-out items-start hover:border-border hover:bg-muted/50',
                !n.lida && 'bg-primary/5 border-primary/10',
              )}
            >
              <div className="mt-0.5">{getNotificationIcon(n.titulo, n.tipo)}</div>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm text-foreground font-semibold truncate">{n.titulo}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                  {n.descricao}
                </p>
                <p className="text-[10px] font-medium text-muted-foreground/70 mt-1.5 uppercase">
                  {formatDistanceToNow(new Date(n.created), { addSuffix: true, locale: ptBR })}
                </p>
              </div>
              {!n.lida && (
                <span className="w-2 h-2 rounded-full bg-destructive shrink-0 mt-1 shadow-sm shadow-destructive/50"></span>
              )}
            </div>
          ))
        )}
      </div>

      <div className="pt-3 mt-2 border-t border-border text-center shrink-0">
        <Link
          to="/notificacoes"
          className="text-sm text-primary hover:underline font-medium transition-all duration-200"
        >
          Ver Todas &rarr;
        </Link>
      </div>
    </div>
  )
})
