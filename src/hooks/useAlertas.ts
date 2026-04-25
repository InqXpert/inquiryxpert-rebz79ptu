import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/hooks/use-auth'
import {
  fetchAlertas,
  calculateAlertLevel,
  dismissAlert as dismissAlertSvc,
} from '@/services/alertasService'
import { Alerta } from '@/types/alerta'
import { useRealtime } from '@/hooks/use-realtime'
import { toast } from 'sonner'

export function useAlertas() {
  const { user } = useAuth()
  const [alertas, setAlertas] = useState<Alerta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dismissedIds, setDismissedIds] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('dismissedAlerts') || '[]')
  })
  const [showDismissed, setShowDismissed] = useState(false)

  const prevAlertasRef = useRef<Alerta[]>([])

  const loadData = useCallback(
    async (isInitial = false, force = false) => {
      if (!user) return
      try {
        if (isInitial) setLoading(true)
        const processos = await fetchAlertas(force)
        const calcAlertas = calculateAlertLevel(processos, user.id, user.role)

        if (!isInitial && prevAlertasRef.current.length > 0) {
          const prevIds = new Set(prevAlertasRef.current.map((a) => a.id))
          const newAlerts = calcAlertas.filter((a) => !prevIds.has(a.id))
          newAlerts.forEach((a) => {
            toast.error(`Novo alerta: Processo ${a.numeroProcesso}`, {
              description: a.mensagem,
            })
          })
        }

        prevAlertasRef.current = calcAlertas
        setAlertas(calcAlertas)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Erro ao carregar alertas.')
        toast.error('Erro ao carregar alertas.')
      } finally {
        if (isInitial) setLoading(false)
      }
    },
    [user],
  )

  useEffect(() => {
    loadData(true)
  }, [loadData])

  useRealtime('processos_operacionais', () => {
    loadData(false, true)
  })

  const dismissAlert = (id: string) => {
    dismissAlertSvc(id)
    setDismissedIds((prev) => [...prev, id])
    toast.success('Alerta descartado.')
  }

  const toggleShowDismissed = () => {
    setShowDismissed(!showDismissed)
  }

  return {
    alertas,
    loading,
    error,
    dismissedIds,
    showDismissed,
    dismissAlert,
    toggleShowDismissed,
    refresh: () => loadData(true, true),
  }
}
