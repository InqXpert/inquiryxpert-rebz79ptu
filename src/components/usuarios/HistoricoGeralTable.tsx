import { useState, useEffect } from 'react'
import { usuariosService } from '@/services/usuariosService'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function HistoricoGeralTable() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    usuariosService
      .fetchAllHistorico()
      .then((data) => setLogs(data))
      .finally(() => setLoading(false))
  }, [])

  const filtered = logs.filter((log) => {
    if (!search) return true
    const s = search.toLowerCase()
    return (
      log.acao?.toLowerCase().includes(s) ||
      log.descricao?.toLowerCase().includes(s) ||
      log.expand?.user_id?.name?.toLowerCase().includes(s) ||
      log.expand?.usuario_afetado_id?.name?.toLowerCase().includes(s)
    )
  })

  return (
    <Card className="rounded-2xl border-none shadow-sm overflow-hidden bg-card">
      <CardContent className="p-0">
        <div className="p-5 border-b border-border bg-muted/10 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por usuário, ação ou descrição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-background border-border/60"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[160px]">Data e Hora</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Usuário Ator</TableHead>
              <TableHead>Usuário Afetado</TableHead>
              <TableHead>Endereço IP</TableHead>
              <TableHead className="w-[30%]">Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Nenhum registro de auditoria encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-[13px] text-muted-foreground whitespace-nowrap">
                    {format(new Date(log.created), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-bold uppercase text-[10px]">
                      {log.acao.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-[13px]">
                    {log.expand?.user_id?.name || 'Sistema'}
                  </TableCell>
                  <TableCell className="text-[13px] text-muted-foreground">
                    {log.expand?.usuario_afetado_id?.name || '-'}
                  </TableCell>
                  <TableCell className="text-[12px] font-mono text-muted-foreground">
                    {log.ip_address || '0.0.0.0'}
                  </TableCell>
                  <TableCell className="text-[13px] text-foreground">
                    <span className="line-clamp-2" title={log.descricao}>
                      {log.descricao}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
