import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, AlertCircle, CheckCircle2, Mic, Camera, Loader2 } from 'lucide-react'
import { useGestaoAgentes } from '@/hooks/useGestaoAgentes'
import pb from '@/lib/pocketbase/client'
import { ProcessoOperacional } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { AudioUploadModal } from './components/AudioUploadModal'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'
import { transcribeAudio } from '@/services/processosService'

export default function GestaoAgentesProcessoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { agenteId, loading: authLoading } = useGestaoAgentes()
  const [processo, setProcesso] = useState<ProcessoOperacional | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAudioModal, setShowAudioModal] = useState(false)
  const { toast } = useToast()

  // Relatorio specific
  const [relatorioText, setRelatorioText] = useState('')
  const [isTranscribing, setIsTranscribing] = useState(false)

  const queryParams = new URLSearchParams(location.search)
  const defaultTab = queryParams.get('tab') || 'info'

  const loadData = async () => {
    if (!id) return
    try {
      const data = await pb.collection('processos_operacionais').getOne<ProcessoOperacional>(id)
      setProcesso(data)
      setRelatorioText(data.descricao || '') // Mocking report text using descricao for now
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) loadData()
  }, [id, authLoading])

  useRealtime('processos_operacionais', (e) => {
    if (e.record.id === id) setProcesso(e.record as ProcessoOperacional)
  })

  const handleTranscribe = async () => {
    if (!processo) return
    setIsTranscribing(true)
    try {
      const transcribedText = await transcribeAudio(processo.id)
      setRelatorioText((prev) => (prev ? prev + '\n\n' + transcribedText : transcribedText))
      toast({
        title: 'Transcrição Concluída',
        description: 'O áudio foi convertido em texto e adicionado ao relatório.',
      })
    } catch (err) {
      toast({ title: 'Erro', description: 'Falha ao transcrever o áudio.', variant: 'destructive' })
    } finally {
      setIsTranscribing(false)
    }
  }

  if (loading || authLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    )
  }

  if (!processo)
    return <div className="text-center py-10 font-medium">Processo não encontrado.</div>

  const isBloqueadoAudio =
    processo.status === 'bloqueado_sem_audio' ||
    (!processo.audio_validado &&
      processo.audio_obrigatorio_presente === false &&
      processo.status === 'concluido')

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-28 md:pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            className="mb-2 -ml-3 text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/gestao-agentes/processos')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight text-[#282c59]">
              {processo.numero_processo || processo.numero_controle}
            </h1>
            {isBloqueadoAudio ? (
              <Badge variant="destructive" className="h-6">
                <AlertCircle className="w-3 h-3 mr-1" /> Bloqueado S/ Áudio
              </Badge>
            ) : processo.status === 'concluido' ? (
              <Badge variant="success" className="h-6">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Concluído
              </Badge>
            ) : (
              <Badge variant="secondary" className="h-6 capitalize">
                {processo.status.replace('_', ' ')}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1 font-medium">{processo.nome_segurado}</p>
        </div>
        {isBloqueadoAudio && agenteId && (
          <Button
            className="bg-[#f43b53] hover:bg-[#f43b53]/90 text-white rounded-xl h-11 px-6 shadow-md"
            onClick={() => setShowAudioModal(true)}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Enviar Áudio Obrigatório
          </Button>
        )}
      </div>

      {isBloqueadoAudio && (
        <div className="bg-[#f43b53]/10 border border-[#f43b53]/20 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle className="w-8 h-8 text-[#f43b53] shrink-0" />
          <div>
            <h3 className="font-bold text-[#f43b53] text-lg">Ação Pendente: Upload de Áudio</h3>
            <p className="text-[#f43b53]/80 mt-1">
              Este processo encontra-se bloqueado para faturamento e conclusão final pois não possui
              o áudio da entrevista. Realize o upload para liberar.
            </p>
          </div>
        </div>
      )}

      <Card className="border-border shadow-sm rounded-2xl bg-card overflow-hidden">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="border-b border-border/60 bg-muted/10 px-6 pt-4">
            <TabsList className="bg-transparent justify-start w-full border-b-0 h-auto p-0 gap-6 overflow-x-auto">
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2bc8cf] rounded-none px-2 py-3 shadow-none text-muted-foreground data-[state=active]:text-[#282c59] text-[15px]"
              >
                Informações
              </TabsTrigger>
              <TabsTrigger
                value="relatorio"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2bc8cf] rounded-none px-2 py-3 shadow-none text-muted-foreground data-[state=active]:text-[#282c59] text-[15px]"
              >
                Relatório
              </TabsTrigger>
              <TabsTrigger
                value="docs"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2bc8cf] rounded-none px-2 py-3 shadow-none text-muted-foreground data-[state=active]:text-[#282c59] text-[15px]"
              >
                Documentos
              </TabsTrigger>
              <TabsTrigger
                value="msgs"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#2bc8cf] rounded-none px-2 py-3 shadow-none text-muted-foreground data-[state=active]:text-[#282c59] text-[15px]"
              >
                Mensagens
              </TabsTrigger>
            </TabsList>
          </div>
          <CardContent className="p-6">
            <TabsContent value="info" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold">
                    Seguradora
                  </span>
                  <p className="font-medium text-[#282c59]">{processo.cia || '-'}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold">
                    Tipo Serviço
                  </span>
                  <p className="font-medium text-[#282c59]">{processo.tipo_servico || '-'}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold">
                    Data Entrada
                  </span>
                  <p className="font-medium text-[#282c59]">
                    {processo.data_entrada
                      ? new Date(processo.data_entrada).toLocaleDateString()
                      : '-'}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold">
                    Data Prazo
                  </span>
                  <p className="font-medium text-[#282c59]">
                    {processo.data_prazo ? new Date(processo.data_prazo).toLocaleDateString() : '-'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-xs text-muted-foreground uppercase font-bold">
                    Descrição
                  </span>
                  <p className="text-[14px] text-foreground mt-1 whitespace-pre-wrap">
                    {processo.descricao || 'Sem descrição.'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-xs text-muted-foreground uppercase font-bold">
                    Orientações do Supervisor
                  </span>
                  <p className="text-[14px] p-4 bg-amber-50 text-amber-900 rounded-xl mt-1 whitespace-pre-wrap border border-amber-100">
                    {processo.orientacoes || 'Nenhuma orientação específica.'}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="relatorio" className="mt-0">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="font-bold text-lg text-primary">Redação do Relatório</h3>
                  <Button
                    variant="outline"
                    className="rounded-xl border-primary text-primary hover:bg-primary/5 shadow-sm"
                    onClick={handleTranscribe}
                    disabled={isTranscribing}
                  >
                    {isTranscribing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Mic className="w-4 h-4 mr-2" />
                    )}
                    {isTranscribing ? 'Transcrevendo...' : 'Transcrever Áudio Anexado'}
                  </Button>
                </div>
                <Textarea
                  value={relatorioText}
                  onChange={(e) => setRelatorioText(e.target.value)}
                  className="min-h-[400px] resize-y rounded-xl text-[15px] p-4 leading-relaxed"
                  placeholder="Escreva o relatório final da sindicância aqui..."
                />
              </div>
            </TabsContent>
            <TabsContent value="docs" className="mt-0">
              <div className="p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-muted/30">
                <p className="font-medium">Gerenciador de Documentos (Em Desenvolvimento)</p>
              </div>
            </TabsContent>
            <TabsContent value="msgs" className="mt-0">
              <div className="p-12 text-center text-muted-foreground border border-dashed rounded-xl bg-muted/30">
                <p className="font-medium">Chat do Processo (Em Desenvolvimento)</p>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Mobile-First Field Optimization: Bottom Action Bar */}
      {processo.status !== 'concluido' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border flex gap-3 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <Button
            className="flex-1 h-14 rounded-2xl shadow-md text-[15px] bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            onClick={() => setShowAudioModal(true)}
          >
            <Mic className="w-5 h-5 mr-2" /> Gravar Áudio
          </Button>
          <Button
            className="flex-1 h-14 rounded-2xl shadow-md text-[15px]"
            onClick={() =>
              toast({ title: 'Câmera', description: 'Abrindo captura de fotos do dispositivo...' })
            }
          >
            <Camera className="w-5 h-5 mr-2" /> Tirar Foto
          </Button>
        </div>
      )}

      {agenteId && (
        <AudioUploadModal
          isOpen={showAudioModal}
          onClose={() => setShowAudioModal(false)}
          processoId={processo.id}
          agenteId={agenteId}
          onSuccess={() => loadData()}
        />
      )}
    </div>
  )
}
