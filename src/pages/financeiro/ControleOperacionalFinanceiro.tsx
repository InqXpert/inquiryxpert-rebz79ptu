import React, { useState, useMemo, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import {
  AlertTriangle,
  PackageOpen,
  RefreshCcw,
  Search,
  X,
  Edit2,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { AcoesNF } from './components/AcoesNF'
import { AcoesPagamento } from './components/AcoesPagamento'
import { EditarRecebiveisModal } from './components/EditarRecebiveisModal'
import { FinalizarProcessoModal } from '@/components/operacional/FinalizarProcessoModal'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { FinanceiroNav } from './components/FinanceiroNav'
import pb from '@/lib/pocketbase/client'
import { Processo } from '@/types/processo'

const formatDate = (d: string) => (d ? format(parseISO(d), 'dd/MM/yyyy') : '-')
const formatCurrency = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

export default function ControleOperacionalFinanceiro() {
  const [dateFilter, setDateFilter] = useState('')
  const [appliedFilter, setAppliedFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [refreshKey, setRefreshKey] = useState(0)

  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const [selectedProcessoForFat, setSelectedProcessoForFat] = useState<Processo | null>(null)
  const [isModalFatOpen, setIsModalFatOpen] = useState(false)

  const { user } = useAuth()
  const itemsPerPage = 10

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        let filterStr = `(status = 'Concluído' || status ~ 'Pendente de Documentos' || status = 'FINALIZADO') && data_conclusao != ""`

        if (appliedFilter) {
          filterStr += ` && data_conclusao >= "${appliedFilter} 00:00:00" && data_conclusao <= "${appliedFilter} 23:59:59"`
        }

        const result = await pb
          .collection('processos_operacionais')
          .getList(currentPage, itemsPerPage, {
            filter: filterStr,
            expand:
              'agente_id,supervisor_id,solicitante_id,cliente_id,seguradora_id,processos_despesas_via_processo_id,processos_finalizacao_via_processo_id,controle_operacional_financeiro_via_processo_id',
            sort: '-data_conclusao,-created',
          })

        if (isMounted) {
          setData(result.items)
          setTotalPages(result.totalPages || 1)
        }
      } catch (err) {
        console.error('Erro ao buscar CONTROLE:', err)
        if (isMounted) setIsError(true)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [currentPage, appliedFilter, refreshKey])

  const mappedData = useMemo(() => {
    return data.map((proc) => {
      const despesas = proc.expand?.processos_despesas_via_processo_id?.[0] || {}
      const finalizacao =
        proc.expand?.processos_finalizacao_via_processo_id?.[0] ||
        proc.expand?.controle_operacional_financeiro_via_processo_id?.[0] ||
        {}

      const totalAPagar = despesas.total_a_pagar || 0
      const totalAReceber = despesas.total_a_receber || 0

      let margem = 100
      if (totalAPagar > 0 && totalAReceber > 0) {
        margem = ((totalAReceber - totalAPagar) / totalAReceber) * 100
      }

      return {
        id: proc.numero_processo || proc.numero_controle || proc.id,
        status: proc.status,
        tipo: proc.tipo_servico || proc.expand?.tipo_investigacao_id?.nome || '-',
        cia: proc.expand?.seguradora_id?.nome || proc.cia || '-',
        revisor: proc.expand?.supervisor_id?.name || proc.revisor || '-',
        sindicante: proc.expand?.agente_id?.nomeCompleto || proc.agente_prestador || '-',
        avisoPagamento: finalizacao.aviso || '-',
        dataConclusao: proc.data_conclusao,

        honorarioAgente: despesas.honorario_agente || 0,
        despesasAgente: despesas.despesas_agente || 0,
        totalAPagarAgente: totalAPagar,
        adiantamento: despesas.adiantamento || 0,
        dataAdiantamento: despesas.data_adiantamento,
        saldoAPagar: despesas.saldo_a_pagar || 0,
        dataPagamento: despesas.data_pagamento,

        honorarioAReceber: despesas.honorario_a_receber || 0,
        despesasAReceber: despesas.despesas_a_receber || 0,
        iss: despesas.iss || 0,
        totalAReceber: totalAReceber,
        despesasExtras: despesas.despesas_extras || 0,
        dataRecebimento: despesas.data_recebimento,
        despesaComplemento: despesas.despesa_complemento || '-',
        dataRecebimento2: despesas.data_recebimento_2,
        iss20: despesas.iss_20 || 0,
        liquido: despesas.liquido || 0,
        margem: margem,
        despesaId: despesas.id,
        nf: despesas.nf_numero || '-',
        dataEmissaoNF: despesas.data_emissao_nf,
        originalProc: proc,
      }
    })
  }, [data])

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-navy">
          CONTROLE — Operacional + Financeiro
        </h1>
        <p className="text-muted-foreground mt-1">
          Gerenciamento financeiro condensado com linhas expansíveis
        </p>
      </div>
      <FinanceiroNav />

      <div className="flex flex-wrap items-center gap-3 bg-muted/20 p-4 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium whitespace-nowrap text-muted-foreground">
            Filtrar por data conclusão:
          </label>
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-auto bg-background"
          />
        </div>
        <Button
          onClick={() => {
            setAppliedFilter(dateFilter)
            setCurrentPage(1)
          }}
        >
          <Search className="w-4 h-4 mr-2" /> Filtrar
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setDateFilter('')
            setAppliedFilter('')
            setCurrentPage(1)
          }}
        >
          <X className="w-4 h-4 mr-2" /> Limpar filtro
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-md bg-muted/10">
          <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
          <h3 className="text-lg font-semibold">Erro ao carregar CONTROLE. Tente novamente.</h3>
          <Button
            onClick={() => {
              setCurrentPage(1)
              setAppliedFilter(appliedFilter)
            }}
            className="mt-4"
            variant="outline"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Tentar Novamente
          </Button>
        </div>
      ) : mappedData.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
          <PackageOpen className="h-12 w-12 mb-4 opacity-50" />
          <p>Nenhum processo finalizado para exibir</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-border rounded-md shadow-sm bg-background">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-brand-navy sticky top-0 z-10 text-xs uppercase tracking-wider border-b">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left">ID / Controle</th>
                  <th className="px-4 py-3 font-semibold text-left">Supervisor</th>
                  <th className="px-4 py-3 font-semibold text-left">Seguradora</th>
                  <th className="px-4 py-3 font-semibold text-left">Tipo</th>
                  <th className="px-4 py-3 font-semibold text-left">Agente</th>
                  <th className="px-4 py-3 font-semibold text-center">Status Pagamento</th>
                  <th className="px-4 py-3 font-semibold text-center">Data Conclusão</th>
                  <th className="px-4 py-3 font-semibold text-right w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mappedData.flatMap((row) => {
                  const rows = [
                    <tr
                      key={row.originalProc.id}
                      className="transition-colors hover:bg-muted/50 cursor-pointer bg-background"
                      onClick={() => toggleRow(row.id)}
                    >
                      <td className="px-4 py-3 font-medium text-brand-navy whitespace-nowrap">
                        {row.id}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap truncate max-w-[140px]"
                        title={row.revisor}
                      >
                        {row.revisor}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap truncate max-w-[140px]"
                        title={row.cia}
                      >
                        {row.cia}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap truncate max-w-[140px]"
                        title={row.tipo}
                      >
                        {row.tipo}
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap truncate max-w-[140px]"
                        title={row.sindicante}
                      >
                        {row.sindicante}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {row.avisoPagamento === 'PAGAMENTO AUTORIZADO' ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-300 font-normal"
                          >
                            AUTORIZADO
                          </Badge>
                        ) : row.avisoPagamento === 'PAGAMENTO NÃO AUTORIZADO' ? (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-300 font-normal"
                          >
                            NÃO AUTORIZADO
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="font-normal">
                            {row.avisoPagamento}
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        {formatDate(row.dataConclusao)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleRow(row.id)
                          }}
                        >
                          {expandedRows[row.id] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </td>
                    </tr>,
                  ]

                  if (expandedRows[row.id]) {
                    rows.push(
                      <tr key={`${row.originalProc.id}-expanded`} className="bg-muted/20 border-b">
                        <td colSpan={8} className="p-0">
                          <div className="p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fade-in-down">
                            {/* Block B */}
                            <div className="bg-background border rounded-lg shadow-sm overflow-hidden h-fit">
                              <div className="p-4 border-b bg-muted/40 flex justify-between items-center">
                                <h3 className="font-semibold flex items-center text-brand-navy text-sm md:text-base">
                                  <UserCheck className="w-4 h-4 mr-2 text-muted-foreground" />
                                  Valores a Pagar ao Agente (Bloco B)
                                </h3>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedProcessoForFat(row.originalProc)
                                    setIsModalFatOpen(true)
                                  }}
                                >
                                  <Edit2 className="w-4 h-4 mr-2" /> Editar
                                </Button>
                              </div>
                              <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">Honorário</p>
                                  <p className="font-medium">
                                    {formatCurrency(row.honorarioAgente)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">Despesas</p>
                                  <p className="font-medium">
                                    {formatCurrency(row.despesasAgente)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">Adiantamento</p>
                                  <p className="font-medium text-amber-600">
                                    {formatCurrency(row.adiantamento)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">
                                    Data Adiantamento
                                  </p>
                                  <p className="font-medium">{formatDate(row.dataAdiantamento)}</p>
                                </div>
                                <div className="col-span-2 sm:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t mt-2">
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">
                                      Total a Pagar
                                    </p>
                                    <p className="font-semibold text-brand-navy text-base">
                                      {formatCurrency(row.totalAPagarAgente)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">
                                      Saldo a Pagar
                                    </p>
                                    <p className="font-bold text-red-600 text-base">
                                      {formatCurrency(row.saldoAPagar)}
                                    </p>
                                  </div>
                                  <div className="col-span-2 sm:col-span-1">
                                    <p className="text-muted-foreground text-xs mb-1">
                                      Data Pagamento
                                    </p>
                                    <p className="font-medium">{formatDate(row.dataPagamento)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Block C */}
                            <div className="bg-background border rounded-lg shadow-sm overflow-hidden h-fit">
                              <div className="p-4 border-b bg-muted/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <h3 className="font-semibold flex items-center text-brand-navy text-sm md:text-base">
                                  <Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
                                  Valores a Receber (Bloco C)
                                </h3>
                                <div className="flex flex-wrap items-center gap-2">
                                  <div className="border bg-background rounded px-1 flex items-center shadow-sm">
                                    <EditarRecebiveisModal
                                      despesaId={row.despesaId}
                                      honorario={row.honorarioAReceber}
                                      despesas={row.despesasAReceber}
                                      iss={row.iss}
                                      dataRecebimento={row.dataRecebimento}
                                      totalAPagar={row.totalAPagarAgente}
                                      userRole={user?.role}
                                      onSuccess={() => setRefreshKey((k) => k + 1)}
                                    />
                                  </div>
                                  <AcoesNF
                                    despesaId={row.despesaId}
                                    nfNumero={row.nf !== '-' ? row.nf : ''}
                                    dataEmissao={row.dataEmissaoNF}
                                    issValue={row.iss}
                                    totalAReceber={row.totalAReceber}
                                    totalAPagar={row.totalAPagarAgente}
                                    dataRecebimento={row.dataRecebimento}
                                    userRole={user?.role}
                                    onSuccess={() => setRefreshKey((k) => k + 1)}
                                  />
                                  <AcoesPagamento
                                    despesaId={row.despesaId}
                                    nfNumero={row.nf !== '-' ? row.nf : ''}
                                    dataRecebimento={row.dataRecebimento}
                                    totalAReceber={row.totalAReceber}
                                    totalAPagar={row.totalAPagarAgente}
                                    iss20={row.iss20}
                                    liquido={row.liquido}
                                    despesaComplemento={
                                      row.despesaComplemento !== '-' ? row.despesaComplemento : ''
                                    }
                                    userRole={user?.role}
                                    onSuccess={() => setRefreshKey((k) => k + 1)}
                                  />
                                </div>
                              </div>
                              <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">Honorário</p>
                                  <p className="font-medium">
                                    {formatCurrency(row.honorarioAReceber)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">Despesas</p>
                                  <p className="font-medium">
                                    {formatCurrency(row.despesasAReceber)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">Desp. Extras</p>
                                  <p className="font-medium">
                                    {formatCurrency(row.despesasExtras)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground text-xs mb-1">ISS</p>
                                  <p className="font-medium">{formatCurrency(row.iss)}</p>
                                </div>

                                <div className="col-span-2 sm:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t mt-2">
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">NF nº</p>
                                    <p className="font-medium">{row.nf}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">
                                      Data Emissão NF
                                    </p>
                                    <p className="font-medium">{formatDate(row.dataEmissaoNF)}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">Data Rec.</p>
                                    <p className="font-medium">{formatDate(row.dataRecebimento)}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">
                                      Total a Receber
                                    </p>
                                    <p className="font-bold text-green-700 text-base">
                                      {formatCurrency(row.totalAReceber)}
                                    </p>
                                  </div>
                                </div>

                                <div className="col-span-2 sm:col-span-4 grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t mt-2 bg-muted/30 p-3 rounded-md">
                                  <div className="col-span-1 sm:col-span-2">
                                    <p className="text-muted-foreground text-xs mb-1">
                                      Desp. Complementares
                                    </p>
                                    <p
                                      className="font-medium truncate"
                                      title={row.despesaComplemento}
                                    >
                                      {row.despesaComplemento}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">
                                      Data Rec. Comp.
                                    </p>
                                    <p className="font-medium">
                                      {formatDate(row.dataRecebimento2)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs mb-1">
                                      Líquido / Margem
                                    </p>
                                    <p className="font-semibold text-brand-navy">
                                      {formatCurrency(row.liquido)}{' '}
                                      <span className="text-xs font-normal text-muted-foreground ml-1">
                                        ({row.margem.toFixed(1)}%)
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>,
                    )
                  }

                  return rows
                })}
              </tbody>
            </table>
          </div>

          <FinalizarProcessoModal
            processo={selectedProcessoForFat}
            open={isModalFatOpen}
            onOpenChange={setIsModalFatOpen}
            onSuccess={() => setRefreshKey((k) => k + 1)}
          />

          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <div className="text-sm font-medium">
                Página {currentPage} de {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
