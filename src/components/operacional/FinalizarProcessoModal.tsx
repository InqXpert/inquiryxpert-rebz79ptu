import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Processo } from '@/types/processo'
import { createAuditLog } from '@/services/processosService'
import { useAuth } from '@/hooks/use-auth'

const schema = z
  .object({
    honorario_valor: z
      .number({
        required_error: 'Informe o valor de honorário',
        invalid_type_error: 'Informe um valor de honorário',
      })
      .positive('Informe um valor de honorário válido'),
    despesas_recebidas: z.enum(['SIM', 'NAO'], {
      required_error: 'Selecione se as despesas foram recebidas',
    }),
    gravacoes_recebidas: z.enum(['SIM', 'NAO'], {
      required_error: 'Selecione se as gravações foram recebidas',
    }),
    despesas_valor: z.number({ invalid_type_error: 'Informe o valor de despesas' }).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.despesas_recebidas === 'SIM') {
      if (
        data.despesas_valor === undefined ||
        data.despesas_valor === null ||
        data.despesas_valor < 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Informe o valor de despesas',
          path: ['despesas_valor'],
        })
      }
    }
  })

type FormData = z.infer<typeof schema>

interface Props {
  processo: Processo | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function FinalizarProcessoModal({ processo, open, onOpenChange, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      despesas_valor: undefined,
      honorario_valor: undefined,
      despesas_recebidas: undefined,
      gravacoes_recebidas: undefined,
    },
  })

  useEffect(() => {
    if (open && processo) {
      form.reset({
        despesas_valor: undefined,
        honorario_valor: undefined,
        despesas_recebidas: undefined,
        gravacoes_recebidas: undefined,
      })

      if (processo.agente_id) {
        setLoading(true)
        pb.collection('agentes')
          .getOne(processo.agente_id)
          .then((agente) => {
            if (agente.valorHonorario) {
              form.setValue('honorario_valor', Number(agente.valorHonorario))
            }
          })
          .catch((err) => {
            console.error('Failed to load agent info:', err)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }
  }, [open, processo, form])

  const onSubmit = async (data: FormData) => {
    if (!processo) return
    setSaving(true)
    try {
      const autorizado = data.despesas_recebidas === 'SIM' && data.gravacoes_recebidas === 'SIM'

      const payload = {
        processo_id: processo.id,
        honorario_valor: data.honorario_valor,
        despesas_valor: data.despesas_valor ?? 0,
        despesas_recebidas: data.despesas_recebidas === 'SIM',
        gravacoes_recebidas: data.gravacoes_recebidas === 'SIM',
        status_pagamento: autorizado ? 'AUTORIZADO' : 'NAO_AUTORIZADO',
        flag_bloqueio: !autorizado,
      }

      await pb.collection('processos_finalizacao').create(payload)

      const prevStatus = processo.status
      await pb.collection('processos_operacionais').update(processo.id, {
        status: 'FINALIZADO',
        status_finalizacao: 'FINALIZADO',
      })

      await createAuditLog(
        processo.id,
        'STATUS_ALTERADO',
        user?.id,
        { status: prevStatus },
        { status: 'FINALIZADO', finalizacao: payload },
      )

      toast.success('Processo finalizado com sucesso!')
      onOpenChange(false)
      onSuccess()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Erro ao finalizar o processo')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !saving && onOpenChange(val)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Finalizar Processo {processo?.numero_controle || processo?.id}</DialogTitle>
          <DialogDescription>
            Preencha os detalhes financeiros e de documentação para finalizar o processo.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">Carregando dados do agente...</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="honorario_valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Honorário Valor (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="despesas_valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Despesas Valor (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="despesas_recebidas"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Despesas Recebidas?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex items-center space-x-6"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SIM" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="NAO" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gravacoes_recebidas"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gravações Recebidas?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex items-center space-x-6"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="SIM" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="NAO" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Finalizar Processo
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
