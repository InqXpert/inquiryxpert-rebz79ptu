import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { prestadorSchema, PrestadorFormValues } from '@/schemas/prestador'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { FormContent } from './FormContent'
import { getPrestador, updatePrestador } from '@/services/prestadores'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export default function EditarPrestador() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const form = useForm<PrestadorFormValues>({
    resolver: zodResolver(prestadorSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (id) {
      getPrestador(id)
        .then((data) => {
          form.reset(data as any)
          setLoading(false)
        })
        .catch(() => {
          toast({ title: 'Erro', description: 'Prestador não encontrado.', variant: 'destructive' })
          navigate('/prestadores')
        })
    }
  }, [id, form, navigate, toast])

  const onSubmit = async (data: PrestadorFormValues) => {
    setSaving(true)
    try {
      await updatePrestador(id!, data as any)
      toast({ title: 'Atualizado', description: 'Dados salvos com sucesso!' })
      navigate('/prestadores')
    } catch (error) {
      toast({
        title: 'Erro ao atualizar',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return <div className="p-8 text-center text-muted-foreground">Carregando dados...</div>

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Editar Prestador</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)} disabled={saving}>
            Cancelar
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="rounded-full px-8"
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar'}
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
