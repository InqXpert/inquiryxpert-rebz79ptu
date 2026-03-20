import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { agenteSchema, AgenteFormValues } from '@/schemas/agente'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { FormContent } from './FormContent'
import { getAgente, updateAgente } from '@/services/agentes'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { useState, useEffect } from 'react'
import { ImportedFieldsContext } from '@/components/agentes/FormHelpers'
import { ChevronLeft, Save } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function EditarAgente() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const form = useForm<AgenteFormValues>({
    resolver: zodResolver(agenteSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (id) {
      getAgente(id)
        .then((data) => {
          form.reset(data as unknown as AgenteFormValues)
          setLoading(false)
        })
        .catch(() => {
          toast({
            title: 'Erro',
            description: 'Erro ao carregar agentes.',
            variant: 'destructive',
          })
          navigate('/agentes')
        })
    }
  }, [id, form, navigate, toast])

  const onSubmit = async (data: AgenteFormValues) => {
    if (!id) return
    setSaving(true)
    try {
      await updateAgente(id, data as any)
      toast({ title: 'Sucesso', description: 'Agente atualizado com sucesso!' })
      navigate('/agentes')
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: getErrorMessage(error),
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto pb-20 space-y-6 animate-pulse">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Editar Agente</h1>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            className="flex-1 sm:flex-none h-12 rounded-xl"
          >
            Cancelar
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="flex-1 sm:flex-none h-12 px-8 bg-secondary text-white hover:bg-secondary/90 rounded-xl font-semibold shadow-sm"
            disabled={saving}
          >
            {saving ? (
              'Salvando...'
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ImportedFieldsContext.Provider value={[]}>
            <FormContent />
          </ImportedFieldsContext.Provider>
        </form>
      </Form>
    </div>
  )
}
