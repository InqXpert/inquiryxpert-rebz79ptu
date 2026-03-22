import { useState, useEffect, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'
import { useDebounce } from '@/hooks/use-debounce'
import { formatDistanceToNow, format } from 'date-fns'
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
import { Search, Download, FilterX, ChevronLeft, ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { HistoricoDetalhesModal } from './HistoricoDetalhesModal'
import { toast } from 'sonner'

const acoesDisponiveis = [
  'login',
  'logout',
  'criar_usuario',
  'editar_usuario',
  'alterar_role',
  'resetar_senha',
  'alterar_status_usuario',
  'cadastro_agente',
  'edicao_agente',
  'alterar_status_agente',
  'criar_processo',
  'editar_processo',
]

export function HistoricoGeralTable() {
  const [logs, setLogs] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchIp, setSearchIp] = useState('')
  const debouncedIp = useDebounce(searchIp, 300)

  const [selectedUser, setSelectedUser] = useState('all')
  const [selectedAcao, setSelectedAcao] = useState('all')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const [selectedLog, setSelectedLog] = useState<any | null>(null)

  useEffect(() => {
    pb.collection('users').getFullList({ sort: 'name' }).then(setUsers)
  }, [])

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const filters = []
      if (selectedUser !== 'all')
        filters.push(`(user_id='${selectedUser}' || usuario_afetado_id='${selectedUser}')`)
      if (selectedAcao !== 'all') filters.push(`acao='${selectedAcao}'`)
      if (dateStart) filters.push(`created >= '${dateStart} 00:00:00'`)
      if (dateEnd) filters.push(`created <= '${dateEnd} 23:59:59'`)
      if (debouncedIp) filters.push(`ip_address ~ '${debouncedIp}'`)

      const res = await pb.collection('usuarios_historico').getList(page, 50, {
        filter: filters.join(' && '),
        sort: '-created',
        expand: 'user_id,usuario_afetado_id',
      })
      setLogs(res.items)
      setTotalPages(res.totalPages)
    } catch (e) {
      console.error(e)
      toast.error('Erro ao carregar histórico')
    } finally {
      setLoading(false)
    }
  }, [page, selectedUser, selectedAcao, dateStart, dateEnd, debouncedIp])

  useEffect(() => {
    setPage(1)
  }, [selectedUser, selectedAcao, dateStart, dateEnd, debouncedIp])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  const clearFilters = () => {
    setSelectedUser('all')
    setSelectedAcao('all')
    setDateStart('')
    setDateEnd('')
    setSearchIp('')
  }

  const handleExport = async () => {
    const t = toast.loading('Gerando arquivo CSV...')
    try {
      const filters = []
      if (selectedUser !== 'all')
        filters.push(`(user_id='${selectedUser}' || usuario_afetado_id='${selectedUser}')`)
      if (selectedAcao !== 'all') filters.push(`acao='${selectedAcao}'`)
      if (dateStart) filters.push(`created >= '${dateStart} 00:00:00'`)
      if (dateEnd) filters.push(`created <= '${dateEnd} 23:59:59'`)
      if (debouncedIp) filters.push(`ip_address ~ '${debouncedIp}'`)

      const fullLogs = await pb.collection('usuarios_historico').getFullList({
        filter: filters.join(' && '),
        sort: '-created',
        expand: 'user_id,usuario_afetado_id',
      })

      const rows = fullLogs.map((log) => [
        log.created,
        log.expand?.user_id?.name || 'Sistema',
        log.acao,
        log.expand?.usuario_afetado_id?.name || '-',
        log.ip_address || '',
        log.descricao,
      ])

      const csv = [
        ['Data', 'Usuario Ator', 'Acao', 'Usuario Afetado', 'IP Origem', 'Descricao'].join(','),
        ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')),
      ].join('\n')

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `historico-${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      toast.success('Arquivo CSV exportado com sucesso', { id: t })
    } catch (e) {
      toast.error('Erro ao exportar dados', { id: t })
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-white dark:bg-brand-navy/80 p-4 rounded-lg border border-brand-teal dark:border-brand-cyan/50 shadow-sm">
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Usuário..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Usuários</SelectItem>
            {users.map((u) => (
              <SelectItem key={u.id} value={u.id}>
                {u.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedAcao} onValueChange={setSelectedAcao}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ação..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Ações</SelectItem>
            {acoesDisponiveis.map((a) => (
              <SelectItem key={a} value={a}>
                {a.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
          className="w-full text-brand-gray dark:text-white"
          title="Data Inicial"
        />
        <Input
          type="date"
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
          className="w-full text-brand-gray dark:text-white"
          title="Data Final"
        />

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
          <Input
            placeholder="Filtrar por IP..."
            value={searchIp}
            onChange={(e) => setSearchIp(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="lg:col-span-5 flex justify-between items-center pt-2 border-t border-brand-teal/30">
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-brand-gray hover:text-brand-navy"
          >
            <FilterX className="w-4 h-4 mr-2" /> Limpar Filtros
          </Button>
          <Button
            onClick={handleExport}
            className="bg-brand-teal text-brand-navy hover:bg-brand-teal/80"
          >
            <Download className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-brand-teal dark:border-brand-cyan/50 bg-white dark:bg-brand-navy/80 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
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
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-brand-gray dark:text-brand-light"
                >
                  Nenhum registro de auditoria encontrado com os filtros atuais.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log, i) => (
                <TableRow
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="cursor-pointer hover:bg-brand-light/80 dark:hover:bg-white/10 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  <TableCell className="text-[13px] text-brand-gray dark:text-brand-light whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {formatDistanceToNow(new Date(log.created), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                      <span className="text-[11px]">
                        {format(new Date(log.created), 'dd/MM/yyyy HH:mm')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="font-bold uppercase text-[10px] tracking-wider bg-brand-light text-brand-navy border-none">
                      {log.acao.replace(/_/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-[13px] text-brand-navy dark:text-white">
                    {log.expand?.user_id?.name || 'Sistema'}
                  </TableCell>
                  <TableCell className="text-[13px] text-brand-gray dark:text-brand-light font-medium">
                    {log.expand?.usuario_afetado_id?.name || '-'}
                  </TableCell>
                  <TableCell className="text-[12px] font-mono text-brand-gray dark:text-brand-light/70">
                    {log.ip_address || '0.0.0.0'}
                  </TableCell>
                  <TableCell className="text-[13px] text-brand-navy dark:text-white font-medium">
                    <span className="line-clamp-2" title={log.descricao}>
                      {log.descricao}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {!loading && logs.length > 0 && (
          <div className="p-4 border-t border-brand-teal/50 dark:border-brand-cyan/30 flex items-center justify-between bg-brand-light/30 dark:bg-black/10">
            <span className="text-sm text-brand-gray dark:text-brand-light">
              Página {page} de {totalPages || 1}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-brand-teal"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="border-brand-teal"
              >
                Próxima <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <HistoricoDetalhesModal log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  )
}
