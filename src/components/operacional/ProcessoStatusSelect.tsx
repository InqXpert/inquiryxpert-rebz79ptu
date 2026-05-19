import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FinalizarProcessoModal } from './FinalizarProcessoModal'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/use-auth'
import { createAuditLog } from '@/services/processosService'
import { Processo } from '@/types/processo'

interface Props {
  processo: Processo
  onStatusChange?: (newStatus: string) => void
  disabled?: boolean
  className?: string
}

export function ProcessoStatusSelect({ processo, onStatusChange, disabled, className }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const currentStatus = processo.status || 'ANALISE_INICIAL'

  const handleStatusChange = async (value: string) => {
    if (value === 'FINALIZADO' && currentStatus !== 'FINALIZADO') {
      setIsModalOpen(true)
      return
    }

    if (value === currentStatus) return

    setLoading(true)
    try {
      const prevStatus = processo.status
      await pb.collection('processos_operacionais').update(processo.id, {
        status: value,
      })

      await createAuditLog(
        processo.id,
        'STATUS_ALTERADO',
        user?.id,
        { status: prevStatus },
        { status: value },
      )

      toast.success('Status atualizado com sucesso!')
      onStatusChange?.(value)
    } catch (error: any) {
      console.error(error)
      toast.error('Erro ao atualizar status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Select
        value={currentStatus}
        onValueChange={handleStatusChange}
        disabled={loading || disabled}
      >
        <SelectTrigger className={className || 'w-[200px]'}>
          <SelectValue placeholder="Selecione o status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ANALISE_INICIAL">Análise Inicial</SelectItem>
          <SelectItem value="EM_EXECUCAO">Em Execução</SelectItem>
          <SelectItem value="EM_ELABORACAO">Em Elaboração</SelectItem>
          <SelectItem value="PENDENTE_DOCUMENTOS">Pendente de Documentos</SelectItem>
          <SelectItem value="FINALIZADO">Finalizado</SelectItem>
          <SelectItem value="CANCELADO">Cancelado</SelectItem>
        </SelectContent>
      </Select>

      <FinalizarProcessoModal
        processo={processo}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={() => onStatusChange?.('FINALIZADO')}
      />
    </>
  )
}
