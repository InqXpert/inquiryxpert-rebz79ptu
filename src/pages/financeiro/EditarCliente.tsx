import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ClienteForm } from './components/ClienteForm'

export default function EditarCliente() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/financeiro/clientes')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-[28px] font-bold text-[#0a2540] dark:text-white">Editar Cliente</h1>
          <p className="text-muted-foreground text-[14px] mt-1">Atualizar os dados do contrato.</p>
        </div>
      </div>

      {id ? <ClienteForm id={id} /> : <div className="text-center text-red-500">ID inválido</div>}
    </div>
  )
}
