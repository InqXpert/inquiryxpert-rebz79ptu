import { useEffect, useState } from 'react'
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import { Skeleton } from '@/components/ui/skeleton'

interface ProcessStatusProps {
  processoId: string
  currentStatus?: string
}

export function ProcessStatus({ processoId, currentStatus }: ProcessStatusProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{
    audio_count: number
    despesas_count: number
    can_conclude: boolean
  } | null>(null)

  useEffect(() => {
    if (!processoId) return
    pb.send(`/backend/v1/processos/${processoId}/check-completion`, { method: 'POST' })
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [processoId])

  if (loading) return <Skeleton className="w-full h-[88px] rounded-xl" />

  if (!data) return null

  const isFinalizado = currentStatus === 'FINALIZADO' || currentStatus === 'APROVADO'

  let statusType = 'pendente_docs'
  if (isFinalizado) {
    statusType = 'aprovado'
  } else if (data.audio_count > 0 && data.despesas_count > 0) {
    statusType = 'pendente_validacao'
  }

  if (statusType === 'pendente_docs') {
    return (
      <div className="w-full bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4 dark:bg-red-950/30 dark:border-red-900">
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-red-800 dark:text-red-300">
            Pendente de Documentos
          </h4>
          <p className="text-sm text-red-600 dark:text-red-400">
            Faltam gravações e/ou arquivo de despesas.
          </p>
        </div>
      </div>
    )
  }

  if (statusType === 'pendente_validacao') {
    return (
      <div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-4 dark:bg-yellow-950/30 dark:border-yellow-900">
        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-yellow-800 dark:text-yellow-300">
            Pendente de Validação
          </h4>
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            Aguardando validação do analista/supervisor.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-4 dark:bg-green-950/30 dark:border-green-900">
      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-green-800 dark:text-green-300">Aprovado</h4>
        <p className="text-sm text-green-600 dark:text-green-400">Pronto para faturamento.</p>
      </div>
    </div>
  )
}
