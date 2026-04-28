import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { negarAdiantamento } from '@/services/adiantamentos'
import { SolicitacaoAdiantamento } from '@/types'

const schema = z.object({
  motivo_negacao: z.string().min(5, 'O motivo deve ter pelo menos 5 caracteres'),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: SolicitacaoAdiantamento | null
}

export function NegarModal({ open, onOpenChange, record }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { motivo_negacao: '' },
  })

  useEffect(() => {
    if (open) form.reset({ motivo_negacao: '' })
  }, [open, form])

  const onSubmit = async (data: FormData) => {
    if (!record) return
    try {
      await negarAdiantamento(record.id, data)
      toast.success('Adiantamento negado com sucesso')
      onOpenChange(false)
    } catch (err: any) {
      toast.error('Erro ao negar o adiantamento')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Negar Adiantamento</DialogTitle>
          <DialogDescription>
            Informe o motivo da negação. O solicitante será notificado automaticamente.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="motivo_negacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo da Negação</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Motivo detalhado para a recusa..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="destructive" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Salvando...' : 'Confirmar Negação'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
