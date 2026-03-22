import { useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'

export function useTrackTempo() {
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (!user) return

    const sessionId = localStorage.getItem('current_session_id')
    if (!sessionId) return

    const interval = setInterval(async () => {
      try {
        const sessao = await pb.collection('usuarios_sessoes').getOne(sessionId)
        if (sessao.expirada) {
          signOut()
          return
        }

        const start = new Date(sessao.created)
        const diffMins = Math.floor((new Date().getTime() - start.getTime()) / 60000)

        // Force logout if session duration exceeds 8 hours (480 minutes)
        if (diffMins >= 480) {
          await pb.collection('usuarios_sessoes').update(sessionId, {
            expirada: true,
            duracao_minutos: diffMins,
          })
          signOut()
        } else {
          // Periodically update duration for real-time tracking
          await pb.collection('usuarios_sessoes').update(sessionId, {
            duracao_minutos: diffMins,
          })
        }
      } catch (err) {
        console.error('Session track error:', err)
      }
    }, 60000) // Check every 1 minute

    return () => clearInterval(interval)
  }, [user, signOut])
}
