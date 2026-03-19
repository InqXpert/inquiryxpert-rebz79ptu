import { useState, useEffect } from 'react'
import { getPrestadores } from '@/services/prestadores'
import { useRealtime } from '@/hooks/use-realtime'
import { Prestador } from '@/types'

export function usePrestadores() {
  const [prestadores, setPrestadores] = useState<Prestador[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPrestadores = async () => {
    try {
      const data = await getPrestadores()
      setPrestadores(data)
    } catch (err) {
      console.error('Failed to fetch prestadores', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrestadores()
  }, [])

  useRealtime('prestadores', () => {
    fetchPrestadores()
  })

  return { prestadores, loading, refresh: fetchPrestadores }
}
