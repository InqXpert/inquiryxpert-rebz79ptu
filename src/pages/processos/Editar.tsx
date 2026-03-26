import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Save, Trash, X } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Form } from '@/components/ui/form'
import { ProcessoFormFields } from './components/ProcessoFormFields'
import { formSchema, getDiasTotais, getStatusColor } from './utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function ProcessoEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processo, setProcesso] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [agentes, setAgentes] = useState<any[]>([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cia: '',
      controle_cia: '',
      natureza_sinistro: '',
      tipo_servico: '',
      local_sinistro: '',
      nome_segurado: '',
      placas_veiculos: '',
      solicitante_id: '',
      agente_id: '',
      status: '',
      supervisor_id: '',
      data_entrada: '',
      data_retorno: '',
      data_saida: '',
    },
  })

  const watchDataEntrada = form.watch('data_entrada')
  const watchDataRetorno = form.watch('data_retorno')
  const watchDataSaida = form.watch('data_saida')
  const watchStatus = form.watch('status')

  useEffect(() => {
    let active = true
    const loadData = async () => {
      if (!['c-level', 'admin', 'supervisor'].includes(user?.role || '')) {
        setError('Acesso negado.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const proc = await pb.collection('processos_operacionais').getOne(id!)

        if (user?.role === 'supervisor' && proc.supervisor_id !== user?.id) {
          throw new Error('Unauthorized')
        }

        const [usersData, agentesData] = await Promise.all([
          pb.collection('users').getFullList({
            filter: "role='admin' || role='supervisor' || role='c-level' || role='analista'",
          }),
          pb.collection('agentes').getFullList(),
        ])

        if (!active) return

        setUsers(usersData)
        setAgentes(agentesData)
        setProcesso(proc)

        form.reset({
          cia: proc.cia || '',
          controle_cia: proc.controle_cia || '',
          natureza_sinistro: proc.observacoes_json?.natureza_sinistro || '',
          tipo_servico: proc.tipo_servico || '',
          local_sinistro: proc.local_sinistro || '',
          nome_segurado: proc.nome_segurado || '',
          placas_veiculos: proc.placas_veiculos || '',
          solicitante_id: proc.solicitante_id || '',
          agente_id: proc.agente_id || '',
          status: proc.status || '',
          supervisor_id: proc.supervisor_id || '',
          data_entrada: proc.data_entrada || '',
          data_retorno: proc.data_retorno || '',
          data_saida: proc.data_saida || '',
        })
      } catch (e: any) {
        if (!active) return
        setError(
          e.message === 'Unauthorized'
            ? 'Você não tem permissão para editar este processo.'
            : 'Erro ao carregar processo.',
        )
      } finally {
        if (active) setLoading(false)
      }
    }
    loadData()
    return () => {
      active = false
    }
  }, [id, user, form])

  const onSubmit = async (data: any) => {
    try {
      const dt = getDiasTotais(data.data_entrada, data.data_saida)
      const prev = { ...processo }
      const obsJson =
        typeof processo.observacoes_json === 'object' && processo.observacoes_json !== null
          ? processo.observacoes_json
          : {}

      const payload = {
        ...data,
        dias_totais: dt,
        observacoes_json: { ...obsJson, natureza_sinistro: data.natureza_sinistro },
      }
      delete payload.natureza_sinistro

      const updated = await pb.collection('processos_operacionais').update(processo.id, payload)

      await pb.collection('audit_log').create({
        processo_id: processo.id,
        usuario_id: user?.id,
        acao: 'EDITADO',
        dados_anteriores: prev,
        dados_novos: updated,
      })

      toast({ title: 'Sucesso', description: 'Processo atualizado com sucesso!' })
      navigate('/processos')
    } catch (e) {
      toast({ title: 'Erro', description: 'Erro ao salvar alterações.', variant: 'destructive' })
    }
  }

  const handleDelete = async () => {
    try {
      const prev = { ...processo }
      await pb.collection('audit_log').create({
        processo_id: processo.id,
        usuario_id: user?.id,
        acao: 'DELETADO',
        dados_anteriores: prev,
        dados_novos: null,
      })
      await pb.collection('processos_operacionais').delete(processo.id)
      toast({ title: 'Sucesso', description: 'Processo deletado com sucesso.' })
      navigate('/processos')
    } catch (e) {
      toast({ title: 'Erro', description: 'Erro ao excluir.', variant: 'destructive' })
    }
  }

  if (error) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <X className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-xl font-bold text-destructive">Erro de Acesso</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={() => navigate('/processos')}>
          Voltar para a lista
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full px-4 md:px-8 py-6 md:py-8 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </div>
    )
  }

  if (!processo) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <X className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold">Processo não encontrado</h2>
        <p className="text-muted-foreground">O processo solicitado não existe ou foi excluído.</p>
        <Button variant="outline" onClick={() => navigate('/processos')}>
          Voltar para a lista
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full px-4 md:px-8 py-6 md:py-8 space-y-6 animate-fade-in-up duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                Processo {processo?.id}
              </h1>
              {watchStatus && (
                <Badge className={getStatusColor(watchStatus)} variant="outline">
                  {watchStatus.replace('_', ' ')}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Edite as informações e acompanhe o progresso da investigação.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" type="button">
                <Trash className="w-4 h-4 mr-2" /> Deletar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o processo e os
                  dados associados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-brand-coral hover:bg-brand-coral/90 text-white"
                >
                  Sim, deletar processo
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" size="sm" type="button" onClick={() => navigate('/processos')}>
            <X className="w-4 h-4 mr-2" /> Cancelar
          </Button>
          <Button size="sm" type="submit" form="processo-form">
            <Save className="w-4 h-4 mr-2" /> Salvar
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-border overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-lg">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-2 md:grid-cols-5 gap-4 bg-card">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ID Processo
            </p>
            <p className="text-sm font-medium text-foreground">{processo?.id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Data Entrada
            </p>
            <p className="text-sm font-medium text-foreground">{watchDataEntrada || '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Data Retorno
            </p>
            <p className="text-sm font-medium text-foreground">{watchDataRetorno || '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Data Saída
            </p>
            <p className="text-sm font-medium text-foreground">{watchDataSaida || '-'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Dias Totais
            </p>
            <p className="text-sm font-medium text-foreground">
              {getDiasTotais(watchDataEntrada, watchDataSaida)} dias
            </p>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form id="processo-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="shadow-sm border-border overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg">Dados do Processo</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-card">
              <ProcessoFormFields form={form} users={users} agentes={agentes} />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
