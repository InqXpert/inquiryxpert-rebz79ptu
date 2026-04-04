import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useNovoProcesso } from '@/hooks/useNovoProcesso'
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
]

export default function NovoProcessoPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { toast } = useToast()
  const {
    formData,
    handleChange,
    agentes,
    users,
    loadingInitial,
    isSubmitting,
    duplicateFound,
    setDuplicateFound,
    checkDuplicate,
    submit,
  } = useNovoProcesso()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const duplicate = await checkDuplicate()
    if (duplicate) {
      setDuplicateFound(duplicate)
    } else {
      handleFinalSubmit()
    }
  }

  const handleFinalSubmit = async () => {
    try {
      const created = await submit()
      toast({ title: 'Processo criado com sucesso' })
      navigate(`/processos/${created.id}`)
    } catch (err) {
      toast({ title: 'Erro ao criar processo.', variant: 'destructive' })
    }
  }

  if (loadingInitial) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[600px] w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/processos')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Novo Processo</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border rounded-xl p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>
              Seguradora <span className="text-destructive">*</span>
            </Label>
            <Select
              required
              value={formData.seguradora}
              onValueChange={(v) => handleChange('seguradora', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {SEGURADORAS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Controle Cia <span className="text-destructive">*</span>
            </Label>
            <Input
              required
              value={formData.controle_cia}
              onChange={(e) => handleChange('controle_cia', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Natureza do Sinistro <span className="text-destructive">*</span>
            </Label>
            <Select
              required
              value={formData.natureza_sinistro}
              onValueChange={(v) => handleChange('natureza_sinistro', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {NATUREZAS.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Tipo de Investigação <span className="text-destructive">*</span>
            </Label>
            <Select
              required
              value={formData.tipo_investigacao}
              onValueChange={(v) => handleChange('tipo_investigacao', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_INV.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Região do Sinistro (ESTADO / CIDADE) <span className="text-destructive">*</span>
            </Label>
            <Input
              required
              placeholder="Ex: SP / SÃO PAULO"
              value={formData.regiao_sinistro}
              onChange={(e) => handleChange('regiao_sinistro', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Nome do Segurado <span className="text-destructive">*</span>
            </Label>
            <Input
              required
              value={formData.nome_segurado}
              onChange={(e) => handleChange('nome_segurado', e.target.value)}
              className="uppercase"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Placas dos Veículos <span className="text-destructive">*</span>
            </Label>
            <Input
              required
              placeholder="ABC1234, DEF5678"
              value={formData.placas_veiculos}
              onChange={(e) => handleChange('placas_veiculos', e.target.value)}
              className="uppercase"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Solicitante <span className="text-destructive">*</span>
            </Label>
            <Select
              required
              value={formData.solicitante_id}
              onValueChange={(v) => handleChange('solicitante_id', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.name || u.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Agente <span className="text-destructive">*</span>
            </Label>
            <Select
              required
              value={formData.agente_id}
              onValueChange={(v) => handleChange('agente_id', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {agentes.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.nomeCompleto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Supervisor <span className="text-destructive">*</span>
            </Label>
            <Select
              required
              value={formData.supervisor_id}
              onValueChange={(v) => handleChange('supervisor_id', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
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
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Status</Label>
            <Input
              value="ANALISE_INICIAL"
              readOnly
              className="bg-muted font-medium text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto h-11 px-8 font-semibold"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Salvar Processo
          </Button>
        </div>
      </form>

      <Dialog open={!!duplicateFound} onOpenChange={(o) => !o && setDuplicateFound(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Possível Duplicidade Encontrada
            </DialogTitle>
            <DialogDescription>
              Já existe um processo registrado com este Segurado e Placa.
            </DialogDescription>
          </DialogHeader>

          {duplicateFound && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm border border-border/50">
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

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
            <Button variant="outline" onClick={() => navigate(`/processos/${duplicateFound?.id}`)}>
              Ir para Processo Existente
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setDuplicateFound(null)
                handleFinalSubmit()
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Criar Novo Mesmo Assim
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
