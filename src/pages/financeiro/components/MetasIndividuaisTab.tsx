import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { MetaIndividualModal, MetaIndividualForm } from './MetaIndividualModal'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  getAllMetasIndividuais,
  deleteMetaIndividual,
  getActualsIndividuais,
  saveMetaIndividual,
} from '@/services/metasFinanceiras'

interface MetasIndividuaisTabProps {
  canEdit: boolean
}

export interface IndividualGoalData {
  id: string
  usuario_id: string
  nome: string
  role: string
  periodo: string
  mes_inicio: number
  ano_inicio: number
  meta_receita: number
  meta_processos: number
  meta_margem: number
  actual_receita: number
  actual_processos: number
  actual_margem: number
}

export function MetasIndividuaisTab({ canEdit }: MetasIndividuaisTabProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [goals, setGoals] = useState<IndividualGoalData[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<IndividualGoalData | null>(null)

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    setError(false)
    try {
      const records = await getAllMetasIndividuais()
      const data = await Promise.all(
        records.map(async (r) => {
          const actuals = await getActualsIndividuais(
            r.usuario_id,
            r.periodo,
            r.mes_inicio,
            r.ano_inicio,
          )
          return {
            id: r.id,
            usuario_id: r.usuario_id,
            nome: r.expand?.usuario_id?.name || r.expand?.usuario_id?.email || 'Desconhecido',
            role: r.expand?.usuario_id?.role || 'N/A',
            periodo: r.periodo,
            mes_inicio: r.mes_inicio,
            ano_inicio: r.ano_inicio,
            meta_receita: r.meta_receita,
            meta_processos: r.meta_processos,
            meta_margem: r.meta_margem,
            actual_receita: actuals.receita,
            actual_processos: actuals.processos,
            actual_margem: actuals.margem,
          }
        }),
      )
      setGoals(data)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const handleSaveModal = async (metaForm: MetaIndividualForm) => {
    try {
      await saveMetaIndividual(metaForm, editingGoal?.id)
      toast.success(
        editingGoal
          ? 'Meta individual atualizada com sucesso'
          : 'Meta individual criada com sucesso',
      )
      setIsModalOpen(false)
      loadData()
    } catch (err) {
      toast.error('Erro ao salvar meta individual')
    }
  }

  const confirmDelete = async () => {
    if (goalToDelete) {
      try {
        await deleteMetaIndividual(goalToDelete)
        toast.success('Meta individual deletada com sucesso')
        loadData()
      } catch (err) {
        toast.error('Erro ao deletar meta')
      }
    }
    setIsDeleteAlertOpen(false)
    setGoalToDelete(null)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <p className="text-muted-foreground mb-4">
            Erro ao carregar dados das metas individuais. Tente novamente.
          </p>
          <Button onClick={loadData}>Tentar Novamente</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Metas Individuais</CardTitle>
          <CardDescription>Acompanhamento de performance por colaborador.</CardDescription>
        </div>
        {canEdit && (
          <Button
            onClick={() => {
              setEditingGoal(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Meta Individual
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center p-12 text-muted-foreground">
            Nenhuma meta configurada para este período
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Período</TableHead>
                <TableHead className="text-right">Receita (Progresso)</TableHead>
                <TableHead className="text-right">Processos (Progresso)</TableHead>
                <TableHead className="text-right">Margem (Progresso)</TableHead>
                {canEdit && <TableHead className="text-center">Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>
                    <div className="font-medium">{g.nome}</div>
                    <div className="text-xs text-muted-foreground capitalize">{g.role}</div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {g.periodo}{' '}
                    <span className="text-xs text-muted-foreground block">
                      {g.mes_inicio}/{g.ano_inicio}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium">
                      {formatCurrency(g.actual_receita)} / {formatCurrency(g.meta_receita)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {g.meta_receita > 0
                        ? ((g.actual_receita / g.meta_receita) * 100).toFixed(1)
                        : 0}
                      %
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium">
                      {g.actual_processos} / {g.meta_processos}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {g.meta_processos > 0
                        ? ((g.actual_processos / g.meta_processos) * 100).toFixed(1)
                        : 0}
                      %
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium">
                      {g.actual_margem}% / {g.meta_margem}%
                    </div>
                  </TableCell>
                  {canEdit && (
                    <TableCell className="text-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingGoal(g)
                          setIsModalOpen(true)
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setGoalToDelete(g.id)
                          setIsDeleteAlertOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <MetaIndividualModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        editingGoal={editingGoal}
        existingGoals={goals}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A meta individual será permanentemente removida do
              sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Sim, deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
