import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
    removeProcesso,
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

  const handleDelete = async () => {
    const success = await removeProcesso()
    if (success) {
      onUpdated()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[1000px] p-0 !rounded-2xl max-h-[90vh] overflow-hidden flex flex-col gap-0 border-none bg-muted/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {loading || !processo ? (
          <div className="p-8 space-y-6 bg-white w-full h-full">
            <DialogTitle className="sr-only">Carregando detalhes do processo</DialogTitle>
            <DialogDescription className="sr-only">
              Aguarde enquanto os detalhes são carregados.
            </DialogDescription>
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-5 w-1/4 mb-10" />
            <Skeleton className="h-[500px] w-full rounded-2xl" />
          </div>
        ) : (
          <>
            <div className="p-6 sm:p-8 bg-white border-b border-border z-10 shrink-0">
              <DialogHeader className="mb-0 space-y-0 text-left">
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                  Detalhes do Processo
                </DialogTitle>
                <DialogDescription className="text-[15px] font-medium text-muted-foreground flex items-center gap-3 flex-wrap">
                  <span className="bg-primary/5 text-primary px-3 py-1 rounded-md border border-primary/10">
                    {processo.numero_controle}
                  </span>
                  <span>•</span>
                  <span>{processo.nome_segurado}</span>
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <Tabs defaultValue="gerais" className="w-full">
                <TabsList className="flex flex-row gap-2 sm:gap-6 border-b border-border/60 mb-6 sm:mb-8 bg-transparent h-auto p-0 justify-start overflow-x-auto w-full max-w-full rounded-none">
                  {[
                    { value: 'gerais', label: 'Informações Gerais' },
                    { value: 'posicoes', label: 'Posições Preliminares' },
                    { value: 'observacoes', label: 'Observações' },
                    { value: 'documentos', label: 'Documentos' },
                    { value: 'historico', label: 'Histórico' },
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="px-1 py-3 text-[14px] sm:text-[15px] font-semibold text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:border-b-[3px] border-b-[3px] border-transparent rounded-none bg-transparent hover:bg-transparent shadow-none transition-all whitespace-nowrap"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="mt-4 animate-in fade-in duration-300 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
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

              <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
                <div>
                  {canDeleteProcesso() && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-12 px-6 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold"
                        >
                          Excluir Processo
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmação de Exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir este processo? Esta ação não pode ser
                            desfeita e todos os dados associados serão perdidos.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl h-11 px-6">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl h-11 px-6"
                          >
                            Excluir Definitivamente
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="h-12 px-8 rounded-xl font-bold shadow-sm"
                  onClick={onClose}
                >
                  Fechar
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
