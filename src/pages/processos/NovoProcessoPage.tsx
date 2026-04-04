import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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
import { ArrowLeft, Loader2, AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

const SEGURADORAS = [
  'ZURICH',
  'MAPFRE',
  'SUHAI',
  'BRADESCO',
  'NEO',
  'SPLIT RISK',
  'COOPERLINK',
  'KVOR',
  'MAIS BRASIL',
  'AUTOINSP',
  'SEVEN',
  'CARDIF',
]
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

export default function NovoProcessoPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()
  const {
    agentes,
    users,
    loadingInitial,
    isSubmitting,
    duplicateFound,
    setDuplicateFound,
    checkDuplicate,
    submit,
  } = useNovoProcesso()

  const [warningSupervisor, setWarningSupervisor] = useState('')
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [suggestedSupervisorId, setSuggestedSupervisorId] = useState<string | null>(null)

  const form = useForm<NovoProcessoFormData>({
    resolver: zodResolver(novoProcessoSchema),
    defaultValues: {
      seguradora: '',
      controle_cia: '',
      natureza_sinistro: '',
      tipo_investigacao: '',
      regiao_sinistro: '',
      nome_segurado: '',
      placas_veiculos: '',
      solicitante_id: '',
      agente_id: '',
      supervisor_id: '',
      status: 'ANALISE_INICIAL',
    },
    mode: 'onSubmit',
  })

  const {
    watch,
    setValue,
    formState: { errors },
  } = form
  const watchSeguradora = watch('seguradora')
  const watchTipoInvestigacao = watch('tipo_investigacao')

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
      const suggested = suggestSupervisor(watchTipoInvestigacao, watchSeguradora, users)
      if (suggested) {
        setValue('supervisor_id', suggested, { shouldValidate: true })
        setWarningSupervisor('')
      } else if (watchTipoInvestigacao) {
        setWarningSupervisor('Nenhum supervisor disponivel para essa combinacao')
        setValue('supervisor_id', '', { shouldValidate: true })
      }
    }
  }, [watchSeguradora, watchTipoInvestigacao, users, setValue])

  const onBlurUppercase = (field: keyof NovoProcessoFormData) => {
    const val = form.getValues(field)
    if (typeof val === 'string' && val !== val.toUpperCase()) {
      setValue(field, val.toUpperCase(), { shouldValidate: true })
    }
  }

  const onSubmit = async (data: NovoProcessoFormData) => {
    const duplicate = await checkDuplicate(data.nome_segurado, data.placas_veiculos)
    if (duplicate) {
      setDuplicateFound({ ...duplicate, pendingData: data })
    } else {
      handleFinalSubmit(data)
    }
  }

  const onError = () => {
    toast({
      title: 'Erro de validação',
      description: 'Preencha todos os campos obrigatorios corretamente.',
      variant: 'destructive',
    })
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

  const isFormFilled = () => {
    const vals = form.getValues()
    return !!(
      vals.seguradora &&
      vals.controle_cia &&
      vals.natureza_sinistro &&
      vals.tipo_investigacao &&
      vals.regiao_sinistro &&
      vals.nome_segurado &&
      vals.placas_veiculos &&
      vals.solicitante_id &&
      vals.agente_id &&
      vals.supervisor_id
    )
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
          className="text-brand-gray hover:text-brand-navy dark:text-brand-light dark:hover:text-white"
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
          className="bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="seguradora"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Seguradora <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={errors.seguradora ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SEGURADORAS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
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
                    Região do Sinistro (ESTADO / CIDADE) <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex: SP / SAO PAULO"
                      onBlur={() => {
                        field.onBlur()
                        onBlurUppercase('regiao_sinistro')
                      }}
                      className={errors.regiao_sinistro ? 'border-red-500 uppercase' : 'uppercase'}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

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
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placas_veiculos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Placas dos Veículos <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ABC-1234, DEF-5678"
                      onBlur={() => {
                        field.onBlur()
                        onBlurUppercase('placas_veiculos')
                      }}
                      className={errors.placas_veiculos ? 'border-red-500 uppercase' : 'uppercase'}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solicitante_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Solicitante <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={errors.solicitante_id ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {u.name || u.email}
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
              name="agente_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Agente <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={errors.agente_id ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecione..." />
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

            <FormField
              control={form.control}
              name="supervisor_id"
              render={({ field }) => {
                const suggestedUser = users.find((u) => u.id === suggestedSupervisorId)

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
                        {users
                          .filter((u) => ['supervisor', 'admin', 'c-level'].includes(u.role))
                          .map((u) => (
                            <SelectItem key={u.id} value={u.id}>
                              {u.name || u.email}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />

                    <div className="mt-2 min-h-[24px]">
                      {isSuggesting ? (
                        <div className="flex items-center text-xs text-brand-gray">
                          <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                          Calculando alocação...
                        </div>
                      ) : suggestedSupervisorId ? (
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
              name="status"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className="bg-muted font-medium text-muted-foreground"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-6 border-t border-brand-teal/20 dark:border-brand-cyan/20">
            <Button
              type="submit"
              disabled={isSubmitting || !isFormFilled()}
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
    </div>
  )
}
