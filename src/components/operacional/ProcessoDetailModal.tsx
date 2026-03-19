import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useProcessoDetail } from '@/hooks/useProcessoDetail'
import { useEffect } from 'react'

import { TabInformacoesGerais } from './tabs/TabInformacoesGerais'
import { TabPosicoes } from './tabs/TabPosicoes'
import { TabObservacoes } from './tabs/TabObservacoes'
import { TabDocumentos } from './tabs/TabDocumentos'
import { TabHistorico } from './tabs/TabHistorico'

interface Props {
  processoId: string | null
  isOpen: boolean
  onClose: () => void
  onUpdated: () => void
}

export function ProcessoDetailModal({ processoId, isOpen, onClose, onUpdated }: Props) {
  const {
    processo,
    historico,
    documentos,
    loading,
    fetchProcessoDetail,
    updateProcesso,
    addObservacao,
    addPosicao,
    uploadDocumento,
    deleteDocumento,
    canEditProcesso,
    canDeleteProcesso,
    canAddObservacao,
    canAddPosicao,
    canUploadDocumento,
  } = useProcessoDetail()

  useEffect(() => {
    if (isOpen && processoId) {
      fetchProcessoDetail(processoId)
    }
  }, [isOpen, processoId, fetchProcessoDetail])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[900px] p-[24px] !rounded-[8px] max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-5 duration-300 gap-0">
        {loading || !processo ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4 mb-8" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        ) : (
          <>
            <DialogHeader className="mb-0 space-y-0">
              <DialogTitle className="text-[20px] font-bold text-foreground">
                Detalhes do Processo
              </DialogTitle>
              <DialogDescription className="text-[13px] text-muted-foreground mb-[16px] mt-[4px]">
                {processo.numero_controle} • {processo.nome_segurado}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="gerais" className="w-full">
              <TabsList className="flex flex-row gap-[16px] border-b border-border mb-[20px] bg-transparent h-auto p-0 justify-start rounded-none">
                <TabsTrigger
                  value="gerais"
                  className="px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium"
                >
                  Informações Gerais
                </TabsTrigger>
                <TabsTrigger
                  value="posicoes"
                  className="px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium"
                >
                  Posições Preliminares
                </TabsTrigger>
                <TabsTrigger
                  value="observacoes"
                  className="px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium"
                >
                  Observações
                </TabsTrigger>
                <TabsTrigger
                  value="documentos"
                  className="px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium"
                >
                  Documentos
                </TabsTrigger>
                <TabsTrigger
                  value="historico"
                  className="px-0 py-[8px] border-b-2 border-transparent data-[state=active]:border-[hsl(210_60%_25%)] data-[state=active]:text-foreground text-muted-foreground rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:border-[hsl(210_60%_25%)] transition-colors text-[13px] font-medium"
                >
                  Histórico
                </TabsTrigger>
              </TabsList>

              <div className="mt-4 flex-1 animate-in fade-in duration-200">
                <TabsContent value="gerais" className="m-0 focus-visible:outline-none">
                  <TabInformacoesGerais
                    processo={processo}
                    canEdit={canEditProcesso()}
                    onSave={(d) => {
                      updateProcesso(d)
                      onUpdated()
                    }}
                  />
                </TabsContent>
                <TabsContent value="posicoes" className="m-0 focus-visible:outline-none">
                  <TabPosicoes processo={processo} canAdd={canAddPosicao()} onAdd={addPosicao} />
                </TabsContent>
                <TabsContent value="observacoes" className="m-0 focus-visible:outline-none">
                  <TabObservacoes
                    processo={processo}
                    canAdd={canAddObservacao()}
                    onAdd={addObservacao}
                  />
                </TabsContent>
                <TabsContent value="documentos" className="m-0 focus-visible:outline-none">
                  <TabDocumentos
                    documentos={documentos}
                    canUpload={canUploadDocumento()}
                    onUpload={uploadDocumento}
                    onDelete={deleteDocumento}
                  />
                </TabsContent>
                <TabsContent value="historico" className="m-0 focus-visible:outline-none">
                  <TabHistorico historico={historico} />
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex flex-row gap-[12px] justify-end mt-[24px]">
              {canDeleteProcesso() && (
                <Button variant="destructive" className="h-[40px] px-[20px]" onClick={() => {}}>
                  Excluir Processo
                </Button>
              )}
              <Button variant="outline" className="h-[40px] px-[20px]" onClick={onClose}>
                Fechar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
