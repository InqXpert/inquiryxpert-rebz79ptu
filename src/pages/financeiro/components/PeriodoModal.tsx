import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const formSchema = z
  .object({
    cliente_id: z.string().min(1, 'Selecione um cliente'),
    data_inicio: z.string().min(1, 'Data inicial é obrigatória'),
    data_fim: z.string().min(1, 'Data final é obrigatória'),
  })
  .refine(
    (data) => {
      if (!data.data_inicio || !data.data_fim) return true
      return new Date(data.data_fim) >= new Date(data.data_inicio)
    },
    {
      message: 'Data fim deve ser maior ou igual a data início',
      path: ['data_fim'],
    },
  )

type FormValues = z.infer<typeof formSchema>

interface PeriodoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientes: any[]
  onSubmit: (data: FormValues) => Promise<boolean>
}

export function PeriodoModal({ open, onOpenChange, clientes, onSubmit }: PeriodoModalProps) {
  const [submitting, setSubmitting] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cliente_id: '',
      data_inicio: '',
      data_fim: '',
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    const success = await onSubmit(values)
    setSubmitting(false)
    if (success) {
      form.reset()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[18px] font-bold text-brand-navy">
            Criar Novo Período
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cliente_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clientes.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.razao_social}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data_inicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Início</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data_fim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Fim</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary text-white" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Período
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
