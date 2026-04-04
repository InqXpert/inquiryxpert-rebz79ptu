import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit2, Search, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { FinanceiroNav } from './components/FinanceiroNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import { getClientes, ClienteContrato } from '@/services/clientes_contratos'
import { cn } from '@/lib/utils'

export default function ClientesList() {
  const { user } = useAuth()
  const isSupervisor = user?.role === 'supervisor'
  const [clientes, setClientes] = useState<ClienteContrato[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [error, setError] = useState(false)

  const loadData = async () => {
    try {
      setError(false)
      const data = await getClientes()
      setClientes(data)
    } catch (err) {
      setError(true)
      toast.error('Erro ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('clientes_contratos', () => {
    loadData()
  })

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const filteredClientes = useMemo(() => {
    if (!debouncedSearch) return clientes
    const lower = debouncedSearch.toLowerCase()
    return clientes.filter(
      (c) => c.razao_social.toLowerCase().includes(lower) || c.cnpj.includes(lower),
    )
  }, [clientes, debouncedSearch])

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a2540] dark:text-white">
            Clientes e Contratos
          </h1>
          <p className="text-muted-foreground text-[14px] mt-1">
            Gestão de clientes e regras de faturamento
          </p>
        </div>
        {!isSupervisor && (
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link to="/financeiro/clientes/novo">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Link>
          </Button>
        )}
      </div>

      <FinanceiroNav />

      <div className="mt-6 bg-card rounded-md border shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por razão social ou CNPJ..."
              className="pl-9 border-border focus-visible:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
            <AlertCircle className="h-10 w-10 mb-2 text-destructive" />
            <p>Ocorreu um erro ao carregar os clientes.</p>
            <Button variant="outline" className="mt-4" onClick={loadData}>
              Tentar Novamente
            </Button>
          </div>
        ) : filteredClientes.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-10 w-10 opacity-20" />
            </div>
            <p className="text-lg font-medium">Nenhum cliente encontrado</p>
            <p className="text-sm mt-1 mb-6">
              {search ? 'Tente ajustar sua busca.' : 'Comece cadastrando um novo cliente.'}
            </p>
            {!isSupervisor && !search && (
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link to="/financeiro/clientes/novo">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Cliente
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-[#0a2540] dark:text-gray-300 text-[12px] font-bold uppercase border-b">
                <tr>
                  <th className="px-4 py-3">Razão Social</th>
                  <th className="px-4 py-3">CNPJ</th>
                  <th className="px-4 py-3">Emissão</th>
                  <th className="px-4 py-3">Período</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClientes.map((cliente, index) => (
                  <tr
                    key={cliente.id}
                    className={cn(
                      'group hover:bg-muted transition-colors',
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/50',
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-[#0a2540] dark:text-gray-200">
                      {cliente.razao_social}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{cliente.cnpj}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-white border-transparent',
                          cliente.tipo_emissao === 'unitaria_processo'
                            ? 'bg-[#0a2540] hover:bg-[#0a2540]/80'
                            : 'bg-[#008080] hover:bg-[#008080]/80',
                        )}
                      >
                        {cliente.tipo_emissao === 'unitaria_processo' ? 'Un. Processo' : 'Un. Lote'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">
                      {cliente.periodo_faturamento.replace('_', ' ')}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={cn(
                          'text-white border-transparent',
                          cliente.status === 'ativo'
                            ? 'bg-primary hover:bg-primary/80'
                            : 'bg-muted-foreground hover:bg-muted-foreground/80',
                        )}
                      >
                        {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!isSupervisor && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="text-[#0a2540] dark:text-gray-300 hover:text-primary hover:bg-primary/10"
                        >
                          <Link to={`/financeiro/clientes/${cliente.id}`}>
                            <Edit2 className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
