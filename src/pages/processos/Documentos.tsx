import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProcessoDetalhes } from '@/hooks/useProcessoDetalhes'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, FolderOpen } from 'lucide-react'
import { FileUploadZone } from './components/FileUploadZone'
import { DocumentList } from './components/DocumentList'

export default function ProcessoDocumentosPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { processo, loading, error } = useProcessoDetalhes(id)

  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <Skeleton className="h-[400px]" />
          </div>
          <div className="lg:col-span-8">
            <Skeleton className="h-[600px]" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !processo) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-xl text-muted-foreground font-medium">
          {error || 'Processo não encontrado'}
        </p>
        <Button variant="outline" onClick={() => navigate('/processos')}>
          Voltar
        </Button>
      </div>
    )
  }

  const agenteId = processo.agente_id || processo.expand?.agente_id?.id || ''

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-300">
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(`/processos/${id}`)}
          className="text-foreground h-10 px-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Processo
        </Button>
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-foreground flex items-center gap-3">
            <FolderOpen className="w-7 h-7 text-primary" />
            Documentos do Processo {processo.numero_controle || processo.id}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie as evidências e arquivos relacionados a este caso.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 sticky top-6">
          <FileUploadZone processoId={id!} agenteId={agenteId} />
        </div>
        <div className="lg:col-span-8 h-full min-h-[600px] flex flex-col">
          <DocumentList processoId={id!} />
        </div>
      </div>
    </div>
  )
}
