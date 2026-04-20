import { useEffect, useState, useCallback } from 'react'
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
import { useToast } from '@/hooks/use-toast'
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

export function NotificationsPanel() {
  const { user } = useCurrentUser()
  const [notifications, setNotifications] = useState<NotificacaoAgente[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return
    try {
      setLoading(true)
      const res = await pb.collection('notificacoes_agente').getList<NotificacaoAgente>(1, 5, {
        filter: `agente_id.user_id = "${user.id}"`,
        sort: '-created',
      })
      setNotifications(res.items)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Nao foi possivel carregar notificacoes',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [user?.id, toast])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useRealtime('notificacoes_agente', () => {
    fetchNotifications().catch(() => {
      toast({
        title: 'Erro de conexão',
        description: 'Falha ao atualizar notificações em tempo real. Tente atualizar manualmente.',
        variant: 'destructive',
      })
    })
  })

  const unreadCount = notifications.filter((n) => !n.lida).length

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground uppercase tracking-wide">
            NOTIFICACOES (Tempo Real)
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
      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
        {loading && notifications.length === 0 ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-2 rounded-md flex gap-2">
              <Skeleton className="w-5 h-5 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))
        ) : notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground/80 py-4 text-center">Nenhuma notificacao</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                'flex flex-row gap-2 p-2 rounded-md transition-colors hover:bg-secondary items-start',
                !n.lida && 'bg-primary/5',
              )}
            >
              {getNotificationIcon(n.titulo, n.tipo)}
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium truncate">{n.titulo}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.descricao}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(n.created), { addSuffix: true, locale: ptBR })}
                </p>
              </div>
              {!n.lida && (
                <span className="w-2 h-2 rounded-full bg-destructive shrink-0 mt-1"></span>
              )}
            </div>
          ))
        )}
      </div>
      <div className="pt-3 mt-2 border-t border-border text-center">
        <Link
          to="/notificacoes"
          className="text-sm text-primary hover:underline font-medium transition-all"
        >
          Ver Todas
        </Link>
      </div>
    </div>
  )
}
