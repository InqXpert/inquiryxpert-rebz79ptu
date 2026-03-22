import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Processo } from '@/types/processo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format, parseISO, isValid } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Clock, FileText, ArrowRight } from 'lucide-react'

interface Props {
  processo: Processo | null
  isOpen: boolean
  onClose: () => void
}

export function ProcessoQuickViewSheet({ processo, isOpen, onClose }: Props) {
  const navigate = useNavigate()

  if (!processo) return null

  const safeFormat = (dateStr?: string) => {
    if (!dateStr) return '-'
    const d = parseISO(dateStr)
    return isValid(d) ? format(d, 'dd/MM/yyyy') : '-'
  }

  const getPriorityColor = (p?: string) => {
    if (p === 'alta') return 'text-destructive'
    if (p === 'media') return 'text-amber-500'
    return 'text-muted-foreground'
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background border-l border-border shadow-2xl">
        <SheetHeader className="p-6 border-b border-border bg-muted/10 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="capitalize">
              {processo.status?.replace('_', ' ')}
            </Badge>
            {processo.prioridade && (
              <span
                className={`text-xs font-bold uppercase tracking-wider ${getPriorityColor(processo.prioridade)}`}
              >
                Prioridade {processo.prioridade}
              </span>
            )}
          </div>
          <SheetTitle className="text-2xl font-bold text-primary">
            {processo.numero_processo || processo.numero_controle || 'Sem Número'}
          </SheetTitle>
          <SheetDescription className="text-[15px] font-medium text-foreground mt-1">
            {processo.nome_segurado || 'Segurado não informado'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-muted/30 border border-border/50">
              <span className="text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Entrada
              </span>
              <span className="text-sm font-medium">{safeFormat(processo.data_entrada)}</span>
            </div>
            <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-muted/30 border border-border/50">
              <span className="text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Prazo
              </span>
              <span className="text-sm font-medium text-amber-600">
                {safeFormat(processo.data_prazo)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Local do Sinistro
            </span>
            <p className="text-sm font-medium text-foreground p-4 bg-muted/30 rounded-xl border border-border/50">
              {processo.local_sinistro || 'Local não especificado'}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs text-muted-foreground font-semibold uppercase flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Descrição Inicial
            </span>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap p-4 bg-muted/30 rounded-xl border border-border/50">
              {processo.descricao || 'Nenhuma descrição fornecida para este processo.'}
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-border shrink-0 bg-background">
          <Button
            className="w-full h-12 rounded-xl text-[15px] shadow-md transition-all hover:-translate-y-0.5"
            onClick={() => {
              onClose()
              navigate(`/gestao-agentes/processos/${processo.id}`)
            }}
          >
            Ver Detalhes Completos <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
