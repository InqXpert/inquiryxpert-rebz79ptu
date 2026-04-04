import { useAuth } from '@/hooks/use-auth'
import { FinanceiroNav } from './components/FinanceiroNav'
import { useNotasFiscais } from '@/hooks/useNotasFiscais'
import { GerarNotaFiscalSheet } from './components/GerarNotaFiscalSheet'
import { Mail, Check, X, Search } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function NotasFiscais() {
  const { user } = useAuth()
  const canManage = ['c-level', 'admin'].includes(user?.role)

  const {
    notas,
    clientes,
    periodos,
    loading,
    filters,
    setFilters,
    generateNF,
    markAsSent,
    registerPayment,
    cancelNF,
  } = useNotasFiscais()

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0)

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }

  const getStatusBadge = (status: string) => {
    const base =
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-sm'
    switch (status) {
      case 'emitida':
        return <span className={`${base} bg-secondary text-secondary-foreground`}>Emitida</span>
      case 'enviada':
        return <span className={`${base} bg-accent text-[var(--brand-navy,#0f172a)]`}>Enviada</span>
      case 'paga':
        return <span className={`${base} bg-[var(--brand-teal,#0D9488)] text-white`}>Paga</span>
      case 'cancelada':
        return (
          <span className={`${base} bg-destructive text-destructive-foreground`}>Cancelada</span>
        )
      default:
        return <span className={`${base} bg-muted text-muted-foreground`}>{status}</span>
    }
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[var(--brand-navy,#0f172a)]">Notas Fiscais</h1>
        <p className="text-sm text-muted-foreground mt-1">Emissão e controle de faturamento</p>
      </div>

      <FinanceiroNav />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 mt-6">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative max-w-xs w-full">
            <select
              value={filters.cliente_id}
              onChange={(e) => setFilters((prev) => ({ ...prev, cliente_id: e.target.value }))}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="all">Todos os Clientes</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.razao_social}
                </option>
              ))}
            </select>
          </div>
          <div className="relative max-w-[180px] w-full">
            <select
              value={filters.status}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="all">Todos os Status</option>
              <option value="emitida">Emitida</option>
              <option value="enviada">Enviada</option>
              <option value="paga">Paga</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        {canManage && <GerarNotaFiscalSheet periodos={periodos} onGenerate={generateNF} />}
      </div>

      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground border-b">
              <tr>
                <th className="px-4 py-3 font-bold">Número NF</th>
                <th className="px-4 py-3 font-bold">Cliente</th>
                <th className="px-4 py-3 font-bold">Emissão</th>
                <th className="px-4 py-3 font-bold">Vencimento</th>
                <th className="px-4 py-3 font-bold text-right">Valor Total</th>
                <th className="px-4 py-3 font-bold text-right">Líquido</th>
                <th className="px-4 py-3 font-bold">Status</th>
                {canManage && <th className="px-4 py-3 font-bold text-center">Ações</th>}
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={canManage ? 8 : 7} className="p-4">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              ) : notas.length === 0 ? (
                <tr>
                  <td colSpan={canManage ? 8 : 7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <img
                        src="https://img.usecurling.com/p/200/200?q=document%20empty&color=gray"
                        alt="Nenhuma NF"
                        className="w-32 h-32 opacity-50 mb-4 rounded-full bg-muted/30"
                      />
                      <p>Nenhuma nota fiscal encontrada.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                notas.map((nf) => (
                  <tr key={nf.id} className="transition-colors hover:bg-muted/30 even:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{nf.numero_nf}</td>
                    <td
                      className="px-4 py-3 truncate max-w-[200px]"
                      title={nf.expand?.cliente_id?.razao_social}
                    >
                      {nf.expand?.cliente_id?.razao_social || 'Cliente Removido'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(nf.data_emissao)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(nf.data_vencimento)}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {formatCurrency(nf.valor_total)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium whitespace-nowrap">
                      {formatCurrency(nf.valor_liquido)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(nf.status)}</td>
                    {canManage && (
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => markAsSent(nf.id)}
                            disabled={nf.status !== 'emitida'}
                            className="p-1.5 text-muted-foreground hover:text-blue-600 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors rounded-md hover:bg-muted"
                            title="Marcar como Enviada"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => registerPayment(nf.id, nf.periodo_id)}
                            disabled={nf.status !== 'enviada'}
                            className="p-1.5 text-muted-foreground hover:text-teal-600 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors rounded-md hover:bg-muted"
                            title="Registrar Pagamento"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => cancelNF(nf.id)}
                            disabled={nf.status === 'paga' || nf.status === 'cancelada'}
                            className="p-1.5 text-muted-foreground hover:text-red-600 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors rounded-md hover:bg-muted"
                            title="Cancelar NF"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
