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
import { useState, useEffect } from 'react'
import { ImportedFieldsContext } from '@/components/prestadores/FormHelpers'
import { ChevronLeft, Save } from 'lucide-react'

export default function EditPrestador() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    if (id) {
      getPrestador(id)
        .then((data) => {
          form.reset(data as unknown as PrestadorFormValues)
          setLoading(false)
        })
        .catch(() => {
          toast({
            title: 'Erro',
            description: 'Não foi possível carregar o prestador',
            variant: 'destructive',
          })
          navigate('/prestadores')
        })
    }
  }, [id, form, navigate, toast])

  const onSubmit = async (data: PrestadorFormValues) => {
    if (!id) return
    setSaving(true)
    try {
      await updatePrestador(id, data as any)
      toast({ title: 'Sucesso', description: 'Prestador atualizado com sucesso!' })
      navigate('/prestadores')
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
      <div className="flex-1 flex items-center justify-center py-20 text-muted-foreground animate-pulse">
        Carregando prestador...
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
          <h1 className="text-3xl font-bold text-primary tracking-tight">Editar Prestador</h1>
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
