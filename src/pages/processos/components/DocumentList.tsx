import { useEffect, useState } from 'react'
import {
  FileText,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Music,
  Receipt,
  Image as ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getArquivosProcesso, deleteArquivoProcesso } from '@/services/arquivos_processo'
import { useRealtime } from '@/hooks/use-realtime'
import { ArquivoProcesso } from '@/types/arquivo'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useAuth } from '@/hooks/use-auth'

export function DocumentList({ processoId }: { processoId: string }) {
  const [arquivos, setArquivos] = useState<ArquivoProcesso[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { user } = useAuth()

  const loadData = async () => {
    try {
      setError(false)
      const data = await getArquivosProcesso(processoId)
      setArquivos(data)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (processoId) loadData()
  }, [processoId])

  useRealtime(
    'arquivos_processo',
    () => {
      loadData()
    },
    !!processoId,
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este arquivo?')) return
    try {
      await deleteArquivoProcesso(id)
      toast.success('Arquivo excluído com sucesso.')
    } catch (err) {
      toast.error('Erro ao excluir arquivo.')
    }
  }

  const handleView = (arq: ArquivoProcesso) => {
    window.open(pb.files.getURL(arq, arq.arquivo), '_blank')
  }

  if (loading) {
    return (
      <div className="w-full h-full border border-border bg-card rounded-xl flex flex-col overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border/50">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full border border-border bg-card rounded-xl flex flex-col items-center justify-center p-6 text-center space-y-4 shadow-sm">
        <p className="text-muted-foreground font-medium">
          Ocorreu um erro ao carregar os arquivos.
        </p>
        <Button onClick={loadData} variant="outline">
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full h-full border border-border bg-card rounded-xl flex flex-col overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center bg-muted/5">
        <h3 className="text-lg font-semibold text-foreground">Arquivos Anexados</h3>
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          {arquivos.length} arquivos
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-muted/5">
        {arquivos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center text-muted-foreground">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 opacity-30" />
            </div>
            <p className="font-medium text-foreground">Nenhum arquivo enviado ainda</p>
            <p className="text-sm mt-1">Os arquivos adicionados aparecerão aqui.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {arquivos.map((arq) => (
              <FileCard
                key={arq.id}
                arq={arq}
                onDelete={() => handleDelete(arq.id)}
                onView={() => handleView(arq)}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FileCard({
  arq,
  onDelete,
  onView,
  user,
}: {
  arq: ArquivoProcesso
  onDelete: () => void
  onView: () => void
  user: any
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'enviado':
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          >
            <Clock className="w-3 h-3 mr-1" /> Enviado
          </Badge>
        )
      case 'validando':
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
          >
            <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Validando
          </Badge>
        )
      case 'validado':
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" /> Validado
          </Badge>
        )
      case 'rejeitado':
        return (
          <Badge
            variant="outline"
            className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800"
          >
            <XCircle className="w-3 h-3 mr-1" /> Rejeitado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getIcon = () => {
    switch (arq.tipo_arquivo) {
      case 'audio':
        return <Music className="w-6 h-6" />
      case 'foto':
        return <ImageIcon className="w-6 h-6" />
      case 'despesas':
        return <Receipt className="w-6 h-6" />
      default:
        return <FileText className="w-6 h-6" />
    }
  }

  const isAudio = arq.tipo_arquivo === 'audio'
  const canDelete =
    arq.status === 'enviado' &&
    (user?.role === 'admin' || user?.role === 'c-level' || user?.role === 'agente')

  return (
    <div className="flex flex-col p-4 border border-border rounded-xl bg-card hover:border-primary/30 transition-colors gap-3 animate-in fade-in zoom-in-95 duration-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {getIcon()}
          </div>
          <div className="overflow-hidden space-y-1">
            <p
              className="text-sm font-semibold text-foreground truncate"
              title={arq.nome_arquivo || arq.arquivo}
            >
              {arq.nome_arquivo || arq.arquivo}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              <span className="capitalize bg-muted px-1.5 py-0.5 rounded font-medium text-[10px]">
                {arq.tipo_arquivo}
              </span>
              <span>{(arq.tamanho_bytes / 1024 / 1024).toFixed(2)} MB</span>
              <span>•</span>
              <span>{format(new Date(arq.created), 'dd/MM/yy HH:mm')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0">
          <div>{getStatusBadge(arq.status)}</div>
          <div className="flex items-center gap-1">
            {!isAudio && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={onView}
                title="Visualizar"
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
              asChild
              title="Download"
            >
              <a
                href={pb.files.getURL(arq, arq.arquivo)}
                download={arq.nome_arquivo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
              </a>
            </Button>
            {canDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={onDelete}
                title="Excluir"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {isAudio && (
        <div className="w-full pt-3 mt-1 border-t border-border/50">
          <audio
            controls
            src={pb.files.getURL(arq, arq.arquivo)}
            className="h-10 w-full rounded outline-none bg-muted/30"
          />
        </div>
      )}

      {arq.status === 'rejeitado' && arq.motivo_rejeicao && (
        <div className="text-xs text-rose-700 bg-rose-50 dark:bg-rose-500/10 p-2.5 rounded-lg mt-1 border border-rose-100 dark:border-rose-900/30">
          <span className="font-semibold block mb-0.5">Motivo da Rejeição:</span>
          {arq.motivo_rejeicao}
        </div>
      )}
    </div>
  )
}
