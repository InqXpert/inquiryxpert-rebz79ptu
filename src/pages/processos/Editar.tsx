import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function ProcessoEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="w-full px-4 md:px-8 py-6 md:py-8 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Editar Processo</h1>
          <p className="text-muted-foreground">ID do processo: {id}</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Formulário de Edição</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  )
}
