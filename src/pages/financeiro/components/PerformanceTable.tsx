import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

export function PerformanceTable({ users }: { users: any[] }) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'receita',
    direction: 'desc',
  })

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const sortedUsers = useMemo(() => {
    const sortable = [...users]
    sortable.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
    return sortable
  }, [users, sortConfig])

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc'
    setSortConfig({ key, direction })
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key !== column)
      return <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3" />
    )
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      Atingiu: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      Próximo: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      Atrás: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    }
    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {status}
      </span>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Performance por Usuário</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th
                  className="px-4 py-3 font-medium cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center">
                    Usuário <SortIcon column="name" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer"
                  onClick={() => requestSort('concluidos')}
                >
                  <div className="flex items-center">
                    Concluídos <SortIcon column="concluidos" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer"
                  onClick={() => requestSort('receita')}
                >
                  <div className="flex items-center">
                    Receita Gerada <SortIcon column="receita" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer"
                  onClick={() => requestSort('custo')}
                >
                  <div className="flex items-center">
                    Custo <SortIcon column="custo" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer"
                  onClick={() => requestSort('margem')}
                >
                  <div className="flex items-center">
                    Margem <SortIcon column="margem" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium w-[150px]">Meta</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y border-b">
              {sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.concluidos}</td>
                  <td className="px-4 py-3 font-medium text-green-600 dark:text-green-500">
                    {formatCurrency(user.receita)}
                  </td>
                  <td className="px-4 py-3 text-red-600 dark:text-red-500">
                    {formatCurrency(user.custo)}
                  </td>
                  <td className="px-4 py-3">{user.margem}%</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(user.progresso, 100)} className="h-2 w-16" />
                      <span className="text-xs text-muted-foreground w-8">{user.progresso}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
