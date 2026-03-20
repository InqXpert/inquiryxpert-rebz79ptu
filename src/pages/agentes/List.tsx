import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, CheckCircle2, LockKeyhole, Unlock } from 'lucide-react'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { useAgentes } from '@/hooks/use-agentes'
import { ImportAgenteModal } from '@/components/agentes/ImportAgenteModal'
import { InvestigationMap } from '@/components/agentes/InvestigationMap'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AgentesList() {
  const { agentes, loading } = useAgentes()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')
  const [blacklist, setBlacklist] = useState('Todos')
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filtered = agentes.filter((p) => {
    const matchSearch =
      !search ||
      p.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
      (p.email && p.email.toLowerCase().includes(search.toLowerCase())) ||
      (p.telefone && p.telefone.includes(search))

    const matchStatus = status === 'Todos' || p.ativo === status
    const matchBl = blacklist === 'Todos' || p.naBlackList === blacklist
    return matchSearch && matchStatus && matchBl
  })

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length && filtered.length > 0) {
      setSelectedIds([])
    } else {
      setSelectedIds(filtered.map((a) => a.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-md bg-muted/40" />
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="list" className="w-full flex flex-col min-h-full bg-[#f5f8fa]">
      {/* Page Header Area */}
      <div className="bg-white border-b border-border pt-6 px-4 md:px-8 flex-shrink-0 shadow-sm z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-[22px] font-semibold text-[#2A3B4C] flex items-center gap-2 tracking-tight">
              Agentes
              <ChevronDown className="w-5 h-5 text-muted-foreground mt-0.5 cursor-pointer hover:text-[#00A8B5] transition-colors" />
            </h1>
            <p className="text-[13px] text-muted-foreground mt-0.5 font-medium">
              {filtered.length} records
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="h-9 text-[13px] font-semibold text-[#2A3B4C] border-border bg-[#fdfdfd] shadow-sm hover:bg-muted/50"
            >
              Ações <ChevronDown className="w-3.5 h-3.5 ml-1.5 opacity-60" />
            </Button>
            <Button
              variant="outline"
              className="h-9 text-[13px] font-semibold text-[#2A3B4C] border-border bg-[#fdfdfd] shadow-sm hover:bg-muted/50"
              onClick={() => setIsImportModalOpen(true)}
            >
              Importar
            </Button>
            <Button
              className="h-9 text-[13px] font-semibold bg-[#FF7A59] hover:bg-[#FF7A59]/90 text-white shadow-sm px-5"
              onClick={() => navigate('/agentes/novo')}
            >
              Criar agente
            </Button>
          </div>
        </div>

        <TabsList className="w-full justify-start gap-8 bg-transparent p-0 border-none h-auto">
          <TabsTrigger
            value="list"
            className="px-1 py-3 text-[14px] font-medium text-muted-foreground data-[state=active]:text-[#00A8B5] data-[state=active]:border-[#00A8B5] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all"
          >
            Todos os agentes
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className="px-1 py-3 text-[14px] font-medium text-muted-foreground data-[state=active]:text-[#00A8B5] data-[state=active]:border-[#00A8B5] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all"
          >
            Visão do mapa
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-1 p-4 md:p-8 flex flex-col max-w-[1600px] mx-auto w-full">
        <TabsContent
          value="list"
          className="m-0 bg-white border border-border shadow-sm rounded-lg flex-1 flex flex-col overflow-hidden"
        >
          {/* Filters bar */}
          <div className="flex flex-wrap gap-3 p-4 border-b border-border bg-white items-center">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-9 w-auto min-w-[140px] border-border bg-transparent shadow-none text-[13px] font-semibold text-[#2A3B4C] focus:ring-1 focus:ring-[#00A8B5]">
                <span className="text-muted-foreground mr-2 font-normal">Status:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Sim">Ativo</SelectItem>
                <SelectItem value="Não">Inativo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={blacklist} onValueChange={setBlacklist}>
              <SelectTrigger className="h-9 w-auto min-w-[140px] border-border bg-transparent shadow-none text-[13px] font-semibold text-[#2A3B4C] focus:ring-1 focus:ring-[#00A8B5]">
                <span className="text-muted-foreground mr-2 font-normal">Blacklist:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Sim">Sim</SelectItem>
                <SelectItem value="Não">Não</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              className="h-9 text-[13px] text-[#00A8B5] hover:text-[#00A8B5]/80 hover:bg-[#00A8B5]/10 px-3 font-semibold ml-1"
            >
              Filtros avançados (0)
            </Button>
          </div>

          {/* Search bar */}
          <div className="p-4 border-b border-border bg-white flex justify-between items-center">
            <div className="relative w-full max-w-[420px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar nome, telefone, email..."
                className="pl-9 h-10 text-[13px] border-border bg-white shadow-none rounded-md focus-visible:ring-1 focus-visible:ring-[#00A8B5] focus-visible:border-[#00A8B5]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 hidden md:flex">
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-4 text-[13px] font-semibold border-border text-[#2A3B4C]"
              >
                Exportar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-4 text-[13px] font-semibold border-border text-[#2A3B4C]"
              >
                Editar colunas
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f5f8fa] hover:bg-[#f5f8fa] border-b border-border">
                  <TableHead className="w-[50px] px-6">
                    <Checkbox
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-[#2A3B4C] uppercase tracking-wider py-4">
                    NOME
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-[#2A3B4C] uppercase tracking-wider py-4">
                    E-MAIL
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-[#2A3B4C] uppercase tracking-wider py-4">
                    TELEFONE
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-[#2A3B4C] uppercase tracking-wider py-4">
                    STATUS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow
                    key={p.id}
                    className="cursor-pointer group hover:bg-[#f5f8fa]/60 transition-colors"
                  >
                    <TableCell className="px-6">
                      <Checkbox
                        checked={selectedIds.includes(p.id)}
                        onCheckedChange={() => toggleSelect(p.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell className="py-4" onClick={() => navigate(`/agentes/${p.id}`)}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#00A8B5]/10 text-[#00A8B5] flex items-center justify-center font-bold text-[13px] shrink-0 border border-[#00A8B5]/20">
                          {p.nomeCompleto.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#00A8B5] font-semibold group-hover:underline text-[14px]">
                            {p.nomeCompleto}
                          </span>
                          {(p.cpf || p.cnpj) && (
                            <span className="text-[12px] text-muted-foreground font-normal mt-0.5">
                              {p.cpf || p.cnpj}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[13px] font-medium text-[#2A3B4C]">
                      {p.email || '--'}
                    </TableCell>
                    <TableCell className="text-[13px] font-medium text-muted-foreground">
                      {p.telefone || '--'}
                    </TableCell>
                    <TableCell>
                      {p.naBlackList === 'Sim' ? (
                        <div className="flex items-center gap-1.5 text-destructive font-semibold text-[12px]">
                          <LockKeyhole className="w-4 h-4" /> Blacklist
                        </div>
                      ) : p.ativo === 'Sim' ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[12px]">
                          <CheckCircle2 className="w-4 h-4" /> Ativo
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-muted-foreground font-semibold text-[12px]">
                          <Unlock className="w-4 h-4" /> Inativo
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-24 text-center">
                      <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#2A3B4C] mb-1">
                        Nenhum agente encontrado
                      </h3>
                      <p className="text-[13px] text-muted-foreground">
                        Tente ajustar seus filtros de busca.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Footer */}
          {filtered.length > 0 && (
            <div className="p-4 border-t border-border bg-white flex items-center justify-between text-[13px] font-medium text-muted-foreground mt-auto">
              <span>{filtered.length} records</span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="opacity-50 cursor-not-allowed text-[#00A8B5]">Prev</span>
                  <span className="w-7 h-7 rounded flex items-center justify-center bg-[#00A8B5]/10 text-[#00A8B5] font-bold text-[12px]">
                    1
                  </span>
                  <span className="opacity-50 cursor-not-allowed text-[#00A8B5]">Next</span>
                </div>
                <span className="hidden sm:flex items-center">
                  25 per page <ChevronDown className="w-3.5 h-3.5 ml-1.5" />
                </span>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="map"
          className="m-0 bg-white border border-border shadow-sm rounded-lg flex-1 flex flex-col p-2 sm:p-6 min-h-[500px]"
        >
          <InvestigationMap agentes={agentes} loading={loading} />
        </TabsContent>
      </div>

      <ImportAgenteModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
    </Tabs>
  )
}
