import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/use-auth'
import { useNovoProcesso } from '@/hooks/useNovoProcesso'
import { novoProcessoSchema, type NovoProcessoFormData } from '@/schemas/processoSchemas'
import { determineSupervisor } from '@/services/allocationService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Loader2, AlertTriangle, Plus, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { usePlacaValidation, useInsuredValidation } from '@/hooks/usePlacaValidation'
import { PlateValidationUI, InsuredValidationUI } from '@/components/processos/ValidationIndicators'
import { Separator } from '@/components/ui/separator'

const NATUREZAS = [
  'COLISAO COM TERCEIRO',
  'COLISAO SEM TERCEIRO',
  'INCENDIO',
  'ROUBO',
  'FURTO',
  'ENCHENTE',
  'PROPERTY',
  'I.E',
]
const TIPOS_INV = [
  'AUTO',
  'BUSCA B.O DOCS',
  'PERFIL',
  'FAST',
  'PROPERTY RES D.E',
  'PROPERTY MAQUINAS',
  'PROPERTY FURTO ROUBO',
  'PROPERTY RES EQUIP',
  'REMOTA',
  'I.E',
  'VIDA PREGRESSA',
]

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export default function NovoProcessoPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()
  const {
    agentes,
    users,
    supervisores,
    clientes,
    analistas,
    loadingInitial,
    isSubmitting,
    duplicateFound,
    setDuplicateFound,
    checkDuplicate,
    submit,
    createAnalista,
  } = useNovoProcesso()

  const [warningSupervisor, setWarningSupervisor] = useState('')
  const [suggestedSupervisorId, setSuggestedSupervisorId] = useState<string | null>(null)

  const [isAnalistaModalOpen, setIsAnalistaModalOpen] = useState(false)
  const [novoAnalista, setNovoAnalista] = useState({ nome: '', email: '', telefone: '', cargo: '' })
  const [isCreatingAnalista, setIsCreatingAnalista] = useState(false)

  const form = useForm<NovoProcessoFormData>({
    resolver: zodResolver(novoProcessoSchema),
    defaultValues: {
      cliente_id: '',
      seguradora: '',
      controle_cia: '',
      natureza_sinistro: '',
      tipo_investigacao: '',
      regiao_sinistro: '',
      nome_segurado: '',
      cpf_segurado: '',
      nome_condutor: '',
      cpf_condutor: '',
      placas_veiculos: '',
      analista_cliente_id: '',
      agente_id: '',
      supervisor_id: '',
      status: 'ANALISE_INICIAL',
      dados_terceiros: [],
    },
    mode: 'onSubmit',
  })

  const {
    fields: terceirosFields,
    append: appendTerceiro,
    remove: removeTerceiro,
  } = useFieldArray({
    control: form.control,
    name: 'dados_terceiros',
  })

  const {
    watch,
    setValue,
    formState: { errors },
  } = form

  const watchSeguradora = watch('seguradora')
  const watchTipoInvestigacao = watch('tipo_investigacao')
  const watchPlacas = watch('placas_veiculos')
  const watchNomeSegurado = watch('nome_segurado')
  const watchNatureza = watch('natureza_sinistro')

  const plateValidation = usePlacaValidation(watchPlacas || '')
  const insuredValidation = useInsuredValidation(watchNomeSegurado || '')

  const isProperty =
    watchNatureza === 'PROPERTY' ||
    (watchTipoInvestigacao && watchTipoInvestigacao.includes('PROPERTY'))
  const isColisaoTerceiro = watchNatureza === 'COLISAO COM TERCEIRO'

  const selectedCia = clientes.find((c) => c.razao_social === watchSeguradora)
  const analistasFiltrados = analistas.filter((a) => a.cliente_id === selectedCia?.id)

  useEffect(() => {
    if (user && !['c-level', 'admin', 'supervisor'].includes(user.role)) {
      toast({
        title: 'Acesso negado',
        description: 'Você não tem permissão para acessar esta página.',
        variant: 'destructive',
      })
      navigate('/processos', { replace: true })
    }
  }, [user, navigate, toast])

  useEffect(() => {
    if (watchSeguradora || watchTipoInvestigacao) {
      const suggested = determineSupervisor(watchTipoInvestigacao, watchSeguradora, supervisores)
      setSuggestedSupervisorId(suggested)
      if (suggested) {
        setValue('supervisor_id', suggested, { shouldValidate: true })
        setWarningSupervisor('')
      } else if (watchTipoInvestigacao) {
        setWarningSupervisor(
          'Nenhum supervisor mapeado para esta combinação. Selecione manualmente.',
        )
        setValue('supervisor_id', '', { shouldValidate: true })
      }
    }
  }, [watchSeguradora, watchTipoInvestigacao, supervisores, setValue])

  useEffect(() => {
    if (isProperty && watchPlacas) {
      setValue('placas_veiculos', '')
    }
    if (!isColisaoTerceiro && terceirosFields.length > 0) {
      setValue('dados_terceiros', [])
    }
  }, [isProperty, isColisaoTerceiro])

  const onBlurUppercase = (field: any) => {
    const val = form.getValues(field)
    if (typeof val === 'string' && val !== val.toUpperCase()) {
      setValue(field, val.toUpperCase(), { shouldValidate: true })
    }
  }

  const onSubmit = async (data: NovoProcessoFormData) => {
    const duplicate = await checkDuplicate(data.nome_segurado, data.placas_veiculos || '')
    if (duplicate) {
      setDuplicateFound({ ...duplicate, pendingData: data })
    } else {
      handleFinalSubmit(data)
    }
  }

  const onError = () => {
    toast({
      title: 'Erro de validação',
      description: 'Preencha todos os campos obrigatórios corretamente.',
      variant: 'destructive',
    })
  }

  const handleCreateAnalista = async () => {
    if (!novoAnalista.nome.trim()) {
      toast({ title: 'Nome do analista é obrigatório', variant: 'destructive' })
      return
    }
    if (!selectedCia) {
      toast({ title: 'Selecione uma seguradora primeiro', variant: 'destructive' })
      return
    }
    setIsCreatingAnalista(true)
    try {
      const created = await createAnalista({
        ...novoAnalista,
        cliente_id: selectedCia.id,
      })
      toast({ title: 'Analista criado com sucesso' })
      setValue('analista_cliente_id', created.id, { shouldValidate: true })
      setIsAnalistaModalOpen(false)
      setNovoAnalista({ nome: '', email: '', telefone: '', cargo: '' })
    } catch (err) {
      toast({ title: 'Erro ao criar analista', variant: 'destructive' })
    } finally {
      setIsCreatingAnalista(false)
    }
  }

  const handleFinalSubmit = async (data: NovoProcessoFormData) => {
    try {
      const created = await submit(data)
      toast({ title: 'Processo criado com sucesso' })
      navigate(`/processos/${created.id}`)
    } catch (err) {
      toast({ title: 'Erro ao criar processo.', variant: 'destructive' })
    }
  }

  if (loadingInitial) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48 bg-white dark:bg-brand-navy" />
        <Skeleton className="h-[600px] w-full rounded-xl bg-white dark:bg-brand-navy border border-brand-teal/20 dark:border-brand-cyan/20" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/processos')}
          aria-label="Voltar"
          className="min-w-[44px] min-h-[44px] text-brand-gray hover:text-brand-navy dark:text-brand-light dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-brand-navy dark:text-white">
          Novo Processo
        </h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 sm:p-8 shadow-sm space-y-8"
        >
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-brand-navy dark:text-brand-light">
              Dados do Sinistro
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="seguradora"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Seguradora <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val)
                        const c = clientes.find((x) => x.razao_social === val)
                        if (c) setValue('cliente_id', c.id)
                        setValue('analista_cliente_id', '', { shouldValidate: true })
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={errors.seguradora ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clientes.map((c) => (
                          <SelectItem key={c.id} value={c.razao_social}>
                            {c.razao_social}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="controle_cia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Controle Cia <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={() => {
                          field.onBlur()
                          onBlurUppercase('controle_cia')
                        }}
                        className={errors.controle_cia ? 'border-red-500 uppercase' : 'uppercase'}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="natureza_sinistro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Natureza do Sinistro <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={errors.natureza_sinistro ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {NATUREZAS.map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipo_investigacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tipo de Investigação <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={errors.tipo_investigacao ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIPOS_INV.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regiao_sinistro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Região do Sinistro (ESTADO / CIDADE){' '}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: SP / SAO PAULO"
                        onBlur={() => {
                          field.onBlur()
                          onBlurUppercase('regiao_sinistro')
                        }}
                        className={
                          errors.regiao_sinistro ? 'border-red-500 uppercase' : 'uppercase'
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {!isProperty && (
                <FormField
                  control={form.control}
                  name="placas_veiculos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Placa do Veículo Segurado <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="ABC-1234"
                          onBlur={() => {
                            field.onBlur()
                            onBlurUppercase('placas_veiculos')
                          }}
                          className={
                            errors.placas_veiculos ? 'border-red-500 uppercase' : 'uppercase'
                          }
                        />
                      </FormControl>
                      <PlateValidationUI validation={plateValidation} />
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </section>

          <Separator />
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-brand-navy dark:text-brand-light">
              Dados do Segurado e Condutor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nome_segurado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nome do Segurado <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={() => {
                          field.onBlur()
                          onBlurUppercase('nome_segurado')
                        }}
                        className={errors.nome_segurado ? 'border-red-500 uppercase' : 'uppercase'}
                      />
                    </FormControl>
                    <InsuredValidationUI validation={insuredValidation} />
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf_segurado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF do Segurado</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="000.000.000-00"
                        onChange={(e) => field.onChange(formatCPF(e.target.value))}
                        className={errors.cpf_segurado ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nome_condutor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Condutor</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={() => {
                          field.onBlur()
                          onBlurUppercase('nome_condutor')
                        }}
                        className={errors.nome_condutor ? 'border-red-500 uppercase' : 'uppercase'}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf_condutor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF do Condutor</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="000.000.000-00"
                        onChange={(e) => field.onChange(formatCPF(e.target.value))}
                        className={errors.cpf_condutor ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {isColisaoTerceiro && (
            <>
              <Separator />
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-brand-navy dark:text-brand-light">
                    Dados de Terceiros
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendTerceiro({ nome: '', cpf: '', veiculo: '', placa: '' })}
                    className="border-brand-teal text-brand-navy dark:text-brand-light hover:bg-brand-teal/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Terceiro
                  </Button>
                </div>

                {terceirosFields.length === 0 && (
                  <p className="text-sm text-brand-gray italic">Nenhum terceiro adicionado.</p>
                )}

                <div className="space-y-4">
                  {terceirosFields.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 border border-brand-teal/30 rounded-lg bg-brand-light/10 dark:bg-brand-navy/50 relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTerceiro(index)}
                        className="absolute right-2 top-2 text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <FormField
                          control={form.control}
                          name={`dados_terceiros.${index}.nome`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Nome do Terceiro <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="uppercase"
                                  onBlur={() => field.onChange(field.value.toUpperCase())}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`dados_terceiros.${index}.cpf`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CPF do Terceiro</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  onChange={(e) => field.onChange(formatCPF(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`dados_terceiros.${index}.veiculo`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Veículo do Terceiro</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="uppercase"
                                  onBlur={() => field.onChange(field.value?.toUpperCase())}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`dados_terceiros.${index}.placa`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Placa do Terceiro</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="uppercase"
                                  onBlur={() => field.onChange(field.value?.toUpperCase())}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          <Separator />
          <section className="space-y-6">
            <h2 className="text-lg font-bold text-brand-navy dark:text-brand-light">
              Atribuições e Equipe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="analista_cliente_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Analista da Seguradora</FormLabel>
                    <div className="flex gap-2">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedCia}
                      >
                        <FormControl>
                          <SelectTrigger className="flex-1">
                            <SelectValue
                              placeholder={
                                !selectedCia
                                  ? 'Selecione a seguradora primeiro'
                                  : analistasFiltrados.length === 0
                                    ? 'Nenhum analista cadastrado'
                                    : 'Selecione...'
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {analistasFiltrados.map((a) => (
                            <SelectItem key={a.id} value={a.id}>
                              {a.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        disabled={!selectedCia}
                        onClick={() => setIsAnalistaModalOpen(true)}
                        title="Cadastrar novo analista"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supervisor_id"
                render={({ field }) => {
                  const suggestedUser = supervisores.find((u) => u.id === suggestedSupervisorId)

                  return (
                    <FormItem>
                      <FormLabel>
                        Supervisor <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={errors.supervisor_id ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {supervisores.map((u) => (
                            <SelectItem key={u.id} value={u.id}>
                              {u.name || u.email}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />

                      <div className="mt-2 min-h-[24px]">
                        {suggestedSupervisorId ? (
                          <div className="flex flex-col gap-2">
                            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Supervisor sugerido: {suggestedUser?.name || 'Desconhecido'}
                            </p>
                            {field.value !== suggestedSupervisorId && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-xs w-max border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30"
                                onClick={() => field.onChange(suggestedSupervisorId)}
                              >
                                Usar Sugestão
                              </Button>
                            )}
                          </div>
                        ) : warningSupervisor ? (
                          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                            {warningSupervisor}
                          </p>
                        ) : null}
                      </div>
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="agente_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agente Atribuído</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={errors.agente_id ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Nenhum (atribuir depois)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agentes.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.nomeCompleto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <div className="flex justify-end pt-6 border-t border-brand-teal/20 dark:border-brand-cyan/20">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto h-11 px-8 font-bold bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 shadow-sm"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin text-brand-navy" />}
              Salvar Processo
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={!!duplicateFound} onOpenChange={(o) => !o && setDuplicateFound(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-brand-coral">
              <AlertTriangle className="w-5 h-5" />
              Possível Duplicidade Encontrada
            </DialogTitle>
            <DialogDescription className="text-brand-gray dark:text-brand-light">
              Já existe um processo registrado com este Segurado e Placa.
            </DialogDescription>
          </DialogHeader>

          {duplicateFound && (
            <div className="bg-brand-light/30 dark:bg-black/10 p-4 rounded-lg space-y-2 text-sm border border-brand-teal/20 dark:border-brand-cyan/20 text-brand-navy dark:text-white">
              <p>
                <strong>ID do Processo:</strong>{' '}
                {duplicateFound.numero_controle || duplicateFound.id}
              </p>
              <p>
                <strong>Seguradora:</strong> {duplicateFound.cia}
              </p>
              <p>
                <strong>Data de Entrada:</strong>{' '}
                {new Date(duplicateFound.data_entrada || duplicateFound.created).toLocaleDateString(
                  'pt-BR',
                )}
              </p>
              <p>
                <strong>Status:</strong> {duplicateFound.status}
              </p>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0">
            <Button
              variant="outline"
              className="border-brand-teal text-brand-navy dark:text-white"
              onClick={() => navigate(`/processos/${duplicateFound?.id}`)}
            >
              Ir para Processo Existente
            </Button>
            <Button
              onClick={() => {
                const data = duplicateFound?.pendingData
                setDuplicateFound(null)
                if (data) handleFinalSubmit(data)
              }}
              disabled={isSubmitting}
              className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-brand-navy" />
              ) : null}
              Criar Novo Mesmo Assim
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAnalistaModalOpen} onOpenChange={setIsAnalistaModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-brand-navy border-brand-teal/20">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Analista</DialogTitle>
            <DialogDescription>
              Adicione um novo analista para a seguradora {selectedCia?.razao_social}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <FormLabel>
                Nome <span className="text-destructive">*</span>
              </FormLabel>
              <Input
                value={novoAnalista.nome}
                onChange={(e) => setNovoAnalista({ ...novoAnalista, nome: e.target.value })}
                placeholder="Nome do analista"
              />
            </div>
            <div className="space-y-2">
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                value={novoAnalista.email}
                onChange={(e) => setNovoAnalista({ ...novoAnalista, email: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <FormLabel>Telefone</FormLabel>
              <Input
                value={novoAnalista.telefone}
                onChange={(e) => setNovoAnalista({ ...novoAnalista, telefone: e.target.value })}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="space-y-2">
              <FormLabel>Cargo</FormLabel>
              <Input
                value={novoAnalista.cargo}
                onChange={(e) => setNovoAnalista({ ...novoAnalista, cargo: e.target.value })}
                placeholder="Ex: Analista Sênior"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAnalistaModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateAnalista} disabled={isCreatingAnalista}>
              {isCreatingAnalista && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
