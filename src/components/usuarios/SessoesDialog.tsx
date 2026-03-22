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
import { format } from 'date-fns'
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

  useEffect(() => {
    if (open && userId) {
      setLoading(true)
      usuariosService
        .fetchSessoes(userId)
        .then(setSessoes)
        .finally(() => setLoading(false))
    }
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl p-0 overflow-hidden border-none shadow-xl">
        <DialogHeader className="p-6 bg-muted/30 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShieldAlert className="w-5 h-5 text-secondary" />
            Sessões Ativas
          </DialogTitle>
          <DialogDescription>
            Gerencie os acessos ativos deste usuário na plataforma.
          </DialogDescription>
        </DialogHeader>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-transparent border-t-0">
                <TableHead className="px-6">Início da Sessão</TableHead>
                <TableHead>Endereço IP</TableHead>
                <TableHead>Duração Estimada</TableHead>
                <TableHead className="text-right px-6">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    Carregando sessões...
                  </TableCell>
                </TableRow>
              ) : sessoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    Nenhuma sessão ativa encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                sessoes.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="px-6 font-medium text-[13px]">
                      {format(new Date(s.created), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </TableCell>
                    <TableCell className="text-[13px] text-muted-foreground font-mono">
                      {s.ip_address || '0.0.0.0'}
                    </TableCell>
                    <TableCell className="text-[13px] text-muted-foreground">
                      {s.duracao_minutos ? `${s.duracao_minutos} min` : 'Indeterminada'}
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 text-[12px] font-semibold"
                        onClick={() => handleForceLogout(s.id)}
                      >
                        <LogOut className="w-3 h-3 mr-2" />
                        Forçar Logout
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
