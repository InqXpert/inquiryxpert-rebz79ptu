import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getAgenteIdByUserId } from '@/services/gestaoAgentes'
import { fetchDashboardStats, DashboardStats } from '@/services/agentesService'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'

export function useAgenteStats(selectedAgenteId?: string | null) {
  const { user } = useAuth()
  const [agenteId, setAgenteId] = useState<string | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const loadData = useCallback(
    async (aId?: string | null) => {
      try {
        setLoading(true)
        const data = await fetchDashboardStats(aId)
        setStats(data)
      } catch (error) {
        console.error('Falha ao carregar dashboard', error)
        toast({ title: 'Erro ao carregar dashboard.', variant: 'destructive' })
      } finally {
        setLoading(false)
      }
    },
    [toast],
  )

  useEffect(() => {
    if (user?.id) {
      const isManager = ['c-level', 'admin', 'supervisor'].includes(user.role || '')
      if (isManager) {
        const targetId = selectedAgenteId || 'all'
        setAgenteId(targetId)
        loadData(targetId)
      } else {
        getAgenteIdByUserId(user.id).then((id) => {
          if (id) {
            setAgenteId(id)
            loadData(id)
          } else {
            setLoading(false)
          }
        })
      }
    } else {
      setLoading(false)
    }
  }, [user, loadData, selectedAgenteId])

  useRealtime(
    'processos_operacionais',
    () => {
      if (agenteId) loadData(agenteId)
    },
    !!agenteId,
  )

  return { stats, loading, agenteId }
}
