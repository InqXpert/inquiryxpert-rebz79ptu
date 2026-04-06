import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './use-auth'
import {
  getMyNotificacoes,
  markNotificacaoAsRead,
  deleteNotificacao,
  NotificacaoAgente,
} from '@/services/notificacoes_agente'
import { useRealtime } from './use-realtime'

export function useNotifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<NotificacaoAgente[]>([])
  const [loading, setLoading] = useState(true)

  const loadNotifications = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }
    try {
      const data = await getMyNotificacoes(user.id)
      setNotifications(data)
    } catch (err) {
      console.error('Error loading notifications:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  useRealtime(
    'notificacoes_agente',
    () => {
      loadNotifications()
    },
    !!user,
  )

  const unreadCount = notifications.filter((n) => !n.lida).length

  const markAsRead = async (id: string) => {
    try {
      await markNotificacaoAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)))
    } catch (err) {
      console.error('Error marking as read:', err)
    }
  }

  const removeNotification = async (id: string) => {
    try {
      await deleteNotificacao(id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      console.error('Error deleting notification:', err)
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    removeNotification,
    refresh: loadNotifications,
  }
}
