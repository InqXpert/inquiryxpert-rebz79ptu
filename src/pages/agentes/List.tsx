import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  AlertTriangle,
  ChevronDown,
  CheckCircle2,
  Lock,
  Unlock,
  Mail,
  Phone,
} from 'lucide-react'
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
import { Skeleton } from '@/components/ui/skeleton'
import { useAgentes } from '@/hooks/use-agentes'
import { ImportAgenteModal } from '@/components/agentes/ImportAgenteModal'
import { InvestigationMap } from '@/components/agentes/InvestigationMap'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AgentesList() {
  const { agentes, loading } = useAgentes()
  const navigate = useNavigate()

  const [searchMode, setSearchMode] = useState('Nome')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')
  const [blacklist, setBlacklist] = useState('Todos')
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const filtered = agentes.filter((p) => {
    if (searchMode === 'Nome' && search) {
      return (
        p.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
        (p.cpf && p.cpf.includes(search)) ||
        (p.cnpj && p.cnpj.includes(search)) ||
        (p.numero_controle && p.numero_controle.toLowerCase().includes(search.toLowerCase()))
      )
    }
    if (searchMode === 'Região' && search) {
      return (
        (p.base_atendimento_cidade || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.base_atendimento_estado || '').toLowerCase().includes(search.toLowerCase()) ||
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
    <div className="flex flex-col h-full bg-card border shadow-sm rounded-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-6 pb-4 bg-white rounded-none">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight text-foreground flex items-center gap-3">
            Agentes
            <ChevronDown className="w-[18px] h-[18px] text-muted-foreground mt-1 cursor-pointer hover:text-foreground transition-colors" />
          </h1>
          <p className="text-[13px] font-medium text-muted-foreground mt-1">
            {filtered.length} registros
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="text-foreground h-9 font-semibold text-[13px]">
            Ações <ChevronDown className="w-[14px] h-[14px] ml-2 text-muted-foreground" />
          </Button>
          <Button
            variant="outline"
            className="text-primary font-semibold border-primary/30 hover:bg-primary/5 h-9 text-[13px]"
            onClick={() => setIsImportModalOpen(true)}
          >
            Importar
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-none h-9 font-semibold text-[13px] px-5"
            onClick={() => navigate('/agentes/novo')}
          >
            Novo Agente
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full flex flex-col flex-1">
        <div className="px-6 border-b border-border bg-white">
          <TabsList className="w-auto border-none h-auto">
            <TabsTrigger value="list">Todos os agentes</TabsTrigger>
            <TabsTrigger value="map">Visão do mapa</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="m-0 border-none outline-none flex flex-col flex-1">
          {/* Tag Filters Area */}
          <div className="px-6 py-2.5 flex flex-wrap gap-2 items-center border-b border-border bg-muted/30">
            <Select value={searchMode} onValueChange={setSearchMode}>
              <SelectTrigger className="h-8 w-auto min-w-[140px] border-transparent hover:bg-muted/60 bg-transparent shadow-none font-medium text-[13px] text-foreground focus:ring-0">
                <span className="text-muted-foreground mr-1.5 font-normal">Filtrar por:</span>{' '}
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nome">Nome/Doc</SelectItem>
                <SelectItem value="Região">Região</SelectItem>
                <SelectItem value="Status/Blacklist">Status</SelectItem>
              </SelectContent>
            </Select>

            {searchMode === 'Status/Blacklist' && (
              <>
                <div className="h-4 w-[1px] bg-border mx-1"></div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-8 w-auto min-w-[120px] border-transparent hover:bg-muted/60 bg-transparent shadow-none font-medium text-[13px] text-foreground focus:ring-0">
                    <span className="text-muted-foreground mr-1.5 font-normal">Ativo:</span>{' '}
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Sim">Sim</SelectItem>
                    <SelectItem value="Não">Não</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={blacklist} onValueChange={setBlacklist}>
                  <SelectTrigger className="h-8 w-auto min-w-[120px] border-transparent hover:bg-muted/60 bg-transparent shadow-none font-medium text-[13px] text-foreground focus:ring-0">
                    <span className="text-muted-foreground mr-1.5 font-normal">Blacklist:</span>{' '}
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Sim">Na Blacklist</SelectItem>
                    <SelectItem value="Não">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}

            <Button
              variant="ghost"
              className="h-8 text-primary font-semibold text-[13px] px-3 ml-auto hover:bg-primary/5 hover:text-primary"
            >
              Filtros avançados (0)
            </Button>
          </div>

          {/* Search & Table Actions Bar */}
          <div className="px-6 py-3 flex justify-between items-center bg-white border-b border-border">
            <div className="relative w-full max-w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-muted-foreground" />
              <Input
                placeholder={
                  searchMode === 'Nome'
                    ? 'Pesquisar nome, doc, telefone...'
                    : searchMode === 'Região'
                      ? 'Pesquisar cidade, estado...'
                      : 'Pesquisar...'
                }
                className="pl-9 h-8 text-[13px] border-border bg-white rounded-[3px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary/40"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={searchMode === 'Status/Blacklist'}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[12px] font-semibold text-foreground border-border"
              >
                Exportar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[12px] font-semibold text-foreground border-border"
              >
                Editar colunas
              </Button>
            </div>
          </div>

          {/* Table Container - Square Corners */}
          <div className="overflow-auto flex-1 bg-white rounded-none">
            {loading ? (
              <div className="flex flex-col gap-2 p-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-sm bg-muted/40" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-24 text-muted-foreground bg-white">
                <Search className="w-10 h-10 text-muted-foreground/40 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Nenhum agente encontrado
                </h3>
                <p className="text-[13px]">Tente ajustar seus critérios de busca ou filtros.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted/30">
                    <TableHead className="w-[40px] px-6">
                      <div className="w-3.5 h-3.5 rounded-[2px] border border-muted-foreground/40 bg-white"></div>
                    </TableHead>
                    <TableHead>NOME</TableHead>
                    <TableHead>E-MAIL</TableHead>
                    <TableHead>TELEFONE</TableHead>
                    <TableHead>REGIÃO</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow
                      key={p.id}
                      className="cursor-pointer group rounded-none"
                      onClick={() => navigate(`/agentes/${p.id}`)}
                    >
                      <TableCell className="px-6 py-3 w-[40px]">
                        <div className="w-3.5 h-3.5 rounded-[2px] border border-muted-foreground/40 bg-white group-hover:border-primary"></div>
                      </TableCell>
                      <TableCell className="py-3 font-semibold flex items-center gap-3">
                        <div className="w-[30px] h-[30px] rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground font-bold text-[11px] shrink-0">
                          {p.nomeCompleto.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-primary group-hover:underline truncate">
                            {p.nomeCompleto}
                          </span>
                          {p.cpf || p.cnpj ? (
                            <span className="text-[11px] text-muted-foreground font-normal truncate mt-0.5">
                              {p.cpf || p.cnpj}
                            </span>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-muted-foreground">
                        {p.email ? (
                          <span className="flex items-center gap-1.5 text-primary hover:underline">
                            {p.email}
                          </span>
                        ) : (
                          '--'
                        )}
                      </TableCell>
                      <TableCell className="py-3 text-muted-foreground">
                        {p.telefone || '--'}
                      </TableCell>
                      <TableCell className="py-3 text-muted-foreground truncate max-w-[200px]">
                        {p.base_atendimento_cidade && p.base_atendimento_estado
                          ? `${p.base_atendimento_cidade} - ${p.base_atendimento_estado}`
                          : p.baseAtendimento || p.regiaoAbrangencia || '--'}
                      </TableCell>
                      <TableCell className="py-3">
                        {p.naBlackList === 'Sim' ? (
                          <div className="flex items-center gap-1.5 text-destructive font-semibold text-[12px]">
                            <Lock className="w-3.5 h-3.5" /> Na Blacklist
                          </div>
                        ) : p.ativo === 'Sim' ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[12px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Ativo
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-muted-foreground font-semibold text-[12px]">
                            <Unlock className="w-3.5 h-3.5" /> Inativo
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-3 border-t border-border bg-white flex items-center justify-between text-[12px] font-medium text-muted-foreground rounded-none">
            <span>{filtered.length} registros</span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="opacity-50 cursor-not-allowed text-primary">Anterior</span>
                <span className="w-6 h-6 rounded flex items-center justify-center bg-primary/10 text-primary font-bold">
                  1
                </span>
                <span className="opacity-50 cursor-not-allowed text-primary">Próxima</span>
              </div>
              <span>
                25 por página <ChevronDown className="inline w-3 h-3 ml-1" />
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map" className="m-0 bg-white p-6 rounded-none flex-1 outline-none">
          <InvestigationMap agentes={agentes} loading={loading} />
        </TabsContent>
      </Tabs>

      <ImportAgenteModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
    </div>
  )
}
