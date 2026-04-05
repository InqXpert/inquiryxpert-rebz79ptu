import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProcessoDetalhes } from '@/hooks/useProcessoDetalhes'
import { useProcessoFinanceiro } from '@/hooks/useProcessoFinanceiro'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { ArrowLeft, CheckCircle2, Info, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

const STATUSES = ['ANALISE_INICIAL', 'EM_EXECUCAO', 'EM_ELABORACAO', 'FINALIZADO', 'CANCELADO']

export default function ProcessoDetalhesPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { processo, loading, error, save } = useProcessoDetalhes(id)
  const { statusFinanceiro, loading: loadingFinanceiro } = useProcessoFinanceiro(processo)

  const [actionType, setActionType] = useState<'MANTER' | 'ALTERAR'>('MANTER')
  const [newStatus, setNewStatus] = useState('')
  const [posicao, setPosicao] = useState('')
  const [observacao, setObservacao] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (processo && !newStatus) {
      setNewStatus(processo.status || '')
    }
  }, [processo, newStatus])

  const handleResolve = async () => {
    if (actionType === 'MANTER' && !observacao.trim()) {
      toast.error('O campo de observações é obrigatório ao manter o status.')
      return
    }
    if (actionType === 'ALTERAR' && !newStatus) {
      toast.error('Selecione o novo status.')
      return
    }

    setIsSubmitting(true)
    try {
      const dataToUpdate: any = {}
      let actionLog = 'POSICAO_ADICIONADA'

      if (actionType === 'ALTERAR' && newStatus !== processo?.status) {
        dataToUpdate.status = newStatus
        actionLog = 'STATUS_ALTERADO'

        const dStr = format(new Date(), 'dd/MM/yyyy')
        if (newStatus === 'EM_ELABORACAO' && !processo?.data_retorno)
          dataToUpdate.data_retorno = dStr
        if (newStatus === 'FINALIZADO' && !processo?.data_saida) dataToUpdate.data_saida = dStr
      }

      const prevPosicoes = Array.isArray(processo?.posicoes_json) ? processo.posicoes_json : []
      if (posicao.trim()) {
        dataToUpdate.posicoes_json = [
          ...prevPosicoes,
          { data: new Date().toISOString(), texto: posicao, user: user?.name || user?.email },
        ]
      }

      const prevObs = Array.isArray(processo?.observacoes_json) ? processo.observacoes_json : []
      if (observacao.trim()) {
        dataToUpdate.observacoes_json = [
          ...prevObs,
          { data: new Date().toISOString(), texto: observacao, user: user?.name || user?.email },
        ]
      }

      await save(dataToUpdate, actionLog, {
        ...processo,
        ...dataToUpdate,
        nova_posicao: posicao,
        nova_observacao: observacao,
      })

      toast.success('Resolução confirmada com sucesso!')
      navigate('/processos')
    } catch {
      toast.error('Erro ao salvar resolução.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[400px]" />
      </div>
    )
  }

  if (error || !processo) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-xl text-muted-foreground font-medium">
          {error || 'Processo não encontrado'}
        </p>
        <Button variant="outline" onClick={() => navigate('/processos')}>
          Voltar
        </Button>
      </div>
    )
  }

  const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex flex-col space-y-1 bg-brand-light/30 dark:bg-black/10 p-3 rounded-[6px] border border-brand-teal/10 dark:border-brand-cyan/10">
      <span className="text-xs font-bold text-brand-gray dark:text-brand-light uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-medium text-brand-navy dark:text-white break-all">
        {value || 'Não informado'}
      </span>
    </div>
  )

  return (
    <div className="p-6 max-w-5xl mx-auto animate-in fade-in duration-300 fill-mode-both">
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/processos')}
          className="text-brand-navy dark:text-white h-10 px-4 active:scale-[0.98] transition-transform duration-100 border-brand-teal/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Processos
        </Button>
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-brand-navy dark:text-white flex items-center gap-3">
            Processo {processo.numero_controle || processo.id}
            <Badge
              variant="outline"
              className="border-brand-teal/30 text-brand-navy dark:text-brand-light text-sm bg-white dark:bg-brand-navy/50"
            >
              {String(processo.status || 'Sem Status').replace(/_/g, ' ')}
            </Badge>
            {loadingFinanceiro ? (
              <Skeleton className="h-6 w-32 rounded-full" />
            ) : statusFinanceiro ? (
              <Badge
                variant="outline"
                className={`text-sm border-transparent ${statusFinanceiro.className}`}
              >
                Financeiro: {statusFinanceiro.label}
              </Badge>
            ) : null}
          </h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Read-Only Info Panel */}
        <div className="bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both delay-100">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-brand-cyan" />
            <h2 className="text-[18px] font-bold text-brand-navy dark:text-white">
              Informações Básicas
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <InfoItem
              label="Cliente"
              value={processo.expand?.cliente_id?.nome || processo.expand?.cliente_id?.razao_social}
            />
            <InfoItem
              label="Seguradora"
              value={processo.expand?.seguradora_id?.nome || processo.cia}
            />
            <InfoItem
              label="Natureza do Sinistro"
              value={processo.expand?.natureza_sinistro_id?.nome || processo.tipo_servico}
            />
            <InfoItem
              label="Tipo de Investigação"
              value={processo.expand?.tipo_investigacao_id?.nome || processo.orientacoes}
            />
            <InfoItem label="Controle Cia" value={processo.controle_cia} />
            <InfoItem
              label="Agente"
              value={
                processo.expand?.agente_id?.nomeCompleto ||
                processo.expand?.agente_id?.nome ||
                processo.agente_prestador
              }
            />
            <InfoItem
              label="Solicitante"
              value={processo.expand?.solicitante_id?.name || processo.analista_solicitante}
            />
            <InfoItem label="Supervisor" value={processo.expand?.supervisor_id?.name} />
            <InfoItem label="Região do Sinistro" value={processo.regiao_sinistro} />
            <InfoItem label="Nome do Segurado" value={processo.nome_segurado} />
            <InfoItem label="Placas dos Veículos" value={processo.placas_veiculos} />
            <InfoItem label="Data de Entrada" value={processo.data_entrada} />
          </div>
        </div>

        {/* Resolution Center */}
        <div className="bg-white dark:bg-brand-navy/80 border border-brand-teal/20 dark:border-brand-cyan/20 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both delay-200">
          <h2 className="text-[18px] font-bold text-brand-navy dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand-teal" /> Central de Resolução
          </h2>

          <div className="space-y-6 max-w-3xl">
            <div className="space-y-3">
              <Label className="text-base font-bold text-brand-navy dark:text-white">
                Ação de Status
              </Label>
              <RadioGroup
                value={actionType}
                onValueChange={(v) => setActionType(v as 'MANTER' | 'ALTERAR')}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex items-center space-x-2 bg-brand-light/20 dark:bg-black/20 p-3 rounded-lg border border-brand-teal/10 dark:border-brand-cyan/10">
                  <RadioGroupItem value="MANTER" id="manter" />
                  <Label htmlFor="manter" className="cursor-pointer font-medium">
                    MANTER STATUS
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-brand-light/20 dark:bg-black/20 p-3 rounded-lg border border-brand-teal/10 dark:border-brand-cyan/10">
                  <RadioGroupItem value="ALTERAR" id="alterar" />
                  <Label htmlFor="alterar" className="cursor-pointer font-medium">
                    ALTERAR STATUS
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {actionType === 'ALTERAR' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label className="font-bold text-brand-navy dark:text-white">Novo Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="w-full sm:w-[300px] border-brand-teal/20 dark:border-brand-cyan/20 focus:ring-brand-cyan">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label className="font-bold text-brand-navy dark:text-white">Atualizar Posição</Label>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-brand-teal/20 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-cyan/20 dark:text-white resize-y"
                placeholder="Registre o progresso ou atualização operacional..."
                value={posicao}
                onChange={(e) => setPosicao(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-brand-navy dark:text-white">
                Adicionar Observações{' '}
                {actionType === 'MANTER' && <span className="text-red-500">*</span>}
              </Label>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-brand-teal/20 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-50 dark:border-brand-cyan/20 dark:text-white resize-y"
                placeholder="Insira notas internas ou justificativas..."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                onClick={handleResolve}
                disabled={isSubmitting}
                className="h-12 px-6 bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold text-base w-full sm:w-auto active:scale-[0.98] transition-transform duration-100"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                )}
                Confirmar Resolução
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
