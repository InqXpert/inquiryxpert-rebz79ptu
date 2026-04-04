import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProcessoDetalhes } from '@/hooks/useProcessoDetalhes'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { ArrowLeft, Trash2, Save, X } from 'lucide-react'
import { format } from 'date-fns'
import { calculateDiasTotais } from '@/services/processosService'
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
import pb from '@/lib/pocketbase/client'

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
]
const NATUREZAS = [
  'COLISÃO COM TERCEIRO',
  'COLISÃO SEM TERCEIRO',
  'INCÊNDIO',
  'ROUBO',
  'FURTO',
  'ENCHENTE',
  'PROPERTY',
  'I.E',
]
const TIPOS_INVESTIGACAO = [
  'AUTO',
  'BUSCA B.O DOCS',
  'PERFIL',
  'FAST',
  'PROPERTY RES D.E',
  'PROPERTY MÁQUINAS',
  'PROPERTY FURTO ROUBO',
  'PROPERTY RES EQUIP',
  'REMOTA',
  'I.E',
]
const STATUSES = ['ANALISE_INICIAL', 'EM_EXECUCAO', 'EM_ELABORACAO', 'FINALIZADO', 'CANCELADO']

export default function ProcessoDetalhesPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { processo, loading, error, save, remove } = useProcessoDetalhes(id)

  const [formData, setFormData] = useState<any>({})
  const [agentes, setAgentes] = useState<any[]>([])
  const [solicitantes, setSolicitantes] = useState<any[]>([])
  const [supervisores, setSupervisores] = useState<any[]>([])

  useEffect(() => {
    pb.collection('agentes')
      .getFullList()
      .then(setAgentes)
      .catch(() => {})
    pb.collection('users')
      .getFullList({ filter: 'role="analista" || role="admin" || role="c-level"' })
      .then(setSolicitantes)
      .catch(() => {})
    pb.collection('users')
      .getFullList({ filter: 'role="supervisor" || role="admin" || role="c-level"' })
      .then(setSupervisores)
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (processo) setFormData({ ...processo })
  }, [processo])

  useEffect(() => {
    if (
      formData.cia &&
      formData.orientacoes &&
      supervisores.length > 0 &&
      !formData.supervisor_id
    ) {
      setFormData((prev: any) => ({ ...prev, supervisor_id: supervisores[0].id }))
    }
  }, [formData.cia, formData.orientacoes, supervisores])

  const canEdit =
    user?.role === 'c-level' ||
    user?.role === 'admin' ||
    (user?.role === 'supervisor' && processo?.supervisor_id === user?.id)

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const next = { ...prev, [field]: field === 'nome_segurado' ? value.toUpperCase() : value }
      if (field === 'status') {
        const dStr = format(new Date(), 'dd/MM/yyyy')
        if (value === 'EM_ELABORACAO') next.data_retorno = dStr
        if (value === 'FINALIZADO') next.data_saida = dStr
      }
      return next
    })
  }

  const handleSave = async () => {
    if (!formData.cia || !formData.status)
      return toast.error('Preencha os campos obrigatórios (Seguradora e Status).')
    try {
      await save(formData)
      toast.success('Processo salvo com sucesso!')
      navigate('/processos')
    } catch {
      toast.error('Erro ao salvar processo.')
    }
  }

  const handleDelete = async () => {
    try {
      await remove()
      toast.success('Processo deletado com sucesso!')
      navigate('/processos')
    } catch {
      toast.error('Erro ao deletar processo.')
    }
  }

  if (loading)
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[400px]" />
      </div>
    )
  if (error || !processo)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-xl text-muted-foreground">{error || 'Processo não encontrado'}</p>
        <Button variant="outline" onClick={() => navigate('/processos')}>
          Voltar
        </Button>
      </div>
    )

  const dTotais = calculateDiasTotais(formData.data_entrada, formData.data_saida)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Processo {processo.numero_controle || processo.id}
            </h1>
            <Badge variant="outline" className="mt-1">
              {formData.status || 'Sem Status'}
            </Badge>
          </div>
        </div>
        {canEdit && (
          <div className="flex items-center space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>Esta ação é irreversível.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground"
                  >
                    Deletar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <X className="w-4 h-4 mr-2" /> Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Salvar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { l: 'ID', v: processo.id },
              { l: 'Data Entrada', v: formData.data_entrada || '-' },
              { l: 'Data Retorno', v: formData.data_retorno || '-' },
              { l: 'Data Saída', v: formData.data_saida || '-' },
            ].map((i) => (
              <div key={i.l}>
                <Label className="text-muted-foreground">{i.l}</Label>
                <p className="font-medium">{i.v}</p>
              </div>
            ))}
            <div>
              <Label className="text-muted-foreground">Dias Totais</Label>
              <p className="font-medium text-2xl">{dTotais}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Dados do Processo</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Seguradora', f: 'cia', opts: SEGURADORAS },
              { label: 'Natureza do Sinistro', f: 'tipo_servico', opts: NATUREZAS },
              { label: 'Tipo de Investigação', f: 'orientacoes', opts: TIPOS_INVESTIGACAO },
              { label: 'Status', f: 'status', opts: STATUSES },
            ].map((s) => (
              <div key={s.f} className="space-y-2">
                <Label>{s.label}</Label>
                <Select
                  disabled={!canEdit}
                  value={formData[s.f] || ''}
                  onValueChange={(v) => handleChange(s.f, v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {s.opts.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            {[
              { label: 'Controle Cia', f: 'controle_cia' },
              { label: 'Região do Sinistro', f: 'regiao_sinistro', ph: 'ESTADO / CIDADE' },
              { label: 'Nome do Segurado', f: 'nome_segurado' },
              { label: 'Placas dos Veículos', f: 'placas_veiculos' },
            ].map((i) => (
              <div key={i.f} className="space-y-2">
                <Label>{i.label}</Label>
                <Input
                  disabled={!canEdit}
                  placeholder={i.ph}
                  value={formData[i.f] || ''}
                  onChange={(e) => handleChange(i.f, e.target.value)}
                />
              </div>
            ))}

            {[
              {
                label: 'Solicitante',
                f: 'solicitante_id',
                opts: solicitantes,
                d: (x: any) => x.name || x.email,
              },
              {
                label: 'Agente',
                f: 'agente_id',
                opts: agentes,
                d: (x: any) => x.nomeCompleto || x.nome,
              },
              {
                label: 'Supervisor',
                f: 'supervisor_id',
                opts: supervisores,
                d: (x: any) => x.name || x.email,
              },
            ].map((s) => (
              <div key={s.f} className="space-y-2">
                <Label>{s.label}</Label>
                <Select
                  disabled={!canEdit}
                  value={formData[s.f] || ''}
                  onValueChange={(v) => handleChange(s.f, v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {s.opts.map((o) => (
                      <SelectItem key={o.id} value={o.id}>
                        {s.d(o)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
