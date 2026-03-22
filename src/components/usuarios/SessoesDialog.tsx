import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { usuariosService } from '@/services/usuariosService'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LogOut, ShieldAlert } from 'lucide-react'

export function SessoesDialog({
  open,
  onOpenChange,
  userId,
}: {
  open: boolean
  onOpenChange: () => void
  userId: string
}) {
  const [sessoes, setSessoes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const loadSessoes = () => {
    if (userId) {
      setLoading(true)
      usuariosService
        .fetchSessoes(userId)
        .then(setSessoes)
        .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    if (open) loadSessoes()
  }, [open, userId])

  const handleForceLogout = async (id: string) => {
    try {
      await usuariosService.forceLogout(id)
      setSessoes(sessoes.filter((s) => s.id !== id))
      toast.success('Sessão encerrada com sucesso.')
    } catch {
      toast.error('Erro ao encerrar sessão.')
    }
  }

  const handleForceLogoutAll = async () => {
    try {
      await Promise.all(sessoes.map((s) => usuariosService.forceLogout(s.id)))
      setSessoes([])
      toast.success('Todas as sessões foram encerradas.')
    } catch {
      toast.error('Erro ao encerrar todas as sessões.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl rounded-xl p-0 overflow-hidden">
        <DialogHeader className="p-6 bg-brand-light/30 dark:bg-black/20 border-b border-brand-teal/50 dark:border-brand-cyan/30">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl text-brand-navy dark:text-white">
                <ShieldAlert className="w-5 h-5 text-brand-cyan" />
                Sessões Ativas
              </DialogTitle>
              <DialogDescription className="text-brand-gray dark:text-brand-light/80 mt-1">
                Gerencie os acessos ativos deste usuário em tempo real.
              </DialogDescription>
            </div>
            <Button
              variant="destructive"
              disabled={sessoes.length === 0}
              onClick={handleForceLogoutAll}
              className="bg-brand-coral hover:bg-brand-coral/90 text-white font-bold h-10"
            >
              <LogOut className="w-4 h-4 mr-2" /> Forçar Logout de Todas
            </Button>
          </div>
        </DialogHeader>
        <div className="p-0 border-t-0 max-h-[60vh] overflow-y-auto">
          <Table className="border-0 border-t border-transparent rounded-none">
            <TableHeader className="sticky top-0 z-10 bg-brand-teal/20 dark:bg-brand-navy">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-6">Token (Masked)</TableHead>
                <TableHead>Iniciado em</TableHead>
                <TableHead>IP Origem</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead className="text-right px-6">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-brand-gray dark:text-brand-light"
                  >
                    Carregando sessões...
                  </TableCell>
                </TableRow>
              ) : sessoes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-brand-gray dark:text-brand-light font-medium"
                  >
                    Nenhuma sessão ativa encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                sessoes.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="px-6 font-mono text-[13px] text-brand-gray dark:text-brand-light/70">
                      {s.token.substring(0, 12)}...
                    </TableCell>
                    <TableCell className="font-bold text-[13px] text-brand-navy dark:text-white">
                      {formatDistanceToNow(new Date(s.created), { addSuffix: true, locale: ptBR })}
                    </TableCell>
                    <TableCell className="text-[13px] text-brand-gray dark:text-brand-light/80 font-mono">
                      {s.ip_address || '0.0.0.0'}
                    </TableCell>
                    <TableCell className="text-[13px] font-bold text-brand-cyan">
                      {s.duracao_minutos} min
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-9 text-[12px] font-bold bg-brand-coral hover:bg-brand-coral/90 min-h-[36px]"
                        onClick={() => handleForceLogout(s.id)}
                      >
                        <LogOut className="w-3 h-3 mr-2" />
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
