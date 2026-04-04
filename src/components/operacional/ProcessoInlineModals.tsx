import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Processo } from '@/types/processo'
import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { toast } from 'sonner'
import { createAuditLog } from '@/services/processosService'

export function HistoricoModal({
  processo,
  isOpen,
  onClose,
}: {
  processo: Processo | null
  isOpen: boolean
  onClose: () => void
}) {
  const [historico, setHistorico] = useState<any[]>([])

  useEffect(() => {
    if (isOpen && processo) {
      pb.collection('audit_log')
        .getFullList({
          filter: `processo_id='${processo.id}'`,
          sort: '-created',
          expand: 'usuario_id',
        })
        .then(setHistorico)
        .catch(console.error)
    }
  }, [isOpen, processo])

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[700px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg">
        <DialogHeader className="px-[20px] py-[20px] border-b border-border shrink-0">
          <DialogTitle className="text-[18px] font-bold text-foreground">
            Histórico de Auditoria
          </DialogTitle>
          <DialogDescription className="sr-only">Log de auditoria do processo</DialogDescription>
        </DialogHeader>
        <div className="p-[20px] overflow-y-auto flex-1">
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-bold text-muted-foreground text-[14px]">
                    Data
                  </TableHead>
                  <TableHead className="font-bold text-muted-foreground text-[14px]">
                    Usuário
                  </TableHead>
                  <TableHead className="font-bold text-muted-foreground text-[14px]">
                    Ação
                  </TableHead>
                  <TableHead className="font-bold text-muted-foreground text-[14px]">
                    Detalhes
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historico.map((h, i) => (
                  <TableRow
                    key={h.id}
                    className="h-[48px] hover:bg-muted animate-in fade-in fill-mode-both duration-200"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <TableCell className="text-[14px] whitespace-nowrap">
                      {new Date(h.created).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-[14px] whitespace-nowrap">
                      {h.expand?.usuario_id?.name || h.expand?.usuario_id?.email || 'Sistema'}
                    </TableCell>
                    <TableCell className="text-[14px] capitalize whitespace-nowrap">
                      {h.acao?.replace(/_/g, ' ')}
                    </TableCell>
                    <TableCell className="text-[14px] min-w-[200px]">
                      {h.acao === 'EDITADO' ? 'Processo modificado' : h.dados_novos?.text || h.acao}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {historico.length === 0 && (
              <div className="p-[20px] text-center">
                <p className="text-[14px] text-muted-foreground">Nenhum registro encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ObservacoesModal({
  processo,
  isOpen,
  onClose,
}: {
  processo: Processo | null
  isOpen: boolean
  onClose: () => void
}) {
  const [obs, setObs] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!obs.trim() || !processo) return
    setSaving(true)
    try {
      const current = processo.observacoes_json || []
      const newObs = {
        text: obs,
        date: new Date().toISOString(),
        user: pb.authStore.record?.name || pb.authStore.record?.email || 'Usuário',
      }
      await pb.collection('processos_operacionais').update(processo.id, {
        observacoes_json: [...current, newObs],
      })
      await createAuditLog(
        processo.id,
        'OBSERVACAO_ADICIONADA',
        pb.authStore.record?.id,
        null,
        newObs,
      )
      setObs('')
      toast.success('Observação adicionada', {
        description: 'A observação foi salva com sucesso.',
      })
      onClose()
    } catch (e) {
      console.error(e)
      toast.error('Erro ao salvar', {
        description: 'Não foi possível salvar a observação.',
      })
    } finally {
      setSaving(false)
    }
  }

  const existingObs = Array.isArray(processo?.observacoes_json) ? processo.observacoes_json : []

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[600px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg">
        <DialogHeader className="px-[20px] py-[20px] border-b border-border shrink-0">
          <DialogTitle className="text-[18px] font-bold text-foreground">Observações</DialogTitle>
          <DialogDescription className="sr-only">
            Adicionar e visualizar observações
          </DialogDescription>
        </DialogHeader>
        <div className="p-[20px] overflow-y-auto flex-1 flex flex-col gap-[24px]">
          <div className="flex flex-col gap-3 shrink-0">
            <Label htmlFor="nova-obs" className="sr-only">
              Nova observação
            </Label>
            <Textarea
              id="nova-obs"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className="h-[100px] resize-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              placeholder="Nova observação..."
              aria-label="Nova observação"
            />
            <Button
              onClick={handleSave}
              disabled={saving || !obs.trim()}
              className="h-[44px] w-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Adicionar observação"
            >
              Adicionar
            </Button>
          </div>

          <div className="flex flex-col">
            {existingObs.map((o: any, i: number) => (
              <div
                key={i}
                className="mb-[12px] p-[12px] border border-border rounded-[6px] animate-in fade-in fill-mode-both duration-200"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex justify-between items-center mb-1 gap-4">
                  <span className="text-[12px] font-bold text-foreground truncate">{o.user}</span>
                  <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                    {new Date(o.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-[14px] text-foreground break-words">{o.text}</p>
              </div>
            ))}
            {existingObs.length === 0 && (
              <div className="p-[20px] text-center">
                <p className="text-[14px] text-muted-foreground">Nenhuma observação registrada.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PosicoesModal({
  processo,
  isOpen,
  onClose,
}: {
  processo: Processo | null
  isOpen: boolean
  onClose: () => void
}) {
  const [pos, setPos] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!pos.trim() || !processo) return
    setSaving(true)
    try {
      const current = processo.posicoes_json || []
      const newPos = {
        text: pos,
        date: new Date().toISOString(),
        user: pb.authStore.record?.name || pb.authStore.record?.email || 'Usuário',
      }
      await pb.collection('processos_operacionais').update(processo.id, {
        posicoes_json: [...current, newPos],
      })
      await createAuditLog(processo.id, 'POSICAO_ADICIONADA', pb.authStore.record?.id, null, newPos)
      setPos('')
      toast.success('Posição adicionada', {
        description: 'A posição foi salva com sucesso.',
      })
      onClose()
    } catch (e) {
      console.error(e)
      toast.error('Erro ao salvar', {
        description: 'Não foi possível salvar a posição.',
      })
    } finally {
      setSaving(false)
    }
  }

  const existingPos = Array.isArray(processo?.posicoes_json) ? processo.posicoes_json : []

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[600px] w-full p-0 gap-0 max-h-[80vh] flex flex-col overflow-hidden bg-card border-border rounded-lg">
        <DialogHeader className="px-[20px] py-[20px] border-b border-border shrink-0">
          <DialogTitle className="text-[18px] font-bold text-foreground">Posições</DialogTitle>
          <DialogDescription className="sr-only">Adicionar e visualizar posições</DialogDescription>
        </DialogHeader>
        <div className="p-[20px] overflow-y-auto flex-1 flex flex-col gap-[24px]">
          <div className="flex flex-col gap-3 shrink-0">
            <Label htmlFor="nova-pos" className="sr-only">
              Nova posição
            </Label>
            <Textarea
              id="nova-pos"
              value={pos}
              onChange={(e) => setPos(e.target.value)}
              className="h-[100px] resize-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              placeholder="Descreva a nova posição..."
              aria-label="Nova posição"
            />
            <Button
              onClick={handleSave}
              disabled={saving || !pos.trim()}
              className="h-[44px] w-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              aria-label="Adicionar posição"
            >
              Adicionar
            </Button>
          </div>

          <div className="flex flex-col">
            {existingPos.map((p: any, i: number) => (
              <div
                key={i}
                className="mb-[12px] p-[12px] border border-border rounded-[6px] animate-in fade-in fill-mode-both duration-200"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex justify-between items-center mb-1 gap-4">
                  <span className="text-[12px] font-bold text-foreground truncate">{p.user}</span>
                  <span className="text-[12px] text-muted-foreground whitespace-nowrap">
                    {new Date(p.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-[14px] text-foreground break-words">{p.text}</p>
              </div>
            ))}
            {existingPos.length === 0 && (
              <div className="p-[20px] text-center">
                <p className="text-[14px] text-muted-foreground">Nenhuma posição registrada.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
