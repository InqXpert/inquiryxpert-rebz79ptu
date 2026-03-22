import { useState, useCallback } from 'react'
import { getAgenteIdByUserId } from '@/services/gestaoAgentes'
import { useAuth } from './use-auth'

export function useGestaoAgentes() {
  const { user } = useAuth()
  const [agenteId, setAgenteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const initAgente = useCallback(async () => {
    if (user?.id) {
      setLoading(true)
      const id = await getAgenteIdByUserId(user.id)
      setAgenteId(id)
      setLoading(false)
    }
  }, [user])

  return {
    agenteId,
    loading,
    initAgente,
    isSupervisor: user?.role === 'c-level' || user?.role === 'admin' || user?.role === 'supervisor',
  }
}
