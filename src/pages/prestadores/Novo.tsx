import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { prestadorSchema, PrestadorFormValues } from '@/schemas/prestador'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { FormContent } from './FormContent'
import { createPrestador } from '@/services/prestadores'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { useState, useEffect } from 'react'
import { ImportedFieldsContext } from '@/components/prestadores/FormHelpers'

export default function NovoPrestador() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const [initialData] = useState(() => location.state?.importedData || {})
  const [importedFields] = useState<string[]>(() => {
    const data = location.state?.importedData || {}
    return Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== '')
  })

  useEffect(() => {
    if (location.state?.showImportSuccess) {
      toast({
        title: 'Sucesso',
        description: 'Planilha importada com sucesso! Revise os dados antes de salvar.',
      })
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, navigate, toast])

  const form = useForm<PrestadorFormValues>({
    resolver: zodResolver(prestadorSchema),
    defaultValues: {
      possuiCnpj: 'Não',
      emiteNotaFiscal: 'Não',
      notaTerceiros: 'Não',
      dadosBancariosTerceiros: 'Não',
      ativo: 'Sim',
      naBlackList: 'Não',
      ...initialData,
    },
  })

  const onSubmit = async (data: PrestadorFormValues) => {
    setSaving(true)
    try {
      await createPrestador(data as any)
      toast({ title: 'Sucesso', description: 'Prestador cadastrado com sucesso!' })
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

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cadastro de Prestador</h1>
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
          <ImportedFieldsContext.Provider value={importedFields}>
            <FormContent />
          </ImportedFieldsContext.Provider>
        </form>
      </Form>
    </div>
  )
}
