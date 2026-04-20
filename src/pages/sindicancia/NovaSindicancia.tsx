import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
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
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Send } from 'lucide-react'

export default function NovaSindicancia() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [processos, setProcessos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [processoId, setProcessoId] = useState('')
  const [orientacoes, setOrientacoes] = useState('')
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    pb.collection('processos_operacionais')
      .getFullList({ filter: "status != 'concluido'", sort: '-created' })
      .then((res) => setProcessos(res))
      .catch(() => toast.error('Erro ao carregar processos'))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!processoId || !orientacoes) return toast.error('Preencha os campos obrigatórios')

    try {
      setSubmitting(true)
      const formData = new FormData()
      formData.append('processo_id', processoId)
      if (user?.id) formData.append('user_id', user.id)
      formData.append('orientacoes', orientacoes)
      if (file) formData.append('documentos', file)

      await pb.collection('sindicancia_encaminhamentos').create(formData)
      toast.success('Sindicância encaminhada com sucesso!')
      navigate('/processos')
    } catch (error) {
      toast.error('Erro ao encaminhar sindicância')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white tracking-tight">
            Encaminhar Sindicância
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Crie um novo encaminhamento de sindicância para um processo.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>
                Processo Operacional <span className="text-destructive">*</span>
              </Label>
              <Select value={processoId} onValueChange={setProcessoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um processo..." />
                </SelectTrigger>
                <SelectContent>
                  {processos.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.numero_controle || p.id} - {p.nome_segurado || 'Sem segurado'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Orientações <span className="text-destructive">*</span>
              </Label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Detalhe as orientações para a sindicância..."
                value={orientacoes}
                onChange={(e) => setOrientacoes(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Documentos (Opcional)</Label>
              <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold px-8"
              >
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Send className="w-4 h-4 mr-2" />
                Encaminhar Sindicância
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
