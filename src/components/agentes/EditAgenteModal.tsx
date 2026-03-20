import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { agenteSchema, AgenteFormValues } from '@/schemas/agente'
import { Form } from '@/components/ui/form'
import { FormContent } from '@/pages/agentes/FormContent'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { updateAgente } from '@/services/agentes'
import { useToast } from '@/hooks/use-toast'
import { ImportedFieldsContext } from '@/components/agentes/FormHelpers'
import { Agente } from '@/types'

interface EditAgenteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  agente: Agente | null
  onSuccess: () => void
}

export function EditAgenteModal({ open, onOpenChange, agente, onSuccess }: EditAgenteModalProps) {
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const form = useForm<AgenteFormValues>({
    resolver: zodResolver(agenteSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (agente && open) {
      form.reset(agente as unknown as AgenteFormValues)
    }
  }, [agente, open, form])

  const onSubmit = async (data: AgenteFormValues) => {
    if (!agente?.id) return
    setSaving(true)
    try {
      await updateAgente(agente.id, data as any)
      toast({ title: 'Sucesso', description: 'Agente atualizado com sucesso!' })
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Verifique os dados e tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-11/12 rounded-xl p-0 gap-0 border-none bg-[#F5F6FA]">
        <div className="bg-white p-6 border-b sticky top-0 z-10 flex flex-col gap-1">
          <DialogTitle className="text-2xl font-bold text-primary">Editar Cadastro</DialogTitle>
          <DialogDescription>
            Atualize as informações cadastrais do agente prestador.
          </DialogDescription>
        </div>
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ImportedFieldsContext.Provider value={[]}>
                <FormContent />
              </ImportedFieldsContext.Provider>

              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onOpenChange(false)}
                  disabled={saving}
                  className="rounded-xl h-11"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl h-11 px-8 bg-secondary hover:bg-secondary/90 text-white font-semibold"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
