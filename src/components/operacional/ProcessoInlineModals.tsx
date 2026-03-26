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
import { Input } from '@/components/ui/input'

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
      pb.collection('processos_historico')
        .getFullList({ filter: `processo_id='${processo.id}'`, sort: '-created' })
        .then(setHistorico)
        .catch(console.error)
    }
  }, [isOpen, processo])

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Histórico de Auditoria</DialogTitle>
          <DialogDescription className="sr-only">Log de auditoria do processo</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-auto space-y-3 p-1">
          {historico.map((h) => (
            <div key={h.id} className="p-3 bg-muted/30 rounded-lg border border-border">
              <p className="font-bold text-sm text-primary capitalize">
                {h.tipo_evento?.replace(/_/g, ' ')}
              </p>
              <p className="text-sm mt-1">{h.descricao}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(h.created).toLocaleString()} por {h.user_name || 'Sistema'}
              </p>
            </div>
          ))}
          {historico.length === 0 && (
            <p className="text-sm text-muted-foreground italic">Nenhum registro encontrado.</p>
          )}
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
        user: pb.authStore.record?.name || pb.authStore.record?.email,
      }
      await pb.collection('processos_operacionais').update(processo.id, {
        observacoes_json: [...current, newObs],
      })
      setObs('')
      onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const existingObs = Array.isArray(processo?.observacoes_json) ? processo.observacoes_json : []

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Observações</DialogTitle>
          <DialogDescription className="sr-only">
            Adicionar e visualizar observações
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[40vh] overflow-auto space-y-3 p-1 mb-4">
          {existingObs.map((o: any, i: number) => (
            <div key={i} className="p-3 bg-muted/30 rounded-lg border border-border">
              <p className="text-sm">{o.text}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(o.date).toLocaleString()} • {o.user}
              </p>
            </div>
          ))}
          {existingObs.length === 0 && (
            <p className="text-sm text-muted-foreground italic">Nenhuma observação.</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-cyan min-h-[100px]"
            placeholder="Nova observação..."
          />
          <Button onClick={handleSave} disabled={saving || !obs.trim()} className="w-full">
            Adicionar Observação
          </Button>
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
        user: pb.authStore.record?.name || pb.authStore.record?.email,
      }
      await pb.collection('processos_operacionais').update(processo.id, {
        posicoes_json: [...current, newPos],
      })
      setPos('')
      onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const existingPos = Array.isArray(processo?.posicoes_json) ? processo.posicoes_json : []

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Posições</DialogTitle>
          <DialogDescription className="sr-only">Adicionar e visualizar posições</DialogDescription>
        </DialogHeader>
        <div className="max-h-[40vh] overflow-auto space-y-3 p-1 mb-4">
          {existingPos.map((p: any, i: number) => (
            <div key={i} className="p-3 bg-brand-cyan/10 rounded-lg border border-brand-cyan/20">
              <p className="text-sm font-medium text-foreground">{p.text}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(p.date).toLocaleString()} • {p.user}
              </p>
            </div>
          ))}
          {existingPos.length === 0 && (
            <p className="text-sm text-muted-foreground italic">Nenhuma posição registrada.</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            value={pos}
            onChange={(e) => setPos(e.target.value)}
            placeholder="Descreva a nova posição..."
          />
          <Button onClick={handleSave} disabled={saving || !pos.trim()} className="w-full">
            Adicionar Posição
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
