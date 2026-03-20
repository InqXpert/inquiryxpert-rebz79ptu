import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAgente } from '@/services/agentes'
import {
  createProcesso,
  uploadDocumento,
  getNextNumeroControle,
} from '@/services/procesosOperacionais'
import { Agente, ProcessoOperacional } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import {
  UploadCloud,
  X,
  Mail,
  MessageCircle,
  Save,
  ArrowLeft,
  FileText,
  CheckCircle,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/use-auth'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function Sindicancia() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user } = useAuth()

  const [agente, setAgente] = useState<Agente | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [orientacoes, setOrientacoes] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [draftProcess, setDraftProcess] = useState<ProcessoOperacional | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!id) return
    getAgente(id)
      .then(setAgente)
      .catch(() => {
        toast({ title: 'Erro', description: 'Agente não encontrado.', variant: 'destructive' })
        navigate('/agentes')
      })
      .finally(() => setLoading(false))
  }, [id, navigate, toast])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const currentSize = files.reduce((acc, f) => acc + f.size, 0)
    const newSize = selected.reduce((acc, f) => acc + f.size, 0)

    if (currentSize + newSize > MAX_FILE_SIZE) {
      toast({
        title: 'Erro',
        description: 'O tamanho total dos arquivos não pode exceder 10MB.',
        variant: 'destructive',
      })
      return
    }

    setFiles((prev) => [...prev, ...selected])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const saveDraft = async (): Promise<ProcessoOperacional | null> => {
    if (!orientacoes.trim()) {
      toast({
        title: 'Erro de validação',
        description: 'As orientações de execução são obrigatórias.',
        variant: 'destructive',
      })
      return null
    }

    setSaving(true)
    try {
      let proc = draftProcess
      if (!proc) {
        const nextNum = await getNextNumeroControle()
        proc = await createProcesso({
          numero_controle: `SIND-${nextNum}`,
          agente_prestador: agente!.id,
          status: 'em_elaboracao',
          orientacoes: orientacoes,
          user_id: user?.id || 'system',
          dias_uteis: 0,
          dias_totais: 0,
        })
        setDraftProcess(proc)
      }

      for (const file of files) {
        await uploadDocumento(proc.id, file)
      }

      setFiles([])
      toast({ title: 'Rascunho Salvo', description: 'Processo e arquivos vinculados com sucesso.' })
      return proc
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao salvar o rascunho.', variant: 'destructive' })
      return null
    } finally {
      setSaving(false)
    }
  }

  const handleEmail = async () => {
    const proc = await saveDraft()
    if (proc && agente?.email) {
      window.location.href = `mailto:${agente.email}?subject=Novas Orientações - Sindicância ${proc.numero_controle}&body=Olá ${agente.nomeCompleto},%0D%0A%0D%0APor favor, verifique as orientações para o novo processo no sistema.`
    } else if (!agente?.email) {
      toast({
        title: 'Aviso',
        description: 'Agente não possui e-mail cadastrado.',
        variant: 'destructive',
      })
    }
  }

  const handleWhatsapp = async () => {
    const proc = await saveDraft()
    if (proc && agente?.telefone) {
      const phone = agente.telefone.replace(/\D/g, '')
      const msg = encodeURIComponent(
        `Olá ${agente.nomeCompleto}, novas orientações para o processo ${proc.numero_controle} foram geradas.`,
      )
      window.open(`https://wa.me/55${phone}?text=${msg}`, '_blank')
    } else if (!agente?.telefone) {
      toast({
        title: 'Aviso',
        description: 'Agente não possui telefone cadastrado.',
        variant: 'destructive',
      })
    }
  }

  if (loading)
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    )

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Perfil
          </Button>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Orientações para Sindicância
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Agente: <span className="text-primary font-bold">{agente?.nomeCompleto}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-2xl border-none shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orientacoes" className="text-base font-semibold text-primary">
                    Orientações de Execução <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="orientacoes"
                    placeholder="Descreva detalhadamente o que o agente deve realizar nesta sindicância..."
                    className="min-h-[240px] resize-y rounded-xl p-4 text-[15px] leading-relaxed border-border focus-visible:ring-secondary/50"
                    value={orientacoes}
                    onChange={(e) => setOrientacoes(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm bg-card">
            <CardContent className="p-6">
              <Label className="text-base font-semibold text-primary mb-4 block">
                Anexos & Documentos
              </Label>
              <div
                className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h4 className="text-sm font-bold text-primary mb-1">
                  Arraste arquivos ou clique para selecionar
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Suporta PDF, DOCX, JPG e PNG. Tamanho máximo: 10MB total.
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept=".pdf,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              {files.length > 0 && (
                <div className="mt-6 space-y-2">
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    Arquivos Selecionados
                  </h5>
                  {files.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border group"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0 shadow-sm border border-border">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-sm font-semibold text-foreground truncate">
                            {f.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={() => removeFile(idx)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-2xl border-none shadow-sm sticky top-24 bg-card">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-primary mb-2">Ações da Sindicância</h3>

              <Button
                onClick={saveDraft}
                disabled={saving}
                variant="outline"
                className="w-full h-12 rounded-xl justify-start font-semibold text-primary border-primary hover:bg-primary/5"
              >
                {saving ? (
                  'Salvando...'
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-3" /> Salvar Rascunho
                  </>
                )}
              </Button>

              <div className="h-px bg-border my-2" />

              <Button
                onClick={handleEmail}
                disabled={saving}
                className="w-full h-12 rounded-xl justify-start font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Mail className="w-4 h-4 mr-3" /> Enviar por E-mail
              </Button>

              <Button
                onClick={handleWhatsapp}
                disabled={saving}
                className="w-full h-12 rounded-xl justify-start font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-3" /> Enviar por WhatsApp
              </Button>

              <div className="h-px bg-border my-2" />

              <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </Button>

              {draftProcess && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col items-center text-center animate-in zoom-in-95">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                  <span className="text-sm font-bold text-emerald-800">Rascunho Criado</span>
                  <span className="text-xs text-emerald-600 mt-1 font-medium">
                    {draftProcess.numero_controle}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
