import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { prestadorSchema, PrestadorFormValues } from '@/schemas/prestador'
import { useAppContext } from '@/store/AppContext'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { FormContent } from './FormContent'

export default function NovoPrestador() {
  const { addPrestador } = useAppContext()
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<PrestadorFormValues>({
    resolver: zodResolver(prestadorSchema),
    defaultValues: {
      possuiCnpj: 'Não',
      emiteNotaFiscal: 'Não',
      notaTerceiros: 'Não',
      dadosBancariosTerceiros: 'Não',
      ativo: 'Sim',
      naBlackList: 'Não',
    },
  })

  const onSubmit = (data: PrestadorFormValues) => {
    addPrestador({ ...data, id: Date.now().toString() } as any)
    toast({ title: 'Sucesso', description: 'Prestador cadastrado com sucesso!' })
    navigate('/prestadores')
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cadastro de Prestador</h1>
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
