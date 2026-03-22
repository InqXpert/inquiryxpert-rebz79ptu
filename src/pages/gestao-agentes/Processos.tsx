import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, ChevronRight, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGestaoAgentes } from '@/hooks/useGestaoAgentes'
import { getProcessosAgente } from '@/services/gestaoAgentes'
import { ProcessoOperacional } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { useDebounce } from '@/hooks/use-debounce'
import { useRealtime } from '@/hooks/use-realtime'

export default function GestaoAgentesProcessos() {
  const navigate = useNavigate()
  const { agenteId, loading, initAgente } = useGestaoAgentes()
  const [processos, setProcessos] = useState<ProcessoOperacional[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)
  const [loadingData, setLoadingData] = useState(true)

  const loadData = async () => {
    if (!agenteId) return
    setLoadingData(true)
    try {
      const data = await getProcessosAgente(agenteId, debouncedSearch)
      setProcessos(data)
    } finally {
      setLoadingData(false)
    }
  }

  useEffect(() => {
    initAgente()
  }, [initAgente])

  useEffect(() => {
    if (agenteId) loadData()
  }, [agenteId, debouncedSearch])

  useRealtime(
    'processos_operacionais',
    () => {
      if (agenteId) loadData()
    },
    !!agenteId,
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'bloqueado_sem_audio':
        return (
          <Badge variant="destructive" className="flex gap-1">
            <AlertCircle className="w-3 h-3" /> Bloqueado S/ Áudio
          </Badge>
        )
      case 'concluido':
        return <Badge variant="success">Concluído</Badge>
      case 'em_andamento':
        return <Badge variant="warning">Em Andamento</Badge>
      default:
        return (
          <Badge variant="secondary" className="capitalize">
            {status?.replace('_', ' ')}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#282c59]">Meus Processos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie e atualize o andamento das suas sindicâncias.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número ou segurado..."
            className="pl-9 h-11 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-border shadow-sm rounded-2xl bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-semibold text-[13px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Processo</th>
                <th className="px-6 py-4">Segurado</th>
                <th className="px-6 py-4">Prazo</th>
                <th className="px-6 py-4">Prioridade</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading || loadingData ? (
                [1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <Skeleton className="h-5 w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-5 w-40" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-5 w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-5 w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-6 w-28 rounded-full" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Skeleton className="h-9 w-24 ml-auto rounded-lg" />
                    </td>
                  </tr>
                ))
              ) : processos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 text-muted-foreground/30 mb-3" />
                      <p className="font-medium text-[15px]">Nenhum processo encontrado.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                processos.map((proc) => (
                  <tr key={proc.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#282c59]">
                      {proc.numero_processo || proc.numero_controle}
                    </td>
                    <td className="px-6 py-4">{proc.nome_segurado}</td>
                    <td className="px-6 py-4">
                      {proc.data_prazo ? new Date(proc.data_prazo).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 capitalize">{proc.prioridade || 'Normal'}</td>
                    <td className="px-6 py-4">{getStatusBadge(proc.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-[#2bc8cf] text-[#282c59] hover:bg-[#2bc8cf]/10"
                        onClick={() => navigate(`/gestao-agentes/processos/${proc.id}`)}
                      >
                        Abrir <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
