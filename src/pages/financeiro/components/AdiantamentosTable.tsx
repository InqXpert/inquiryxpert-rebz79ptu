import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getAdiantamentos } from '@/services/adiantamentos'
import { useRealtime } from '@/hooks/use-realtime'
import { SolicitacaoAdiantamento } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AutorizarModal } from './AutorizarModal'
import { NegarModal } from './NegarModal'

export function AdiantamentosTable({ status }: { status: 'pendente' | 'autorizado' | 'negado' }) {
  const { user } = useAuth()
  const [data, setData] = useState<SolicitacaoAdiantamento[]>([])
  const [loading, setLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [denyModalOpen, setDenyModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<SolicitacaoAdiantamento | null>(null)

  const canManage = user?.role === 'c-level' || user?.role === 'admin'

  const loadData = async () => {
    try {
      setLoading(true)
      const items = await getAdiantamentos(status)
      setData(items)
    } catch (err) {
      console.error('Failed to load adiantamentos', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [status])

  useRealtime('solicitacoes_adiantamento', () => {
    loadData()
  })

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const formatDate = (val?: string) =>
    val ? format(parseISO(val), 'dd/MM/yyyy', { locale: ptBR }) : '-'

  if (loading) return <Skeleton className="w-full h-64 rounded-xl" />

  if (data.length === 0) {
    return (
      <div className="p-8 text-center bg-card border border-border rounded-xl">
        <p className="text-muted-foreground">Nenhuma solicitação encontrada na aba de {status}.</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-card border border-border rounded-xl overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium whitespace-nowrap">ID Processo</th>
              <th className="px-4 py-3 font-medium whitespace-nowrap">Agente</th>
              <th className="px-4 py-3 font-medium text-right whitespace-nowrap">V. Solicitado</th>
              {status === 'pendente' && (
                <th className="px-4 py-3 font-medium whitespace-nowrap">Data Solicitação</th>
              )}
              {status === 'autorizado' && (
                <>
                  <th className="px-4 py-3 font-medium text-right whitespace-nowrap">
                    V. Autorizado
                  </th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Data Autorização</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Status</th>
                </>
              )}
              {status === 'negado' && (
                <>
                  <th className="px-4 py-3 font-medium">Motivo</th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">Data Negação</th>
                </>
              )}
              {status === 'pendente' && canManage && (
                <th className="px-4 py-3 font-medium text-right whitespace-nowrap">Ações</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item) => {
              const agente = item.expand?.processo_id?.expand?.agente_id
              const nomeAgente = agente?.nomeCompleto || agente?.nome || 'N/A'
              const procNum = item.expand?.processo_id?.numero_controle || item.processo_id

              return (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{procNum}</td>
                  <td className="px-4 py-3 text-muted-foreground">{nomeAgente}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {formatCurrency(item.valor_solicitado)}
                  </td>
                  {status === 'pendente' && (
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(item.created)}</td>
                  )}

                  {status === 'autorizado' && (
                    <>
                      <td className="px-4 py-3 text-right font-medium text-green-600">
                        {formatCurrency(item.valor_autorizado || 0)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(item.data_autorizacao)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                          Processado
                        </Badge>
                      </td>
                    </>
                  )}

                  {status === 'negado' && (
                    <>
                      <td
                        className="px-4 py-3 text-muted-foreground max-w-[200px] truncate"
                        title={item.motivo_negacao}
                      >
                        {item.motivo_negacao}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(item.data_negacao)}
                      </td>
                    </>
                  )}

                  {status === 'pendente' && canManage && (
                    <td className="px-4 py-3 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => {
                          setSelectedRecord(item)
                          setAuthModalOpen(true)
                        }}
                      >
                        Autorizar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setSelectedRecord(item)
                          setDenyModalOpen(true)
                        }}
                      >
                        Negar
                      </Button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <AutorizarModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        record={selectedRecord}
      />
      <NegarModal open={denyModalOpen} onOpenChange={setDenyModalOpen} record={selectedRecord} />
    </>
  )
}
