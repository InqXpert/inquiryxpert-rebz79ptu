import { FinanceiroNav } from './components/FinanceiroNav'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

export default function ClientesList() {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Lista de Clientes e Contratos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os clientes e seus dados de faturamento.
          </p>
        </div>
        <Button asChild className="bg-brand-teal hover:bg-brand-teal/90">
          <Link to="/financeiro/clientes/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Link>
        </Button>
      </div>
      <FinanceiroNav />
      <div className="rounded-md border bg-card p-8 text-center text-muted-foreground shadow-sm">
        Nenhum cliente cadastrado no momento.
      </div>
    </div>
  )
}
