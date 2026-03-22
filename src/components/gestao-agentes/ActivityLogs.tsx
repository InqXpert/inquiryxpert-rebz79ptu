import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Activity } from 'lucide-react'

interface Props {
  targetUserId?: string | null
  global?: boolean
}

export function ActivityLogs({ targetUserId, global }: Props) {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true)
      try {
        let filter = ''
        if (!global && targetUserId) {
          filter = `user_id = "${targetUserId}" || usuario_afetado_id = "${targetUserId}"`
        } else if (!global && !targetUserId) {
          filter = `id = "null"` // ensure empty state if specific user was requested but not found
        }

        const res = await pb.collection('usuarios_historico').getList(1, 10, {
          filter,
          sort: '-created',
          expand: 'user_id',
        })
        setLogs(res.items)
      } catch (e) {
        console.error('Failed to fetch activity logs', e)
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [targetUserId, global])

  return (
    <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden mt-6">
      <CardHeader className="bg-muted/30 border-b border-border p-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-bold">Auditoria de Atividades</CardTitle>
        </div>
        <CardDescription>Logs de acesso e ações recentes no sistema</CardDescription>
      </CardHeader>
      <div className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-transparent hover:bg-transparent">
              <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                Data/Hora
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                Usuário
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                Ação
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
                Descrição
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Nenhuma atividade recente encontrada.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="text-[13px] text-muted-foreground whitespace-nowrap">
                    {format(new Date(log.created), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </TableCell>
                  <TableCell className="font-medium text-[#282c59] text-[13px]">
                    {log.expand?.user_id?.name || 'Sistema'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="uppercase text-[10px] tracking-wider font-bold shadow-sm"
                    >
                      {log.acao.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className="text-[13px] text-muted-foreground max-w-[300px] truncate"
                    title={log.descricao}
                  >
                    {log.descricao}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
