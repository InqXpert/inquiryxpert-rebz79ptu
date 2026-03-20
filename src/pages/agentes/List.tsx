import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, AlertTriangle, ChevronDown, Pencil, Upload, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAgentes } from '@/hooks/use-agentes'
import { ImportAgenteModal } from '@/components/agentes/ImportAgenteModal'

export default function AgentesList() {
  const { agentes, loading } = useAgentes()
  const navigate = useNavigate()

  const [searchMode, setSearchMode] = useState('Nome')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')
  const [blacklist, setBlacklist] = useState('Todos')
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const filtered = agentes.filter((p) => {
    if (searchMode === 'Nome') {
      return (
        p.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
        (p.cpf && p.cpf.includes(search)) ||
        (p.cnpj && p.cnpj.includes(search)) ||
        (p.numero_controle && p.numero_controle.toLowerCase().includes(search.toLowerCase()))
      )
    }
    if (searchMode === 'Região') {
      return (
        (p.baseAtendimento || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.regiaoAbrangencia || '').toLowerCase().includes(search.toLowerCase())
      )
    }
    if (searchMode === 'Status/Blacklist') {
      const matchStatus = status === 'Todos' || p.ativo === status
      const matchBl = blacklist === 'Todos' || p.naBlackList === blacklist
      return matchStatus && matchBl
    }
    return true
  })

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Agentes</h1>
          <p className="text-muted-foreground mt-1">Gerencie a rede de agentes externos.</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-xl shadow-sm px-6 bg-secondary text-white hover:bg-secondary/90 font-semibold h-12">
              <UserPlus className="w-5 h-5 mr-2" /> Novo Agente{' '}
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-border shadow-md">
            <DropdownMenuItem
              className="cursor-pointer py-3 font-medium text-primary hover:bg-muted focus:bg-muted"
              onClick={() => navigate('/agentes/novo')}
            >
              <Pencil className="w-4 h-4 mr-3" /> Preencher Manualmente
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer py-3 font-medium text-primary hover:bg-muted focus:bg-muted"
              onClick={() => setIsImportModalOpen(true)}
            >
              <Upload className="w-4 h-4 mr-3" /> Importar Planilha
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="p-4 flex flex-wrap gap-4 shadow-sm rounded-2xl border-none items-center">
        <div className="w-full sm:w-auto">
          <Select value={searchMode} onValueChange={setSearchMode}>
            <SelectTrigger className="h-12 bg-muted/30 border-none rounded-xl min-w-[200px]">
              <SelectValue placeholder="Tipo de Busca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nome">Buscar: Nome</SelectItem>
              <SelectItem value="Status/Blacklist">Filtro: Status/Blacklist</SelectItem>
              <SelectItem value="Região">Buscar: Região</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {searchMode === 'Nome' || searchMode === 'Região' ? (
          <div className="flex-1 min-w-[200px] relative animate-in fade-in zoom-in duration-200">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={
                searchMode === 'Nome'
                  ? 'Buscar por nome ou documento...'
                  : 'Buscar por cidade ou estado...'
              }
              className="pl-11 h-12 bg-muted/30 border-none rounded-xl text-sm focus-visible:ring-2 focus-visible:ring-secondary/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-1 flex-wrap gap-4 animate-in fade-in zoom-in duration-200">
            <div className="w-full sm:w-48">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-12 bg-muted/30 border-none rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Status: Todos</SelectItem>
                  <SelectItem value="Sim">Ativos</SelectItem>
                  <SelectItem value="Não">Inativos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select value={blacklist} onValueChange={setBlacklist}>
                <SelectTrigger className="h-12 bg-muted/30 border-none rounded-xl">
                  <SelectValue placeholder="Black List" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Black List: Todos</SelectItem>
                  <SelectItem value="Sim">Apenas Black List</SelectItem>
                  <SelectItem value="Não">Sem Black List</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </Card>

      <Card className="rounded-2xl shadow-sm border-none overflow-hidden flex-1 flex flex-col">
        {loading ? (
          <div className="flex flex-col gap-4 p-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl bg-muted/50" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-muted-foreground animate-in fade-in">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-1">Nenhum agente encontrado</h3>
            <p className="text-sm">Tente ajustar os filtros de busca ou adicione um novo agente.</p>
          </div>
        ) : (
          <div className="overflow-auto flex-1 animate-in fade-in">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="border-b-border">
                  <TableHead className="pl-6 py-4 font-semibold text-muted-foreground">
                    Nome Completo
                  </TableHead>
                  <TableHead className="py-4 font-semibold text-muted-foreground">
                    CPF/CNPJ
                  </TableHead>
                  <TableHead className="py-4 font-semibold text-muted-foreground">Região</TableHead>
                  <TableHead className="py-4 font-semibold text-muted-foreground">
                    Honorário
                  </TableHead>
                  <TableHead className="py-4 font-semibold text-muted-foreground">Status</TableHead>
                  <TableHead className="py-4 font-semibold text-muted-foreground text-right pr-6">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow
                    key={p.id}
                    className="cursor-pointer hover:bg-muted/20 border-b-border/50 transition-colors"
                    onClick={() => navigate(`/agentes/${p.id}`)}
                  >
                    <TableCell className="pl-6 font-semibold text-primary py-4 flex items-center gap-4">
                      <img
                        src={`https://img.usecurling.com/ppl/thumbnail?seed=${p.id}&gender=male`}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        alt="Avatar"
                      />
                      <div className="flex flex-col">
                        <span>{p.nomeCompleto}</span>
                        {p.numero_controle && (
                          <span className="text-xs font-medium text-muted-foreground">
                            {p.numero_controle}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium">
                      {p.cpf || p.cnpj || '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {p.baseAtendimento || p.regiaoAbrangencia || '-'}
                    </TableCell>
                    <TableCell className="font-bold text-primary">
                      R$ {Number(p.valorHonorario || 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {p.naBlackList === 'Sim' ? (
                        <Badge
                          variant="destructive"
                          className="bg-destructive/10 text-destructive border-0 hover:bg-destructive/20 font-bold px-3 py-1"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1.5" /> Black List
                        </Badge>
                      ) : p.ativo === 'Sim' ? (
                        <Badge
                          variant="secondary"
                          className="bg-secondary/10 text-secondary border-0 hover:bg-secondary/20 font-bold px-3 py-1"
                        >
                          Ativo
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground border-muted-foreground/30 font-bold px-3 py-1"
                        >
                          Inativo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-muted"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/agentes/${p.id}/editar`)
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <ImportAgenteModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
    </div>
  )
}
