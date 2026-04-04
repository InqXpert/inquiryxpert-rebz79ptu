import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProcessoDetalhes } from '@/hooks/useProcessoDetalhes'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
      const next = {
        ...prev,
        [field]:
          field === 'nome_segurado' && typeof value === 'string' ? value.toUpperCase() : value,
      }
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
        <Skeleton className="h-10 w-1/3" />
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

  const formFields = [
    { key: 'cia', type: 'select', label: 'Seguradora', opts: SEGURADORAS, req: true },
    { key: 'tipo_servico', type: 'select', label: 'Natureza do Sinistro', opts: NATUREZAS },
    { key: 'orientacoes', type: 'select', label: 'Tipo de Investigação', opts: TIPOS_INVESTIGACAO },
    { key: 'status', type: 'select', label: 'Status', opts: STATUSES, req: true },
    { key: 'controle_cia', type: 'input', label: 'Controle Cia' },
    { key: 'regiao_sinistro', type: 'input', label: 'Região do Sinistro', ph: 'ESTADO / CIDADE' },
    { key: 'nome_segurado', type: 'input', label: 'Nome do Segurado' },
    { key: 'placas_veiculos', type: 'input', label: 'Placas dos Veículos' },
    {
      key: 'solicitante_id',
      type: 'relation',
      label: 'Solicitante',
      opts: solicitantes,
      d: (x: any) => x.name || x.email,
    },
    {
      key: 'agente_id',
      type: 'relation',
      label: 'Agente',
      opts: agentes,
      d: (x: any) => x.nomeCompleto || x.nome,
    },
    {
      key: 'supervisor_id',
      type: 'relation',
      label: 'Supervisor',
      opts: supervisores,
      d: (x: any) => x.name || x.email,
    },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto animate-in fade-in duration-300 fill-mode-both">
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="active:scale-[0.98] transition-transform duration-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-foreground">
            Processo {processo.numero_controle || processo.id}
          </h1>
          <Badge variant="outline" className="mt-1">
            {formData.status || 'Sem Status'}
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
          <h2 className="text-[18px] font-bold text-foreground mb-4">Informações Básicas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { l: 'ID', v: processo.id },
              { l: 'Data Entrada', v: formData.data_entrada || '-' },
              { l: 'Data Retorno', v: formData.data_retorno || '-' },
              { l: 'Data Saída', v: formData.data_saida || '-' },
              { l: 'Dias Totais', v: dTotais },
            ].map((i, idx) => (
              <div
                key={i.l}
                className="bg-muted/50 p-3 rounded-[6px] flex flex-col space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
                style={{ animationDelay: `${(idx + 1) * 50}ms` }}
              >
                <span className="text-sm font-bold text-foreground">{i.l}</span>
                <span className="text-base text-foreground break-all">{i.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
          <h2 className="text-[18px] font-bold text-foreground mb-4">Dados do Processo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map((field, idx) => (
              <div
                key={field.key}
                className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
                style={{ animationDelay: `${(idx + 6) * 50}ms` }}
              >
                <Label className="text-sm font-bold text-foreground">
                  {field.label} {field.req && <span className="text-primary">*</span>}
                </Label>

                {field.type === 'select' && (
                  <Select
                    disabled={!canEdit}
                    value={formData[field.key] || ''}
                    onValueChange={(v) => handleChange(field.key, v)}
                  >
                    <SelectTrigger className="focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {field.opts?.map((o: any) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {field.type === 'input' && (
                  <Input
                    disabled={!canEdit}
                    placeholder={field.ph}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="focus-visible:ring-primary focus-visible:border-primary"
                  />
                )}

                {field.type === 'relation' && (
                  <Select
                    disabled={!canEdit}
                    value={formData[field.key] || ''}
                    onValueChange={(v) => handleChange(field.key, v)}
                  >
                    <SelectTrigger className="focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {field.opts?.map((o: any) => (
                        <SelectItem key={o.id} value={o.id}>
                          {field.d ? field.d(o) : o.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {canEdit && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Deletar
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

          <Button
            variant="secondary"
            className="h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100"
            onClick={() => navigate(-1)}
          >
            <X className="w-4 h-4 mr-2" /> Cancelar
          </Button>
          <Button
            variant="default"
            className="h-10 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" /> Salvar
          </Button>
        </div>
      )}
    </div>
  )
}
