import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { prestadorSchema, PrestadorFormValues } from '@/schemas/prestador'
import { useAppContext } from '@/store/AppContext'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { FormContent } from './FormContent'

export default function EditarPrestador() {
  const { id } = useParams()
  const { prestadores, updatePrestador } = useAppContext()
  const navigate = useNavigate()
  const { toast } = useToast()

  const prestador = prestadores.find((p) => p.id === id)

  const form = useForm<PrestadorFormValues>({
    resolver: zodResolver(prestadorSchema),
    defaultValues: prestador || {},
  })

  if (!prestador) return <div>Prestador não encontrado.</div>

  const onSubmit = (data: PrestadorFormValues) => {
    updatePrestador(id!, { ...data, id: id! } as any)
    toast({ title: 'Atualizado', description: 'Dados salvos com sucesso!' })
    navigate('/prestadores')
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Editar Prestador</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} className="rounded-full px-8">
            Salvar
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormContent />
        </form>
      </Form>
    </div>
  )
}
