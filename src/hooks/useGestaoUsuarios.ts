import { useState, useEffect, useCallback } from 'react'
import { usuariosService } from '@/services/usuariosService'
import type { User } from '@/types'
import { toast } from 'sonner'
import { useRealtime } from '@/hooks/use-realtime'

export function useGestaoUsuarios() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      const data = await usuariosService.fetchUsuarios()
      setUsers(data)
    } catch (error) {
      toast.error('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  useRealtime('users', () => {
    loadUsers()
  })

  return { users, loading, loadUsers }
}
