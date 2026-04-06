import React from 'react'
import { useNotifications } from '@/hooks/use-notifications'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Trash2, FileWarning, Clock, Info, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function NotificacoesPage() {
  const { notifications, loading, markAsRead, removeNotification } = useNotifications()
  const navigate = useNavigate()

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'arquivo_rejeitado':
        return <FileWarning className="w-6 h-6 text-red-500" />
      case 'prazo_proximo':
        return <Clock className="w-6 h-6 text-orange-500" />
      case 'processo_aprovado':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />
      case 'arquivo_enviado':
        return <CheckCircle2 className="w-6 h-6 text-blue-500" />
      default:
        return <Info className="w-6 h-6 text-brand-cyan" />
    }
  }

  const handleNotificationClick = async (notif: any) => {
    if (!notif.lida) {
      await markAsRead(notif.id)
    }
    if (notif.processo_id) {
      if (notif.tipo === 'arquivo_rejeitado') {
        navigate(`/processos/${notif.processo_id}/documentos`)
      } else {
        navigate(`/processos/${notif.processo_id}`)
      }
    }
  }

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-4 py-20">
        <div className="w-8 h-8 rounded-full border-[3px] border-brand-cyan border-t-transparent animate-spin" />
        <span className="text-sm font-medium tracking-wide">Carregando notificações...</span>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 w-full max-w-5xl mx-auto flex flex-col h-full animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Central de Notificações</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-white rounded-xl shadow-sm border border-border">
          <CheckCircle2 className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-lg font-medium text-slate-600">Tudo limpo por aqui!</p>
          <p className="text-sm">Você não possui novas notificações no momento.</p>
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          {notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`transition-all duration-200 border-l-4 ${
                notif.lida
                  ? 'bg-slate-50 border-l-transparent opacity-75'
                  : 'bg-white border-l-brand-cyan shadow-sm hover:shadow-md'
              }`}
            >
              <CardContent className="p-4 sm:p-5 flex items-start gap-4">
                <div className="mt-0.5 shrink-0 bg-slate-100 p-2 rounded-full">
                  {getIcon(notif.tipo)}
                </div>

                <div
                  className="flex-1 cursor-pointer min-w-0"
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3
                      className={`font-semibold truncate text-[15px] ${
                        notif.lida ? 'text-slate-600' : 'text-slate-900'
                      }`}
                    >
                      {notif.titulo}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded">
                      {format(new Date(notif.created), "dd MMM 'às' HH:mm", { locale: ptBR })}
                    </span>
                  </div>

                  <p className="text-[14px] text-slate-600 line-clamp-2 leading-snug">
                    {notif.descricao}
                  </p>

                  {notif.expand?.processo_id && (
                    <p className="text-xs text-brand-cyan font-medium mt-2">
                      Processo Relacionado:{' '}
                      {notif.expand.processo_id.numero_controle || notif.processo_id}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  {!notif.lida && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        markAsRead(notif.id)
                      }}
                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                      title="Marcar como lida"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeNotification(notif.id)
                    }}
                    className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Excluir notificação"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
