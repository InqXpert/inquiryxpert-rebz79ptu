import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

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
          <h1 className="text-2xl font-bold text-brand-navy">Editar Cliente</h1>
          <p className="text-muted-foreground mt-1">Atualizar os dados do contrato (ID: {id}).</p>
        </div>
      </div>
      <div className="rounded-md border bg-card p-8 text-center text-muted-foreground shadow-sm">
        O formulário de edição de cliente será implementado em breve.
      </div>
    </div>
  )
}
