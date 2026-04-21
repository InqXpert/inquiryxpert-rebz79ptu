import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { toast } from 'sonner'
import {
  Loader2,
  ArrowLeft,
  Send,
  Check,
  ChevronsUpDown,
  UploadCloud,
  X,
  FileIcon,
  Save,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEncaminharSindicancia } from '@/hooks/use-encaminhar-sindicancia'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_EXTS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif']

export default function EncaminharSindicanciaPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialProcessoId = searchParams.get('processo_id') || ''
  const initialAgenteId = searchParams.get('agente_id') || ''

  const [processos, setProcessos] = useState<any[]>([])
  const [agentes, setAgentes] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)

  const [processoId, setProcessoId] = useState(initialProcessoId)
  const [agenteId, setAgenteId] = useState(initialAgenteId)

  const [openProcesso, setOpenProcesso] = useState(false)
  const [openAgente, setOpenAgente] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    orientacoes,
    setOrientacoes,
    documentos,
    loading,
    handleDocumentosAdd,
    handleDocumentosRemove,
    handleSend,
    handleDraft,
  } = useEncaminharSindicancia((id) => {
    if (id === 'draft') {
      navigate(-1)
    } else {
      navigate(`/sindicancia/${id}`)
    }
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [procRes, agRes] = await Promise.all([
          pb.collection('processos_operacionais').getFullList({
            filter: "status != 'concluido'",
            sort: '-created',
            fields: 'id,numero_controle,nome_segurado,agente_id',
          }),
          pb.collection('agentes').getFullList({
            filter: "ativo = 'Sim' || ativo = 'sim'",
            sort: 'nomeCompleto',
            fields: 'id,nomeCompleto,email,telefone',
          }),
        ])
        setProcessos(procRes)
        setAgentes(agRes)

        if (initialProcessoId && !initialAgenteId) {
          const preProc = procRes.find((p) => p.id === initialProcessoId)
          if (preProc && preProc.agente_id) {
            setAgenteId(preProc.agente_id)
          }
        }
      } catch (error) {
        toast.error('Erro ao carregar dados')
      } finally {
        setFetching(false)
      }
    }
    loadData()
  }, [initialProcessoId, initialAgenteId])

  useEffect(() => {
    if (processoId) {
      const proc = processos.find((p) => p.id === processoId)
      if (proc && proc.agente_id) {
        setAgenteId(proc.agente_id)
      }
    }
  }, [processoId, processos])

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      newFiles.forEach((f) => {
        if (f.size > MAX_FILE_SIZE) {
          toast.error(`Arquivo muito grande (max 10MB): ${f.name}`)
        } else {
          const ext = f.name.split('.').pop()?.toLowerCase() || ''
          if (!ALLOWED_EXTS.includes(ext)) {
            toast.error(`Tipo não permitido: ${f.name}`)
          } else {
            handleDocumentosAdd(f)
          }
        }
      })
    }
  }

  const selectedProcesso = processos.find((p) => p.id === processoId)
  const selectedAgente = agentes.find((a) => a.id === agenteId)

  const submitSend = async () => {
    await handleSend(processoId, selectedAgente)
  }

  const submitDraft = async () => {
    await handleDraft(processoId, agenteId)
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300 pb-12">
      <div className="flex items-center gap-4 mt-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-brand-navy dark:text-white tracking-tight">
            Encaminhar Sindicância
          </h1>
          <p className="text-muted-foreground mt-1 text-[15px] font-medium">
            Atribua processos e envie instruções e documentos para os agentes.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm relative overflow-hidden">
        {(fetching || loading) && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 animate-spin text-brand-cyan mb-4" />
            <span className="font-semibold text-brand-navy dark:text-white">Processando...</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          <div className="space-y-2.5 flex flex-col">
            <Label className="text-sm font-semibold text-brand-navy dark:text-gray-200">
              Processo Operacional <span className="text-destructive">*</span>
            </Label>
            <Popover open={openProcesso} onOpenChange={setOpenProcesso}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProcesso}
                  className="w-full justify-between h-12 rounded-xl border-border bg-background hover:bg-muted/50"
                >
                  {selectedProcesso ? (
                    <span className="truncate">
                      {selectedProcesso.numero_controle || selectedProcesso.id} -{' '}
                      {selectedProcesso.nome_segurado || 'Sem segurado'}
                    </span>
                  ) : (
                    <span className="text-muted-foreground font-normal">
                      Selecione um processo...
                    </span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0 rounded-xl"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Buscar por número ou segurado..." className="h-11" />
                  <CommandList>
                    <CommandEmpty>Nenhum processo encontrado.</CommandEmpty>
                    <CommandGroup>
                      {processos.map((p) => (
                        <CommandItem
                          key={p.id}
                          value={`${p.numero_controle} ${p.nome_segurado}`}
                          onSelect={() => {
                            setProcessoId(p.id)
                            setOpenProcesso(false)
                          }}
                          className="py-3 cursor-pointer"
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 text-brand-cyan',
                              processoId === p.id ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          <span className="truncate font-medium">{p.numero_controle || p.id}</span>
                          <span className="ml-2 text-muted-foreground truncate">
                            {p.nome_segurado}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2.5 flex flex-col">
            <Label className="text-sm font-semibold text-brand-navy dark:text-gray-200">
              Agente Responsável <span className="text-destructive">*</span>
            </Label>
            <Popover open={openAgente} onOpenChange={setOpenAgente}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openAgente}
                  className="w-full justify-between h-12 rounded-xl border-border bg-background hover:bg-muted/50"
                >
                  {selectedAgente ? (
                    <span className="truncate">{selectedAgente.nomeCompleto}</span>
                  ) : (
                    <span className="text-muted-foreground font-normal">
                      Selecione um agente...
                    </span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0 rounded-xl"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Buscar por nome do agente..." className="h-11" />
                  <CommandList>
                    <CommandEmpty>Nenhum agente encontrado.</CommandEmpty>
                    <CommandGroup>
                      {agentes.map((a) => (
                        <CommandItem
                          key={a.id}
                          value={a.nomeCompleto}
                          onSelect={() => {
                            setAgenteId(a.id)
                            setOpenAgente(false)
                          }}
                          className="py-3 cursor-pointer"
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 text-brand-cyan',
                              agenteId === a.id ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          <span className="truncate font-medium">{a.nomeCompleto}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2.5 mb-8">
          <Label className="text-sm font-semibold text-brand-navy dark:text-gray-200">
            Orientações de Execução <span className="text-destructive">*</span>
          </Label>
          <Textarea
            value={orientacoes}
            onChange={(e) => setOrientacoes(e.target.value)}
            placeholder="Descreva as instruções detalhadas para o agente..."
            className="min-h-[160px] text-sm resize-y rounded-xl p-4 border-border focus-visible:ring-brand-cyan bg-background"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Mínimo de 10 caracteres. Estas instruções serão enviadas via WhatsApp e Email.
          </p>
        </div>

        <div className="space-y-2.5 mb-10">
          <Label className="text-sm font-semibold text-brand-navy dark:text-gray-200">
            Anexos (Máx 10MB por arquivo)
          </Label>
          <div
            className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer border-border"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="h-10 w-10 text-brand-cyan/70 mb-3" />
            <p className="text-[15px] font-medium text-brand-navy dark:text-white mb-1 text-center">
              Arraste arquivos ou clique para selecionar
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Formatos permitidos: PDF, DOC, DOCX, XLS, XLSX, Imagens
            </p>
            <input
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={onFilesSelected}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
            />
          </div>

          {documentos.length > 0 && (
            <div className="space-y-3 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documentos.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border border-border rounded-xl bg-background shadow-sm"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-brand-cyan/10 rounded-lg shrink-0">
                      <FileIcon className="h-4 w-4 text-brand-cyan" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-sm font-medium">{doc.filename}</span>
                      <span className="text-muted-foreground text-xs">
                        {(doc.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDocumentosRemove(doc.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={submitDraft}
            disabled={loading || fetching}
            className="h-12 px-6 rounded-xl font-bold border-border bg-background"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Rascunho
          </Button>
          <Button
            className="h-12 px-8 rounded-xl font-bold bg-brand-cyan hover:bg-brand-cyan/90 text-brand-navy shadow-sm"
            onClick={submitSend}
            disabled={loading || fetching}
          >
            <Send className="w-4 h-4 mr-2" />
            Encaminhar Sindicância
          </Button>
        </div>
      </div>
    </div>
  )
}
