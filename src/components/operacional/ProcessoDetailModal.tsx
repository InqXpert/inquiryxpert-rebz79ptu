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
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        {loading || !processo ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4 mb-8" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        ) : (
          <>
            <DialogHeader className="p-6 pb-4 border-b shrink-0 bg-background/95 backdrop-blur z-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <DialogTitle className="text-xl font-bold text-foreground">
                    Detalhes do Processo
                  </DialogTitle>
                  <DialogDescription className="text-sm font-medium mt-1 uppercase tracking-wide text-primary">
                    {processo.numero_controle} • {processo.nome_segurado}
                  </DialogDescription>
                </div>
                {canDeleteProcesso() && (
                  <Button variant="destructive" size="sm" onClick={() => {}}>
                    Excluir Processo
                  </Button>
                )}
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto bg-muted/10 p-6 pt-2">
              <Tabs defaultValue="gerais" className="w-full h-full flex flex-col">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0 space-x-6">
                  <TabsTrigger
                    value="gerais"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 py-3 text-sm"
                  >
                    Inf. Gerais
                  </TabsTrigger>
                  <TabsTrigger
                    value="posicoes"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 py-3 text-sm"
                  >
                    Posições
                  </TabsTrigger>
                  <TabsTrigger
                    value="observacoes"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 py-3 text-sm"
                  >
                    Observações
                  </TabsTrigger>
                  <TabsTrigger
                    value="documentos"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 py-3 text-sm"
                  >
                    Documentos
                  </TabsTrigger>
                  <TabsTrigger
                    value="historico"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 py-3 text-sm"
                  >
                    Histórico
                  </TabsTrigger>
                </TabsList>

                <div className="mt-4 flex-1">
                  <TabsContent value="gerais" className="m-0 h-full">
                    <TabInformacoesGerais
                      processo={processo}
                      canEdit={canEditProcesso()}
                      onSave={(d) => {
                        updateProcesso(d)
                        onUpdated()
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="posicoes" className="m-0 h-full">
                    <TabPosicoes processo={processo} canAdd={canAddPosicao()} onAdd={addPosicao} />
                  </TabsContent>
                  <TabsContent value="observacoes" className="m-0 h-full">
                    <TabObservacoes
                      processo={processo}
                      canAdd={canAddObservacao()}
                      onAdd={addObservacao}
                    />
                  </TabsContent>
                  <TabsContent value="documentos" className="m-0 h-full">
                    <TabDocumentos
                      documentos={documentos}
                      canUpload={canUploadDocumento()}
                      onUpload={uploadDocumento}
                      onDelete={deleteDocumento}
                    />
                  </TabsContent>
                  <TabsContent value="historico" className="m-0 h-full">
                    <TabHistorico historico={historico} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
