import { FinanceiroNav } from './components/FinanceiroNav'

export default function NotasFiscais() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Notas Fiscais</h1>
        <p className="text-muted-foreground mt-1">Gestão de emissões e status das NFs.</p>
      </div>
      <FinanceiroNav />
      <div className="rounded-md border bg-card p-8 text-center text-muted-foreground shadow-sm">
        Nenhuma nota fiscal emitida.
      </div>
    </div>
  )
}
