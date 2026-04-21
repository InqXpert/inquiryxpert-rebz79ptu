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
      <div className="flex flex-col gap-4 p-6 w-full max-w-[1600px] mx-auto">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl bg-muted/40" />
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="list" className="w-full flex flex-col min-h-full bg-[#f5f8fa]">
      {/* Page Header Area */}
      <div className="bg-white border-b border-border pt-6 md:pt-8 px-4 sm:px-6 md:px-8 flex-shrink-0 shadow-sm z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 max-w-[1600px] mx-auto w-full gap-6">
          <div className="flex flex-col">
            <h1 className="font-bold text-[#2A3B4C] flex items-center gap-2 tracking-tight mb-2 text-[28px]">
              Gestão de Agentes
              <ChevronDown className="w-6 h-6 text-muted-foreground mt-0.5 cursor-pointer hover:text-[#00A8B5] transition-colors" />
            </h1>
            <p className="text-base text-muted-foreground font-medium">{filtered.length} records</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0 w-full sm:w-auto">
            <Button
              variant="outline"
              className="h-11 text-[14px] font-semibold text-[#2A3B4C] border-border bg-[#fdfdfd] shadow-sm hover:bg-muted/50 rounded-xl flex-1 sm:flex-none"
            >
              Ações <ChevronDown className="w-4 h-4 ml-2 opacity-60" />
            </Button>
            <Button
              variant="outline"
              className="h-11 text-[14px] font-semibold text-[#2A3B4C] border-border bg-[#fdfdfd] shadow-sm hover:bg-muted/50 rounded-xl flex-1 sm:flex-none"
              onClick={() => setIsImportModalOpen(true)}
            >
              Importar
            </Button>
            <Button
              className="h-11 text-[14px] font-semibold bg-[#00A8B5] hover:bg-[#00A8B5]/90 text-white shadow-sm px-6 rounded-xl flex-1 sm:flex-none hidden lg:flex items-center justify-center"
              onClick={() => navigate('/sindicancia/encaminhar')}
            >
              Encaminhar Sindicância
            </Button>
            <Button
              className="h-11 text-[14px] font-semibold bg-[#F2485C] hover:bg-[#F2485C]/90 text-white shadow-sm px-6 rounded-xl flex-1 sm:flex-none"
              onClick={() => navigate('/agentes/novo')}
            >
              Criar agente
            </Button>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto w-full">
          <TabsList className="w-full justify-start gap-8 bg-transparent p-0 border-none h-auto">
            <TabsTrigger
              value="list"
              className="px-2 py-4 font-semibold text-muted-foreground data-[state=active]:text-[#00A8B5] data-[state=active]:border-[#00A8B5] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all text-[14px]"
            >
              Todos os agentes
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="px-2 py-4 font-semibold text-muted-foreground data-[state=active]:text-[#00A8B5] data-[state=active]:border-[#00A8B5] data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all text-[15px]"
            >
              Visão do mapa
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8 pb-12 flex flex-col max-w-[1600px] mx-auto w-full space-y-8">
        <TabsContent
          value="list"
          className="m-0 bg-white border border-border/50 shadow-sm rounded-2xl flex-1 flex flex-col overflow-hidden"
        >
          {/* Filters bar */}
          <div className="flex flex-wrap gap-4 p-5 border-b border-border bg-white items-center">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-11 w-full sm:w-[180px] border-border bg-transparent shadow-none text-[14px] font-semibold text-[#2A3B4C] focus:ring-2 focus:ring-[#00A8B5] rounded-xl">
                <span className="text-muted-foreground mr-2 font-normal">Status:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Sim">Ativo</SelectItem>
                <SelectItem value="Não">Inativo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={blacklist} onValueChange={setBlacklist}>
              <SelectTrigger className="h-11 w-full sm:w-[180px] border-border bg-transparent shadow-none text-[14px] font-semibold text-[#2A3B4C] focus:ring-2 focus:ring-[#00A8B5] rounded-xl">
                <span className="text-muted-foreground mr-2 font-normal">Blacklist:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Sim">Sim</SelectItem>
                <SelectItem value="Não">Não</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              className="h-11 text-[14px] text-[#00A8B5] hover:text-[#00A8B5]/80 hover:bg-[#00A8B5]/10 px-4 font-semibold ml-1 rounded-xl"
            >
              Filtros avançados (0)
            </Button>
          </div>

          {/* Search bar */}
          <div className="p-5 border-b border-border bg-white flex justify-between items-center">
            <div className="relative w-full max-w-[420px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Pesquisar nome, telefone, email..."
                className="pl-12 h-12 text-[14px] border-border bg-white shadow-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#00A8B5] focus-visible:border-[#00A8B5]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-3 hidden md:flex">
              <Button
                variant="outline"
                size="sm"
                className="h-12 px-5 text-[14px] font-semibold border-border text-[#2A3B4C] rounded-xl"
              >
                Exportar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-12 px-5 text-[14px] font-semibold border-border text-[#2A3B4C] rounded-xl"
              >
                Editar colunas
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f5f8fa]/80 hover:bg-[#f5f8fa]/80 border-b border-border">
                  <TableHead className="w-[60px] px-6 py-5">
                    <Checkbox
                      checked={selectedIds.length === filtered.length && filtered.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-[12px] font-bold text-[#2A3B4C] uppercase tracking-wider py-5">
                    NOME
                  </TableHead>
                  <TableHead className="text-[12px] font-bold text-[#2A3B4C] uppercase tracking-wider py-5">
                    E-MAIL
                  </TableHead>
                  <TableHead className="text-[12px] font-bold text-[#2A3B4C] uppercase tracking-wider py-5">
                    TELEFONE
                  </TableHead>
                  <TableHead className="text-[12px] font-bold text-[#2A3B4C] uppercase tracking-wider py-5">
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
                    <TableCell className="px-6 py-5">
                      <Checkbox
                        checked={selectedIds.includes(p.id)}
                        onCheckedChange={() => toggleSelect(p.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell className="py-5" onClick={() => navigate(`/agentes/${p.id}`)}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#00A8B5]/10 text-[#00A8B5] flex items-center justify-center font-bold text-[14px] shrink-0 border border-[#00A8B5]/20">
                          {p.nomeCompleto.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#00A8B5] font-semibold group-hover:underline text-[15px]">
                            {p.nomeCompleto}
                          </span>
                          {(p.cpf || p.cnpj) && (
                            <span className="text-[13px] text-muted-foreground font-medium mt-1">
                              {p.cpf || p.cnpj}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[14px] font-medium text-[#2A3B4C] py-5">
                      {p.email || '--'}
                    </TableCell>
                    <TableCell className="text-[14px] font-medium text-muted-foreground py-5">
                      {p.telefone || '--'}
                    </TableCell>
                    <TableCell className="py-5">
                      {p.naBlackList === 'Sim' ? (
                        <div className="flex items-center gap-2 text-destructive font-bold text-[13px] bg-destructive/10 px-3 py-1.5 rounded-full w-fit">
                          <LockKeyhole className="w-4 h-4" /> Blacklist
                        </div>
                      ) : p.ativo === 'Sim' ? (
                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-[13px] bg-emerald-100 px-3 py-1.5 rounded-full w-fit">
                          <CheckCircle2 className="w-4 h-4" /> Ativo
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground font-bold text-[13px] bg-muted px-3 py-1.5 rounded-full w-fit">
                          <Unlock className="w-4 h-4" /> Inativo
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-32 text-center">
                      <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-[#2A3B4C] mb-2">
                        Nenhum agente encontrado
                      </h3>
                      <p className="text-base text-muted-foreground">
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
            <div className="p-5 border-t border-border bg-white flex items-center justify-between text-[14px] font-medium text-muted-foreground mt-auto">
              <span>{filtered.length} records</span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="opacity-50 cursor-not-allowed text-[#00A8B5]">Prev</span>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00A8B5]/10 text-[#00A8B5] font-bold text-[13px]">
                    1
                  </span>
                  <span className="opacity-50 cursor-not-allowed text-[#00A8B5]">Next</span>
                </div>
                <span className="hidden sm:flex items-center">
                  25 per page <ChevronDown className="w-4 h-4 ml-2" />
                </span>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="map"
          className="m-0 bg-white border border-border/50 shadow-sm rounded-2xl flex-1 flex flex-col p-4 sm:p-8 min-h-[600px]"
        >
          <InvestigationMap agentes={agentes} loading={loading} />
        </TabsContent>
      </div>

      <ImportAgenteModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
    </Tabs>
  )
}
