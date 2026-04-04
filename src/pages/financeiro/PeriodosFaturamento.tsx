import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { usePeriodos } from '@/hooks/financeiro/use-periodos'
import { FinanceiroNav } from './components/FinanceiroNav'
import { PeriodoModal } from './components/PeriodoModal'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Lock, Trash2, Plus, RefreshCw } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function PeriodosFaturamento() {
  const { user } = useAuth()
  const canEdit = user?.role === 'c-level' || user?.role === 'admin'
  const {
    periodos,
    clientes,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    clienteFilter,
    setClienteFilter,
    handleCreate,
    handleClose,
    handleDelete,
    loadData,
  } = usePeriodos()
  const [modalOpen, setModalOpen] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    try {
      const isoDate = dateString.replace(' ', 'T')
      return format(parseISO(isoDate), 'dd/MM/yyyy', { locale: ptBR })
    } catch {
      return dateString
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-brand-navy">Períodos de Faturamento</h1>
        <p className="text-muted-foreground text-[14px]">
          Fechamento de períodos e cálculo de totais
        </p>
      </div>

      <FinanceiroNav />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="aberto">Aberto</SelectItem>
              <SelectItem value="fechado">Fechado</SelectItem>
              <SelectItem value="faturado">Faturado</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
            </SelectContent>
          </Select>

          <Select value={clienteFilter} onValueChange={setClienteFilter}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Clientes</SelectItem>
              {clientes.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.razao_social}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {canEdit && (
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-primary text-white w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Novo Período
          </Button>
        )}
      </div>

      <div className="rounded-md border bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-brand-navy text-[12px] font-bold uppercase">
                Cliente
              </TableHead>
              <TableHead className="text-brand-navy text-[12px] font-bold uppercase">
                Data Início
              </TableHead>
              <TableHead className="text-brand-navy text-[12px] font-bold uppercase">
                Data Fim
              </TableHead>
              <TableHead className="text-brand-navy text-[12px] font-bold uppercase text-right">
                Processos
              </TableHead>
              <TableHead className="text-brand-navy text-[12px] font-bold uppercase text-right">
                Total
              </TableHead>
              <TableHead className="text-brand-navy text-[12px] font-bold uppercase">
                Status
              </TableHead>
              <TableHead className="text-brand-navy text-[12px] font-bold uppercase text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[50px] ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px] ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-[80px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-[80px] ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-muted-foreground">Erro ao carregar períodos.</p>
                    <Button variant="outline" size="sm" onClick={loadData}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Tentar Novamente
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : periodos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center animate-fade-in-up">
                  <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                    <img
                      src="https://img.usecurling.com/p/200/200?q=empty%20box&color=gray"
                      alt="Empty"
                      className="w-24 h-24 opacity-50 grayscale"
                    />
                    <p>Nenhum período encontrado.</p>
                    {canEdit && (
                      <Button variant="outline" onClick={() => setModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Novo Período
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              periodos.map((p, i) => (
                <TableRow
                  key={p.id}
                  className={cn(
                    'hover:bg-muted transition-colors duration-200 animate-fade-in',
                    i % 2 !== 0 && 'bg-muted/50',
                  )}
                >
                  <TableCell className="font-medium">
                    {p.expand?.cliente_id?.razao_social || 'Cliente Desconhecido'}
                  </TableCell>
                  <TableCell>{formatDate(p.data_inicio)}</TableCell>
                  <TableCell>{formatDate(p.data_fim)}</TableCell>
                  <TableCell className="text-right font-medium">{p.total_processos}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(p.faturamento_total)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider inline-flex',
                        p.status === 'aberto' && 'bg-accent text-brand-navy',
                        p.status === 'fechado' && 'bg-secondary text-white',
                        p.status === 'faturado' && 'bg-primary text-white',
                        p.status === 'pago' && 'bg-[#0d9488] text-white',
                      )}
                    >
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {canEdit && (
                      <div className="flex justify-end gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={p.status !== 'aberto'}
                              title="Fechar Período"
                            >
                              <Lock className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar fechamento</AlertDialogTitle>
                              <AlertDialogDescription>
                                Deseja fechar este período? Não será possível adicionar mais
                                processos.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleClose(p.id)}
                                className="bg-primary text-white"
                              >
                                Confirmar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={p.status !== 'aberto'}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              title="Deletar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Deletar período</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja deletar este período? Esta ação não pode ser
                                desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(p.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Deletar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PeriodoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        clientes={clientes}
        onSubmit={handleCreate}
      />
    </div>
  )
}
