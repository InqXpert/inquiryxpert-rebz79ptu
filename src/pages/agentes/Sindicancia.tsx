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
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8 animate-pulse">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    )

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[15px] font-semibold text-muted-foreground hover:text-primary hover:bg-transparent px-0 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Perfil
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">
            Orientações para Sindicância
          </h1>
          <p className="text-base text-muted-foreground font-medium">
            Agente: <span className="text-primary font-bold">{agente?.nomeCompleto}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-2xl border border-border/50 shadow-sm bg-card">
            <CardContent className="p-8">
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="orientacoes" className="text-lg font-bold text-primary">
                    Orientações de Execução <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="orientacoes"
                    placeholder="Descreva detalhadamente o que o agente deve realizar nesta sindicância..."
                    className="min-h-[260px] resize-y rounded-2xl p-5 text-[15px] leading-relaxed border-border focus-visible:ring-secondary/50 shadow-sm"
                    value={orientacoes}
                    onChange={(e) => setOrientacoes(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border/50 shadow-sm bg-card">
            <CardContent className="p-8">
              <Label className="text-lg font-bold text-primary mb-5 block">
                Anexos & Documentos
              </Label>
              <div
                className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer bg-muted/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="w-14 h-14 text-muted-foreground mb-5 opacity-60" />
                <h4 className="text-base font-bold text-primary mb-2">
                  Arraste arquivos ou clique para selecionar
                </h4>
                <p className="text-[14px] text-muted-foreground max-w-sm font-medium">
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
                <div className="mt-8 space-y-3">
                  <h5 className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
                    Arquivos Selecionados
                  </h5>
                  {files.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-background rounded-xl border border-border group shadow-sm"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/50">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-[15px] font-bold text-foreground truncate">
                            {f.name}
                          </span>
                          <span className="text-[13px] font-medium text-muted-foreground mt-0.5">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10"
                        onClick={() => removeFile(idx)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-2xl border border-border/50 shadow-sm sticky top-24 bg-card">
            <CardContent className="p-8 space-y-5">
              <h3 className="font-bold text-primary text-xl mb-4">Ações da Sindicância</h3>

              <Button
                onClick={saveDraft}
                disabled={saving}
                variant="outline"
                className="w-full h-14 rounded-xl justify-start font-bold text-primary border-primary hover:bg-primary/5 text-[15px]"
              >
                {saving ? (
                  'Salvando...'
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-3" /> Salvar Rascunho
                  </>
                )}
              </Button>

              <div className="h-px bg-border my-4" />

              <Button
                onClick={handleEmail}
                disabled={saving}
                className="w-full h-14 rounded-xl justify-start font-bold bg-primary hover:bg-primary/90 text-primary-foreground text-[15px] shadow-sm"
              >
                <Mail className="w-5 h-5 mr-3" /> Enviar por E-mail
              </Button>

              <Button
                onClick={handleWhatsapp}
                disabled={saving}
                className="w-full h-14 rounded-xl justify-start font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-[15px] shadow-sm"
              >
                <MessageCircle className="w-5 h-5 mr-3" /> Enviar por WhatsApp
              </Button>

              <div className="h-px bg-border my-4" />

              <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                className="w-full h-14 rounded-xl text-[15px] font-bold text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </Button>

              {draftProcess && (
                <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col items-center text-center animate-in zoom-in-95">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mb-3" />
                  <span className="text-base font-bold text-emerald-800">Rascunho Criado</span>
                  <span className="text-[14px] text-emerald-600 mt-1.5 font-bold">
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
