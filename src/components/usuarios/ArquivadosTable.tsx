import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArchiveRestore, Trash2 } from 'lucide-react'
import { formatDateBr } from '@/lib/utils'
import type { User } from '@/types'
import { useCanDelete } from '@/hooks/useCanDelete'
import { usuariosService } from '@/services/usuariosService'
import { toast } from 'sonner'
import { DoubleConfirmDialog } from '@/components/DoubleConfirmDialog'
import { useState } from 'react'

export function ArquivadosTable({
  users,
  loading,
  onRefresh,
}: {
  users: User[]
  loading: boolean
  onRefresh: () => void
}) {
  const canDelete = useCanDelete()
  const [userToRestore, setUserToRestore] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const handleRestore = async () => {
    if (!userToRestore) return
    try {
      await usuariosService.restoreUsuario(userToRestore.id)
      toast.success('Usuário reativado com sucesso')
      onRefresh()
    } catch {
      toast.error('Erro ao reativar usuário')
    }
  }

  const handleDelete = async () => {
    if (!userToDelete) return
    try {
      await usuariosService.deleteUsuario(userToDelete.id)
      toast.success('Usuário deletado permanentemente')
      onRefresh()
    } catch {
      toast.error('Erro ao deletar usuário')
    }
  }

  if (!canDelete) return null

  return (
    <>
      <div className="bg-white dark:bg-brand-navy border border-border rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Data de Arquivamento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-muted-foreground font-medium"
                >
                  Nenhum usuário arquivado.
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{u.name}</span>
                      <span className="text-xs text-muted-foreground">{u.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="uppercase text-[10px] font-bold">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-medium">
                    {u.archived_at ? formatDateBr(u.archived_at) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-accent text-accent-foreground hover:bg-accent/80 mr-2 h-9 w-9 rounded-md"
                      title="Reativar"
                      onClick={() => setUserToRestore(u)}
                    >
                      <ArchiveRestore className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 w-9 rounded-md"
                      title="Deletar Permanentemente"
                      onClick={() => setUserToDelete(u)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {userToRestore && (
        <DoubleConfirmDialog
          open={!!userToRestore}
          onOpenChange={(op) => !op && setUserToRestore(null)}
          title="Reativar Usuário"
          description={`Tem certeza que deseja reativar o usuário ${userToRestore.name || userToRestore.email}?`}
          onConfirm={handleRestore}
          confirmText="Reativar"
          requireText="CONFIRMAR"
        />
      )}

      {userToDelete && (
        <DoubleConfirmDialog
          open={!!userToDelete}
          onOpenChange={(op) => !op && setUserToDelete(null)}
          title="Deletar Usuário"
          description={`Tem certeza que deseja deletar PERMANENTEMENTE o usuário ${userToDelete.name || userToDelete.email}? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          confirmText="Deletar"
          requireText="CONFIRMAR"
        />
      )}
    </>
  )
}
