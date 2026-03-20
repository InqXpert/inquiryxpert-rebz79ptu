import { useState, useEffect, useCallback } from 'react'
import { getAgentes } from '@/services/agentes'
import { useRealtime } from '@/hooks/use-realtime'
import { Agente } from '@/types'
import { useToast } from '@/hooks/use-toast'

export function useAgentes() {
  const [agentes, setAgentes] = useState<Agente[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchAgentes = useCallback(async () => {
    try {
      const data = await getAgentes()
      setAgentes(data)
    } catch (err) {
      console.error('Failed to fetch agentes', err)
      toast({ title: 'Erro', description: 'Erro ao carregar agentes.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchAgentes()
  }, [fetchAgentes])

  useRealtime('agentes', () => {
    fetchAgentes()
  })

  return { agentes, loading, refresh: fetchAgentes }
}
