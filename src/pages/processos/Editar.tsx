import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProcessoDetail } from '@/hooks/useProcessoDetail'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, X, Trash2, Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function ProcessoEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    processo,
    loading,
    error,
    fetchProcessoDetail,
    updateProcesso,
    removeProcesso,
    canEditProcesso,
    canDeleteProcesso,
  } = useProcessoDetail()

  const [formData, setFormData] = useState({
    nome_segurado: '',
    status: '',
    prioridade: '',
    tipo_servico: '',
    descricao: '',
  })

  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (id) fetchProcessoDetail(id)
  }, [id, fetchProcessoDetail])

  useEffect(() => {
    if (processo) {
      setFormData({
        nome_segurado: processo.nome_segurado || '',
        status: processo.status || '',
        prioridade: processo.prioridade || 'media',
        tipo_servico: processo.tipo_servico || '',
        descricao: processo.descricao || '',
      })
    }
  }, [processo])

  const handleSave = async () => {
    setSaving(true)
    await updateProcesso(formData)
    setSaving(false)
    navigate(-1)
  }

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este processo?')) return
    setDeleting(true)
    const success = await removeProcesso()
    if (success) {
      navigate('/processos')
    }
    setDeleting(false)
  }

  if (loading) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 w-full">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-[400px] w-full rounded-[8px]" />
      </div>
    )
  }

  if (error || !processo) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto text-center w-full">
        <h2 className="text-[20px] font-bold text-destructive">Processo não encontrado</h2>
        <Button
          onClick={() => navigate('/processos')}
          className="mt-4 active:scale-[0.98] transition-transform duration-100 ease-in-out h-[40px]"
        >
          Voltar para Processos
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-300 ease-out fill-mode-both">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col items-start">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-2 -ml-3 text-muted-foreground hover:text-foreground active:scale-[0.98] transition-transform duration-100 ease-in-out h-[40px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] font-bold text-foreground">
              {processo.numero_processo || processo.numero_controle || 'Sem Número'}
            </h1>
            <Badge variant="secondary" className="uppercase h-6 text-[12px] px-2">
              {processo.status?.replace(/_/g, ' ') || 'Novo'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-[24px]">
        {/* Informações Básicas (Read-only) */}
        <div className="bg-card border border-border rounded-[8px] p-[20px] shadow-sm">
          <h2 className="text-[18px] font-bold text-foreground mb-[24px]">Informações Básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {[
              { label: 'Número de Controle', value: processo.numero_controle },
              {
                label: 'Data de Entrada',
                value: processo.data_entrada
                  ? new Date(processo.data_entrada).toLocaleDateString()
                  : '-',
              },
              { label: 'Seguradora', value: processo.cia || '-' },
              { label: 'Agente Prestador', value: processo.agente_prestador || '-' },
            ].map((item, index) => (
              <div
                key={item.label}
                className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                style={{ animationDelay: `${index * 50}ms`, animationDuration: '300ms' }}
              >
                <Label className="text-[14px] font-bold block mb-[8px]">{item.label}</Label>
                <div className="bg-muted text-foreground p-[12px] rounded-[6px] min-h-[44px] flex items-center text-[14px] font-medium border border-transparent">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dados do Processo (Editable) */}
        <div className="bg-card border border-border rounded-[8px] p-[20px] shadow-sm">
          <h2 className="text-[18px] font-bold text-foreground mb-[24px]">Dados do Processo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <div
              className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
              style={{ animationDelay: `${4 * 50}ms`, animationDuration: '300ms' }}
            >
              <Label className="text-[14px] font-bold block mb-[8px]">
                Nome do Segurado <span className="text-primary">*</span>
              </Label>
              <Input
                value={formData.nome_segurado}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nome_segurado: e.target.value }))
                }
                placeholder="Ex: João da Silva"
                disabled={!canEditProcesso()}
                className="focus-visible:ring-primary focus-visible:border-primary transition-all text-[14px]"
              />
            </div>

            <div
              className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
              style={{ animationDelay: `${5 * 50}ms`, animationDuration: '300ms' }}
            >
              <Label className="text-[14px] font-bold block mb-[8px]">
                Status <span className="text-primary">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
                disabled={!canEditProcesso()}
              >
                <SelectTrigger className="focus:ring-primary focus:border-primary transition-all text-[14px]">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analise_inicial">Análise Inicial</SelectItem>
                  <SelectItem value="em_execucao">Em Execução</SelectItem>
                  <SelectItem value="em_elaboracao">Em Elaboração</SelectItem>
                  <SelectItem value="bloqueado_sem_audio">Bloqueado S/ Áudio</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
              style={{ animationDelay: `${6 * 50}ms`, animationDuration: '300ms' }}
            >
              <Label className="text-[14px] font-bold block mb-[8px]">
                Prioridade <span className="text-primary">*</span>
              </Label>
              <Select
                value={formData.prioridade}
                onValueChange={(val) => setFormData((prev) => ({ ...prev, prioridade: val }))}
                disabled={!canEditProcesso()}
              >
                <SelectTrigger className="focus:ring-primary focus:border-primary transition-all text-[14px]">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
              style={{ animationDelay: `${7 * 50}ms`, animationDuration: '300ms' }}
            >
              <Label className="text-[14px] font-bold block mb-[8px]">
                Tipo de Serviço <span className="text-primary">*</span>
              </Label>
              <Input
                value={formData.tipo_servico}
                onChange={(e) => setFormData((prev) => ({ ...prev, tipo_servico: e.target.value }))}
                placeholder="Ex: Sindicância Auto"
                disabled={!canEditProcesso()}
                className="focus-visible:ring-primary focus-visible:border-primary transition-all text-[14px]"
              />
            </div>

            <div
              className="md:col-span-2 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
              style={{ animationDelay: `${8 * 50}ms`, animationDuration: '300ms' }}
            >
              <Label className="text-[14px] font-bold block mb-[8px]">Descrição</Label>
              <textarea
                className={cn(
                  'flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-[14px] ring-offset-background',
                  'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  'focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y',
                )}
                value={formData.descricao}
                onChange={(e) => setFormData((prev) => ({ ...prev, descricao: e.target.value }))}
                placeholder="Detalhes adicionais sobre o processo..."
                disabled={!canEditProcesso()}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-[12px] mt-[24px] pb-[40px]">
          {canEditProcesso() && (
            <Button
              variant="default"
              className="w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salvar
            </Button>
          )}
          <Button
            variant="secondary"
            className="w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out"
            onClick={() => navigate(-1)}
            disabled={saving || deleting}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <div className="hidden sm:block flex-1" />
          {canDeleteProcesso() && (
            <Button
              variant="destructive"
              className="w-full sm:w-auto h-[40px] px-8 active:scale-[0.98] transition-transform duration-100 ease-in-out sm:ml-auto"
              onClick={handleDelete}
              disabled={deleting || saving}
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Deletar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
