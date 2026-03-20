import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { agenteSchema, AgenteFormValues } from '@/schemas/agente'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { FormContent } from './FormContent'
import { createAgente } from '@/services/agentes'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { useState, useEffect } from 'react'
import { ImportedFieldsContext } from '@/components/agentes/FormHelpers'
import { ChevronLeft, Save, Upload } from 'lucide-react'
import { ImportAgenteModal } from '@/components/agentes/ImportAgenteModal'

export default function NovoAgente() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const [initialData] = useState(() => location.state?.importedData || {})
  const [importedFields, setImportedFields] = useState<string[]>(() => {
    const data = location.state?.importedData || {}
    return Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== '')
  })

  const [generatedId] = useState(() => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const rnd = Math.floor(100000 + Math.random() * 900000)
    return `AGT-${today}-${rnd}`
  })

  const form = useForm<AgenteFormValues>({
    resolver: zodResolver(agenteSchema),
    defaultValues: {
      numero_controle: generatedId,
      possuiCnpj: 'Não',
      emiteNotaFiscal: 'Não',
      notaTerceiros: 'Não',
      dadosBancariosTerceiros: 'Não',
      ativo: 'Sim',
      naBlackList: 'Não',
      ...initialData,
    },
  })

  useEffect(() => {
    if (location.state?.showImportSuccess && location.state?.importedData) {
      toast({
        title: 'Sucesso',
        description: 'Planilha importada com sucesso! Revise os dados antes de salvar.',
      })
      const data = location.state.importedData
      form.reset({ ...form.getValues(), ...data })
      setImportedFields(Object.keys(data).filter((k) => data[k] !== undefined && data[k] !== ''))
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, navigate, toast, form])

  const onSubmit = async (data: AgenteFormValues) => {
    setSaving(true)
    try {
      await createAgente(data as any)
      toast({ title: 'Sucesso', description: 'Agente cadastrado com sucesso!' })
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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[15px] font-semibold text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2">
            Cadastro de Agente
          </h1>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            disabled={saving}
            className="flex-1 sm:flex-none h-12 rounded-xl px-5 border-border"
          >
            <Upload className="w-4 h-4 mr-2" /> Importar e Preencher
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            className="flex-1 sm:flex-none h-12 rounded-xl px-5 border-border text-foreground hover:bg-muted/50"
          >
            Cancelar
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            variant="secondary"
            className="flex-1 sm:flex-none h-12 px-8 rounded-xl font-bold shadow-sm text-[15px]"
            disabled={saving}
          >
            {saving ? (
              'Salvando...'
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" /> Salvar Agente
              </>
            )}
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

      <ImportAgenteModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
    </div>
  )
}
