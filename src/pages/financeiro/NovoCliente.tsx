import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ClienteForm } from './components/ClienteForm'

export default function NovoCliente() {
  const navigate = useNavigate()
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/financeiro/clientes')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-[28px] font-bold text-[#0a2540] dark:text-white">Novo Cliente</h1>
          <p className="text-muted-foreground text-[14px] mt-1">
            Cadastrar um novo contrato e dados de faturamento.
          </p>
        </div>
      </div>

      <ClienteForm />
    </div>
  )
}
