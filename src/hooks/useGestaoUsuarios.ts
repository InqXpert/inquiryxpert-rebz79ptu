import { useState, useEffect, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'
import { usuariosService } from '@/services/usuariosService'
import type { User, UsuarioSessao } from '@/types'
import { toast } from 'sonner'
import { useRealtime } from '@/hooks/use-realtime'

export function useGestaoUsuarios() {
  const [users, setUsers] = useState<User[]>([])
  const [activeSessions, setActiveSessions] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await usuariosService.fetchUsuarios()
      setUsers(data)

      const sessoes = await pb.collection('usuarios_sessoes').getFullList<UsuarioSessao>({
        filter: 'expirada=false',
      })

      const counts: Record<string, number> = {}
      sessoes.forEach((s) => {
        counts[s.user_id] = (counts[s.user_id] || 0) + 1
      })
      setActiveSessions(counts)
    } catch (error) {
      toast.error('Erro ao carregar dados de gestão')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime('users', loadData)
  useRealtime('usuarios_sessoes', loadData)

  return { users, activeSessions, loading, loadUsers: loadData }
}
