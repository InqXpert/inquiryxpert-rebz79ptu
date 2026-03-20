import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import pb from '@/lib/pocketbase/client'
import type { UsuarioHistorico } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Activity } from 'lucide-react'

export default function UsuarioHistoricoDialog({
  open,
  onOpenChange,
  userId,
}: {
  open: boolean
  onOpenChange: () => void
  userId: string
}) {
  const [logs, setLogs] = useState<UsuarioHistorico[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open && userId) {
      setLoading(true)
      pb.collection('usuarios_historico')
        .getList<UsuarioHistorico>(1, 50, {
          filter: `user_id = '${userId}'`,
          sort: '-created',
        })
        .then((res) => {
          setLogs(res.items)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [open, userId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-none">
        <DialogHeader className="border-b pb-4 mb-4">
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Trilha de Auditoria e Histórico
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-8 animate-pulse">
              Carregando registros...
            </p>
          ) : logs.length === 0 ? (
            <div className="bg-muted/50 p-8 text-center text-sm text-muted-foreground border">
              Nenhum evento registrado para este usuário nas últimas 50 interações.
            </div>
          ) : (
            <div className="relative border-l-2 border-border ml-4 space-y-8 py-2">
              {logs.map((log) => (
                <div key={log.id} className="pl-6 relative">
                  <div className="absolute w-[11px] h-[11px] bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold tracking-tight uppercase text-secondary">
                        {log.acao.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 border">
                        {format(new Date(log.created), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Origem IP: {log.ip_address || '0.0.0.0'}
                    </span>
                    <div className="text-[13px] bg-muted/40 p-3 mt-2 border text-foreground/90 font-medium">
                      {log.descricao}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
