import { FinanceiroNav } from './components/FinanceiroNav'

export default function PeriodosFaturamento() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Períodos de Faturamento</h1>
        <p className="text-muted-foreground mt-1">Acompanhe e feche os ciclos de faturamento.</p>
      </div>
      <FinanceiroNav />
      <div className="rounded-md border bg-card p-8 text-center text-muted-foreground shadow-sm">
        Nenhum período de faturamento encontrado.
      </div>
    </div>
  )
}
