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

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
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
    return <CheckCircle className="w-4 h-4 text-green-500" />
  }
  if (
    lowerTitle.includes('vencend') ||
    lowerTitle.includes('prazo') ||
    lowerTipo === 'prazo_proximo'
  ) {
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />
  }
  if (
    lowerTitle.includes('atrasad') ||
    lowerTipo.includes('faltando') ||
    lowerTipo.includes('rejeitado')
  ) {
    return <AlertCircle className="w-4 h-4 text-red-500" />
  }
  if (lowerTitle.includes('e-mail') || lowerTitle.includes('email')) {
    return <Mail className="w-4 h-4 text-blue-500" />
  }
  if (lowerTitle.includes('whatsapp') || lowerTipo === 'mensagem') {
    return <MessageCircle className="w-4 h-4 text-green-500" />
  }
  return <Info className="w-4 h-4 text-blue-500" />
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
    <Card className="shadow-sm border-none ring-1 ring-border flex-1 flex flex-col max-h-[500px]">
      <CardHeader className="p-4 border-b bg-card shrink-0">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2 uppercase tracking-wider text-sm">
            NOTIFICAÇÕES (Tempo Real)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchNotifications}
              disabled={loading}
              className="p-1 hover:bg-muted rounded-md transition-colors"
              title="Atualizar"
            >
              <RefreshCw
                className={cn('w-4 h-4 text-muted-foreground', loading && 'animate-spin')}
              />
            </button>
            <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
              {unreadCount} novas
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <ScrollArea className="flex-1 bg-card">
        <div className="p-3 space-y-2.5">
          {loading && notifications.length === 0 ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-3 rounded-md border flex gap-3">
                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))
          ) : notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground/80 p-4 text-center">Nenhuma notificacao</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  'p-3 rounded-md border text-sm transition-colors flex gap-3 items-start',
                  n.lida
                    ? 'bg-muted/30 border-transparent'
                    : 'bg-primary/5 border-primary/20 shadow-sm',
                )}
              >
                <div className="shrink-0 mt-0.5">{getNotificationIcon(n.titulo, n.tipo)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-foreground leading-tight">{n.titulo}</p>
                    {!n.lida && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1"></span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{n.descricao}</p>
                  <p className="text-[10px] text-muted-foreground/60 font-medium">
                    {formatDistanceToNow(new Date(n.created), { addSuffix: true, locale: ptBR })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      <div className="p-3 border-t bg-card mt-auto text-center shrink-0">
        <Link
          to="/notificacoes"
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          [Ver Todas →]
        </Link>
      </div>
    </Card>
  )
}
