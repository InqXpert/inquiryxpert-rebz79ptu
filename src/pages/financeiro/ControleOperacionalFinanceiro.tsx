import { useState, useMemo, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { AlertTriangle, PackageOpen, RefreshCcw, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { FinanceiroNav } from './components/FinanceiroNav'
import pb from '@/lib/pocketbase/client'

const formatDate = (d: string) => (d ? format(parseISO(d), 'dd/MM/yyyy') : '-')
const formatCurrency = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

const BLOCK_A = [
  'ID do Processo',
  'Status',
  'Tipo',
  'CIA',
  'Revisor',
  'Solicitante',
  'Aviso',
  'Cliente',
  'Placa',
  'Sindicante',
  'Data Conclusão',
  'Saída',
  'Complemento',
]
const BLOCK_B = [
  'Honorário Agente',
  'Despesas Agente',
  'Total a Pagar',
  'Adiantamento',
  'Data Adt.',
  'Saldo a Pagar',
  'Data Pag.',
]
const BLOCK_C = [
  'Honorário a Rec.',
  'Despesas a Rec.',
  'ISS',
  'Total a Receber',
  'Despesas Extras',
  'Data Rec.',
  'Desp. Comp.',
  'Data Rec. 2',
  'ISS 20%',
  'Líquido',
  'Margem (%)',
  'NF',
  'Data NF',
]

export default function ControleOperacionalFinanceiro() {
  const [dateFilter, setDateFilter] = useState('')
  const [appliedFilter, setAppliedFilter] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        let filterStr = `(status = 'Concluído' || status ~ 'Pendente de Documentos')`

        if (appliedFilter) {
          filterStr += ` && data_conclusao >= "${appliedFilter} 00:00:00" && data_conclusao <= "${appliedFilter} 23:59:59"`
        }

        // Must have total_a_receber > 0 for valid view
        filterStr += ` && processos_despesas_via_processo_id.total_a_receber > 0`

        const result = await pb
          .collection('processos_operacionais')
          .getList(currentPage, itemsPerPage, {
            filter: filterStr,
            expand:
              'agente_id,supervisor_id,solicitante_id,cliente_id,seguradora_id,processos_despesas_via_processo_id',
            sort: '-data_conclusao',
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
  }, [currentPage, appliedFilter])

  const mappedData = useMemo(() => {
    return data.map((proc) => {
      const despesas = proc.expand?.processos_despesas_via_processo_id?.[0] || {}

      const totalAPagar = despesas.total_a_pagar || 0
      const totalAReceber = despesas.total_a_receber || 0

      let margem = 100
      if (totalAPagar > 0 && totalAReceber > 0) {
        margem = ((totalAReceber - totalAPagar) / totalAReceber) * 100
      }

      let placa = proc.placas_veiculos || '-'
      if (
        proc.placas_veiculos_json &&
        Array.isArray(proc.placas_veiculos_json) &&
        proc.placas_veiculos_json.length > 0
      ) {
        placa = proc.placas_veiculos_json.join(', ')
      }

      return {
        id: proc.numero_processo || proc.numero_controle || proc.id,
        status: proc.status,
        tipo: proc.tipo_servico || proc.expand?.tipo_investigacao_id?.nome || '-',
        cia: proc.expand?.seguradora_id?.nome || proc.cia || '-',
        revisor: proc.expand?.supervisor_id?.name || proc.revisor || '-',
        solicitante: proc.expand?.solicitante_id?.name || proc.analista_solicitante || '-',
        aviso: proc.controle_cia || '-',
        cliente: proc.expand?.cliente_id?.nome || '-',
        placa,
        sindicante: proc.expand?.agente_id?.nomeCompleto || proc.agente_prestador || '-',
        dataConclusao: proc.data_conclusao,
        saida: proc.data_saida || '-',
        complemento: despesas.despesa_complemento || '-',

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
        nf: despesas.nf_numero || '-',
        dataEmissaoNF: despesas.data_emissao_nf,
        originalProc: proc,
      }
    })
  }, [data])

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-navy">
          CONTROLE — Operacional + Financeiro
        </h1>
        <p className="text-muted-foreground mt-1">
          Processos finalizados — Faturamento e Conciliação
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
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-md bg-muted/10">
          <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
          <h3 className="text-lg font-semibold">Erro ao carregar CONTROLE. Tente novamente.</h3>
          <Button
            onClick={() => {
              setCurrentPage(1)
              setAppliedFilter(appliedFilter) // re-trigger fetch
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
          <p>Nenhum processo finalizado nesta data com valores a receber</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="hidden lg:block overflow-x-auto border border-border rounded-md shadow-sm no-scrollbar bg-background">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-gray-100 text-brand-navy sticky top-0 z-10 text-xs uppercase tracking-wider">
                <tr>
                  <th
                    colSpan={13}
                    className="border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold"
                  >
                    Block A — Identificação
                  </th>
                  <th
                    colSpan={7}
                    className="border-b border-r px-4 py-2 text-center bg-gray-200/60 font-semibold"
                  >
                    Block B — Valores a Pagar ao Agente
                  </th>
                  <th
                    colSpan={13}
                    className="border-b px-4 py-2 text-center bg-gray-200/60 font-semibold"
                  >
                    Block C — Valores a Receber do Cliente
                  </th>
                </tr>
                <tr className="bg-gray-50 text-gray-600">
                  {BLOCK_A.map((h) => (
                    <th key={h} className="px-3 py-2 border-r border-b">
                      {h}
                    </th>
                  ))}
                  {BLOCK_B.map((h) => (
                    <th key={h} className="px-3 py-2 border-r border-b">
                      {h}
                    </th>
                  ))}
                  {BLOCK_C.map((h) => (
                    <th key={h} className="px-3 py-2 border-r border-b">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mappedData.map((row) => (
                  <tr
                    key={row.originalProc.id}
                    className="even:bg-muted/30 odd:bg-background hover:bg-gray-100/50 transition-colors duration-150"
                  >
                    <td className="px-3 py-2 border-r font-medium text-brand-navy">{row.id}</td>
                    <td className="px-3 py-2 border-r">
                      {row.status.includes('Pendente de Documentos') ? (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-300 font-normal"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" /> Pendente Doc.
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-300 font-normal"
                        >
                          Concluído
                        </Badge>
                      )}
                    </td>
                    <td className="px-3 py-2 border-r">{row.tipo}</td>
                    <td className="px-3 py-2 border-r">{row.cia}</td>
                    <td className="px-3 py-2 border-r">{row.revisor}</td>
                    <td className="px-3 py-2 border-r">{row.solicitante}</td>
                    <td className="px-3 py-2 border-r">{row.aviso}</td>
                    <td className="px-3 py-2 border-r truncate max-w-[150px]" title={row.cliente}>
                      {row.cliente}
                    </td>
                    <td className="px-3 py-2 border-r">{row.placa}</td>
                    <td className="px-3 py-2 border-r">{row.sindicante}</td>
                    <td className="px-3 py-2 border-r">{formatDate(row.dataConclusao)}</td>
                    <td className="px-3 py-2 border-r">{row.saida}</td>
                    <td className="px-3 py-2 border-r">{row.complemento}</td>

                    <td className="px-3 py-2 border-r">{formatCurrency(row.honorarioAgente)}</td>
                    <td className="px-3 py-2 border-r">{formatCurrency(row.despesasAgente)}</td>
                    <td className="px-3 py-2 border-r font-semibold">
                      {formatCurrency(row.totalAPagarAgente)}
                    </td>
                    <td className="px-3 py-2 border-r">{formatCurrency(row.adiantamento)}</td>
                    <td className="px-3 py-2 border-r">{formatDate(row.dataAdiantamento)}</td>
                    <td className="px-3 py-2 border-r text-red-600 font-medium">
                      {formatCurrency(row.saldoAPagar)}
                    </td>
                    <td className="px-3 py-2 border-r">{formatDate(row.dataPagamento)}</td>

                    <td className="px-3 py-2 border-r">{formatCurrency(row.honorarioAReceber)}</td>
                    <td className="px-3 py-2 border-r">{formatCurrency(row.despesasAReceber)}</td>
                    <td className="px-3 py-2 border-r">{formatCurrency(row.iss)}</td>
                    <td className="px-3 py-2 border-r font-bold text-green-700">
                      {formatCurrency(row.totalAReceber)}
                    </td>
                    <td className="px-3 py-2 border-r">{formatCurrency(row.despesasExtras)}</td>
                    <td className="px-3 py-2 border-r">{formatDate(row.dataRecebimento)}</td>
                    <td className="px-3 py-2 border-r">{row.despesaComplemento}</td>
                    <td className="px-3 py-2 border-r">{formatDate(row.dataRecebimento2)}</td>
                    <td className="px-3 py-2 border-r">{formatCurrency(row.iss20)}</td>
                    <td className="px-3 py-2 border-r font-semibold text-brand-navy">
                      {formatCurrency(row.liquido)}
                    </td>
                    <td className="px-3 py-2 border-r">{row.margem.toFixed(2)}%</td>
                    <td className="px-3 py-2 border-r">{row.nf}</td>
                    <td className="px-3 py-2">{formatDate(row.dataEmissaoNF)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {mappedData.map((item) => (
              <div
                key={item.originalProc.id}
                className="border rounded-lg p-4 bg-card shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-brand-navy">{item.id}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.cliente} • {item.tipo}
                    </p>
                  </div>
                  {item.status.includes('Pendente de Documentos') ? (
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-300"
                    >
                      Pendente
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-300"
                    >
                      Concluído
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm border-t pt-2">
                  <div>
                    <span className="text-muted-foreground block text-xs">Data Conclusão</span>
                    <span className="font-medium">{formatDate(item.dataConclusao)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Seguradora</span>
                    <span className="font-medium">{item.cia}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Pagar (Agente)</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(item.totalAPagarAgente)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Receber (Cia)</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(item.totalAReceber)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
