import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { createCliente, updateCliente, getCliente } from '@/services/clientes_contratos'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'

const formatCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .substring(0, 18)
}

const clienteSchema = z
  .object({
    razao_social: z.string().min(1, 'Razão Social é obrigatória'),
    cnpj: z.string().min(18, 'CNPJ incompleto').max(18, 'CNPJ inválido'),
    email_contato: z.string().email('Email inválido').optional().or(z.literal('')),
    status: z.enum(['ativo', 'inativo']),
    tipo_emissao: z.enum(['unitaria_processo', 'unitaria_lote']),
    periodo_faturamento: z.enum(['mensal', 'trimestral', 'por_demanda']),
    dia_corte: z.coerce.number().min(1).max(31).optional().or(z.literal('')),
    agrupamento: z.enum(['por_supervisor', 'por_tipo', 'por_regiao', 'sem_agrupamento']),
    condicao_pagamento: z.string().min(1, 'Condição de Pagamento é obrigatória'),
    tipo_imposto: z.enum(['ISS', 'ICMS', 'INSS', 'IR', 'nenhum']),
    aliquota_imposto: z.coerce.number().optional().or(z.literal('')),
    retencao_na_fonte: z.boolean().default(false),
    aliquota_retencao: z.coerce.number().optional().or(z.literal('')),
    regras_sla: z
      .array(
        z.object({
          tipo_id: z.string(),
          dias: z.coerce.number().min(0),
          tipo_contagem: z.enum(['corridos', 'uteis']),
        }),
      )
      .optional()
      .default([]),
  })
  .superRefine((data, ctx) => {
    if (data.periodo_faturamento !== 'por_demanda' && !data.dia_corte) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Dia de corte é obrigatório para este período',
        path: ['dia_corte'],
      })
    }
    if (data.tipo_imposto !== 'nenhum' && (!data.aliquota_imposto || data.aliquota_imposto <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Alíquota de imposto é obrigatória',
        path: ['aliquota_imposto'],
      })
    }
    if (data.retencao_na_fonte && (!data.aliquota_retencao || data.aliquota_retencao <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Alíquota de retenção é obrigatória',
        path: ['aliquota_retencao'],
      })
    }
  })

type ClienteFormValues = z.infer<typeof clienteSchema>

interface ClienteFormProps {
  id?: string
}

export function ClienteForm({ id }: ClienteFormProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isSupervisor = user?.role === 'supervisor'
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)
  const [tiposInvestigacao, setTiposInvestigacao] = useState<any[]>([])

  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      razao_social: '',
      cnpj: '',
      email_contato: '',
      status: 'ativo',
      tipo_emissao: 'unitaria_processo',
      periodo_faturamento: 'mensal',
      dia_corte: '',
      agrupamento: 'sem_agrupamento',
      condicao_pagamento: '',
      tipo_imposto: 'nenhum',
      aliquota_imposto: '',
      retencao_na_fonte: false,
      aliquota_retencao: '',
      regras_sla: [],
    },
  })

  const watchPeriodo = form.watch('periodo_faturamento')
  const watchTipoImposto = form.watch('tipo_imposto')
  const watchRetencao = form.watch('retencao_na_fonte')
  const regrasSla = form.watch('regras_sla') || []

  useEffect(() => {
    pb.collection('tipos_investigacao')
      .getFullList({ filter: 'ativo = true', sort: 'nome' })
      .then(setTiposInvestigacao)
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (watchPeriodo === 'por_demanda') {
      form.setValue('dia_corte', '', { shouldValidate: true })
    }
  }, [watchPeriodo, form])

  useEffect(() => {
    if (watchTipoImposto === 'nenhum') {
      form.setValue('aliquota_imposto', '', { shouldValidate: true })
    }
  }, [watchTipoImposto, form])

  useEffect(() => {
    if (!watchRetencao) {
      form.setValue('aliquota_retencao', '', { shouldValidate: true })
    }
  }, [watchRetencao, form])

  useEffect(() => {
    if (id) {
      getCliente(id)
        .then((data) => {
          form.reset({
            ...data,
            dia_corte: data.dia_corte || '',
            aliquota_imposto: data.aliquota_imposto || '',
            aliquota_retencao: data.aliquota_retencao || '',
            regras_sla: data.regras_sla || [],
          })
        })
        .catch(() => {
          toast.error('Erro ao carregar dados.')
          navigate('/financeiro/clientes')
        })
        .finally(() => setLoading(false))
    }
  }, [id, form, navigate])

  const handleRegraChange = (tipo_id: string, field: 'dias' | 'tipo_contagem', value: any) => {
    const newRegras = [...regrasSla]
    const index = newRegras.findIndex((r) => r.tipo_id === tipo_id)
    if (index >= 0) {
      newRegras[index] = { ...newRegras[index], [field]: value }
    } else {
      newRegras.push({
        tipo_id,
        dias: field === 'dias' ? value : 0,
        tipo_contagem: field === 'tipo_contagem' ? value : 'uteis',
      })
    }
    form.setValue('regras_sla', newRegras, { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = async (values: ClienteFormValues) => {
    if (isSupervisor) return
    setSaving(true)
    try {
      const payload = {
        ...values,
        dia_corte: values.dia_corte === '' ? 0 : Number(values.dia_corte),
        aliquota_imposto: values.aliquota_imposto === '' ? 0 : Number(values.aliquota_imposto),
        aliquota_retencao: values.aliquota_retencao === '' ? 0 : Number(values.aliquota_retencao),
      }

      if (id) {
        await updateCliente(id, payload)
      } else {
        await createCliente(payload)
      }
      toast.success('Cliente salvo com sucesso!')
      navigate('/financeiro/clientes')
    } catch (error) {
      toast.error('Erro ao salvar cliente.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-card border rounded-xl animate-pulse">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-card border rounded-[var(--radius)] p-6 shadow-sm animate-in fade-in duration-500">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Dados Básicos */}
          <section>
            <h2 className="text-lg font-bold text-[#0a2540] dark:text-white mb-4">Dados Básicos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="razao_social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da empresa" disabled={isSupervisor} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="00.000.000/0000-00"
                        maxLength={18}
                        disabled={isSupervisor}
                        {...field}
                        onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email_contato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de Contato</FormLabel>
                    <FormControl>
                      <Input placeholder="contato@empresa.com" disabled={isSupervisor} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={isSupervisor}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator />

          {/* Section 2: Regras de Faturamento */}
          <section>
            <h2 className="text-lg font-bold text-[#0a2540] dark:text-white mb-4">
              Regras de Faturamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tipo_emissao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Emissão</FormLabel>
                    <Select
                      disabled={isSupervisor}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="unitaria_processo">Unitária por Processo</SelectItem>
                        <SelectItem value="unitaria_lote">Unitária por Lote</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="periodo_faturamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período</FormLabel>
                    <Select
                      disabled={isSupervisor}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="trimestral">Trimestral</SelectItem>
                        <SelectItem value="por_demanda">Por Demanda</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dia_corte"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dia de Corte</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="31"
                        disabled={isSupervisor || watchPeriodo === 'por_demanda'}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agrupamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agrupamento</FormLabel>
                    <Select
                      disabled={isSupervisor}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="por_supervisor">Por Supervisor</SelectItem>
                        <SelectItem value="por_tipo">Por Tipo</SelectItem>
                        <SelectItem value="por_regiao">Por Região</SelectItem>
                        <SelectItem value="sem_agrupamento">Sem Agrupamento</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condicao_pagamento"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Condição de Pagamento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: 30 dias após emissão"
                        disabled={isSupervisor}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator />

          {/* Section 3: Impostos e Retenções */}
          <section>
            <h2 className="text-lg font-bold text-[#0a2540] dark:text-white mb-4">
              Impostos e Retenções
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tipo_imposto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Imposto</FormLabel>
                    <Select
                      disabled={isSupervisor}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nenhum">Nenhum</SelectItem>
                        <SelectItem value="ISS">ISS</SelectItem>
                        <SelectItem value="ICMS">ICMS</SelectItem>
                        <SelectItem value="INSS">INSS</SelectItem>
                        <SelectItem value="IR">IR</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchTipoImposto !== 'nenhum' && (
                <FormField
                  control={form.control}
                  name="aliquota_imposto"
                  render={({ field }) => (
                    <FormItem className="animate-in fade-in zoom-in-95 duration-300">
                      <FormLabel>Alíquota de Imposto (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          disabled={isSupervisor}
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="md:col-span-2 flex flex-col gap-4 mt-2">
                <FormField
                  control={form.control}
                  name="retencao_na_fonte"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-muted/20">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSupervisor}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">Retenção na Fonte</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Habilite se houver imposto retido na fonte.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {watchRetencao && (
                  <div className="md:w-1/2">
                    <FormField
                      control={form.control}
                      name="aliquota_retencao"
                      render={({ field }) => (
                        <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                          <FormLabel>Alíquota de Retenção (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              disabled={isSupervisor}
                              {...field}
                              value={field.value ?? ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          <Separator />

          {/* Section 4: SLAs por Tipo de Investigacao */}
          <section>
            <h2 className="text-lg font-bold text-[#0a2540] dark:text-white mb-4">
              SLAs por Tipo de Investigação
            </h2>
            <div className="grid grid-cols-1 gap-4 border-b border-border pb-4">
              {tiposInvestigacao.map((tipo) => {
                const regra = regrasSla.find((r) => r.tipo_id === tipo.id) || {
                  dias: 0,
                  tipo_contagem: 'uteis',
                }
                return (
                  <div key={tipo.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="font-bold text-[#0a2540] dark:text-white">{tipo.nome}</div>
                    <div>
                      <FormLabel className="md:hidden">Dias</FormLabel>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Dias"
                        disabled={isSupervisor}
                        value={regra.dias}
                        onChange={(e) => handleRegraChange(tipo.id, 'dias', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <FormLabel className="md:hidden">Tipo Contagem</FormLabel>
                      <Select
                        disabled={isSupervisor}
                        value={regra.tipo_contagem}
                        onValueChange={(val) => handleRegraChange(tipo.id, 'tipo_contagem', val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corridos">Dias Corridos</SelectItem>
                          <SelectItem value="uteis">Dias Úteis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )
              })}
              {tiposInvestigacao.length === 0 && (
                <div className="text-sm text-muted-foreground italic">
                  Nenhum tipo de investigação cadastrado.
                </div>
              )}
            </div>
          </section>

          {!isSupervisor && (
            <div className="flex justify-end gap-4 pt-4 border-t mt-8">
              <Button
                type="button"
                variant="outline"
                className="border-border text-[#0a2540] dark:text-white"
                onClick={() => navigate('/financeiro/clientes')}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary text-white hover:bg-primary/90"
                disabled={saving}
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
