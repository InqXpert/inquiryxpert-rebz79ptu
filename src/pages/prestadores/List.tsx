import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, AlertTriangle, ChevronDown, Pencil, Upload } from 'lucide-react'
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
import { usePrestadores } from '@/hooks/use-prestadores'
import { ImportProviderModal } from '@/components/providers/ImportProviderModal'

export default function PrestadoresList() {
  const { prestadores, loading } = usePrestadores()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')
  const [blacklist, setBlacklist] = useState('Todos')
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const filtered = prestadores.filter((p) => {
    const matchSearch =
      p.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
      (p.cpf && p.cpf.includes(search))
    const matchStatus = status === 'Todos' || p.ativo === status
    const matchBl = blacklist === 'Todos' || p.naBlackList === blacklist
    return matchSearch && matchStatus && matchBl
  })

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prestadores</h1>
          <p className="text-muted-foreground mt-1">Gerencie a rede de prestadores externos.</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full shadow-elevation px-6">
              Novo Prestador <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onClick={() => navigate('/prestadores/novo')}
            >
              <Pencil className="w-4 h-4 mr-2" /> Preencher Manualmente
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onClick={() => setIsImportModalOpen(true)}
            >
              <Upload className="w-4 h-4 mr-2" /> Importar Planilha
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="p-4 flex flex-wrap gap-4 shadow-sm rounded-2xl border-none">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou CPF..."
            className="pl-9 bg-background border-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-48">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-background border-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Status: Todos</SelectItem>
              <SelectItem value="Sim">Ativos</SelectItem>
              <SelectItem value="Não">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-48">
          <Select value={blacklist} onValueChange={setBlacklist}>
            <SelectTrigger className="bg-background border-none">
              <SelectValue placeholder="Black List" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Black List: Todos</SelectItem>
              <SelectItem value="Sim">Apenas Black List</SelectItem>
              <SelectItem value="Não">Sem Black List</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="rounded-2xl shadow-elevation border-none overflow-hidden flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-20 text-muted-foreground">
            Carregando prestadores...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-muted-foreground">
            <img
              src="https://img.usecurling.com/p/200/200?q=empty%20box&color=gray"
              alt="Empty"
              className="opacity-50 mb-6 w-32"
            />
            <h3 className="text-xl font-semibold text-foreground">Nenhum prestador encontrado</h3>
            <p>Tente ajustar os filtros ou adicione um novo.</p>
          </div>
        ) : (
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-b-muted">
                  <TableHead className="pl-6">Nome Completo</TableHead>
                  <TableHead>CPF/CNPJ</TableHead>
                  <TableHead>Região</TableHead>
                  <TableHead>Honorário</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow
                    key={p.id}
                    className="cursor-pointer hover:bg-muted/30 border-b-border/50"
                    onClick={() => navigate(`/prestadores/${p.id}`)}
                  >
                    <TableCell className="pl-6 font-medium text-primary py-4 flex items-center gap-3">
                      <img
                        src={`https://img.usecurling.com/ppl/thumbnail?seed=${p.id}&gender=male`}
                        className="w-8 h-8 rounded-full bg-muted"
                        alt="Avatar"
                      />
                      {p.nomeCompleto}
                    </TableCell>
                    <TableCell>{p.cpf || p.cnpj}</TableCell>
                    <TableCell>{p.regiaoAbrangencia}</TableCell>
                    <TableCell className="font-medium text-accent-foreground">
                      R$ {Number(p.valorHonorario || 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {p.naBlackList === 'Sim' ? (
                        <Badge
                          variant="destructive"
                          className="bg-destructive/10 text-destructive border-0 hover:bg-destructive/20"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1" /> Black List
                        </Badge>
                      ) : p.ativo === 'Sim' ? (
                        <Badge
                          variant="secondary"
                          className="bg-secondary/10 text-secondary-foreground border-0 hover:bg-secondary/20"
                        >
                          Ativo
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground border-muted-foreground/30"
                        >
                          Inativo
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <ImportProviderModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
    </div>
  )
}
