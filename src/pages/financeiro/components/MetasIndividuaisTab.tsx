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
import { MetaIndividualModal, MetaIndividual } from './MetaIndividualModal'
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

const MOCK_INDIVIDUAIS: MetaIndividual[] = [
  {
    id: '1',
    nome: 'Ana Silva',
    role: 'analista',
    receita: 8000,
    processos: 20,
    margem: 65,
    periodo: 'mensal',
  },
  {
    id: '2',
    nome: 'Carlos Oliveira',
    role: 'supervisor',
    receita: 10000,
    processos: 25,
    margem: 70,
    periodo: 'mensal',
  },
  {
    id: '3',
    nome: 'Mariana Santos',
    role: 'analista',
    receita: 7000,
    processos: 18,
    margem: 60,
    periodo: 'mensal',
  },
]

interface MetasIndividuaisTabProps {
  canEdit: boolean
}

export function MetasIndividuaisTab({ canEdit }: MetasIndividuaisTabProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [goals, setGoals] = useState<MetaIndividual[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<MetaIndividual | null>(null)

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [goalToDelete, setGoalToDelete] = useState<string | null>(null)

  const loadData = () => {
    setLoading(true)
    setError(false)
    setTimeout(() => {
      // Simulate successful fetch
      setGoals(MOCK_INDIVIDUAIS)
      setLoading(false)
    }, 800)
  }

  useEffect(() => {
    loadData()
  }, [])

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const handleSaveModal = (meta: MetaIndividual) => {
    if (editingGoal) {
      setGoals(goals.map((g) => (g.id === meta.id ? meta : g)))
      toast.success('Meta individual atualizada com sucesso')
    } else {
      setGoals([...goals, meta])
      toast.success('Meta individual criada com sucesso')
    }
    setIsModalOpen(false)
  }

  const confirmDelete = () => {
    if (goalToDelete) {
      setGoals(goals.filter((g) => g.id !== goalToDelete))
      toast.success('Meta individual deletada com sucesso')
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
          <p className="text-muted-foreground mb-4">Erro ao carregar metas. Tente novamente.</p>
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
          <div className="text-center p-12 text-muted-foreground">Nenhuma meta configurada</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Período</TableHead>
                <TableHead className="text-right">Meta de Receita</TableHead>
                <TableHead className="text-right">Meta de Processos</TableHead>
                <TableHead className="text-right">Meta de Margem</TableHead>
                {canEdit && <TableHead className="text-center">Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">{g.nome}</TableCell>
                  <TableCell className="capitalize">{g.role}</TableCell>
                  <TableCell className="capitalize">{g.periodo}</TableCell>
                  <TableCell className="text-right">{formatCurrency(g.receita)}</TableCell>
                  <TableCell className="text-right">{g.processos}</TableCell>
                  <TableCell className="text-right">{g.margem}%</TableCell>
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
