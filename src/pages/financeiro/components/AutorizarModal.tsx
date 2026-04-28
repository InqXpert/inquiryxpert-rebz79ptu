import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { autorizarAdiantamento } from '@/services/adiantamentos'
import { SolicitacaoAdiantamento } from '@/types'

const schema = z.object({
  valor_autorizado: z.coerce.number().min(0.01, 'O valor deve ser maior que zero'),
  data_autorizacao: z.string().min(1, 'A data é obrigatória'),
  observacoes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: SolicitacaoAdiantamento | null
}

export function AutorizarModal({ open, onOpenChange, record }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      valor_autorizado: 0,
      data_autorizacao: '',
      observacoes: '',
    },
  })

  useEffect(() => {
    if (open && record) {
      form.reset({
        valor_autorizado: record.valor_solicitado,
        data_autorizacao: format(new Date(), 'yyyy-MM-dd'),
        observacoes: record.observacoes || '',
      })
    }
  }, [open, record, form])

  const onSubmit = async (data: FormData) => {
    if (!record) return
    try {
      await autorizarAdiantamento(record.id, data)
      toast.success('Adiantamento autorizado com sucesso')
      onOpenChange(false)
    } catch (err: any) {
      toast.error('Erro ao autorizar o adiantamento')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Autorizar Adiantamento</DialogTitle>
          <DialogDescription>
            Confirme os detalhes para autorizar o pagamento do adiantamento.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="valor_autorizado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Autorizado (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_autorizacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da Autorização</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notas adicionais..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Salvando...' : 'Confirmar Autorização'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
