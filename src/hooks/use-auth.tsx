import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'
import { trackAcao } from '@/utils/trackAcao'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(pb.authStore.record as User | null)
  const [loading, setLoading] = useState(true)

  const handleSignOut = useCallback(async () => {
    if (pb.authStore.record) {
      try {
        const sessionId = localStorage.getItem('current_session_id')
        if (sessionId) {
          const sessao = await pb.collection('usuarios_sessoes').getOne(sessionId)
          const start = new Date(sessao.created)
          const diffMins = Math.floor((new Date().getTime() - start.getTime()) / 60000)

          await pb.collection('usuarios_sessoes').update(sessionId, {
            expirada: true,
            duracao_minutos: diffMins,
          })

          const u = await pb.collection('users').getOne(pb.authStore.record.id)
          await pb.collection('users').update(u.id, {
            tempo_uso_total: (u.tempo_uso_total || 0) + diffMins,
          })

          localStorage.removeItem('current_session_id')
        }
        await trackAcao('logout', 'Logout efetuado do sistema')
      } catch (e) {
        console.error('Falha ao encerrar sessão', e)
      }
    }
    pb.authStore.clear()
    setUser(null)
  }, [])

  useEffect(() => {
    const initAuth = async () => {
      if (pb.authStore.isValid) {
        try {
          // Check session inactivity (8 hours = 480 mins)
          const sessionId = localStorage.getItem('current_session_id')
          if (sessionId) {
            const sess = await pb.collection('usuarios_sessoes').getOne(sessionId)
            const hrsDiff =
              (new Date().getTime() - new Date(sess.updated).getTime()) / (1000 * 60 * 60)
            if (hrsDiff > 8 || sess.expirada) {
              await handleSignOut()
              setLoading(false)
              return
            }
            // Update session touch time
            await pb
              .collection('usuarios_sessoes')
              .update(sessionId, { updated: new Date().toISOString() })
          }

          await pb.collection('users').authRefresh()
          setUser(pb.authStore.record as User | null)
        } catch (error) {
          console.error('Auth refresh failed:', error)
          await handleSignOut()
        }
      }
      setLoading(false)
    }

    initAuth()

    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record as User | null)
    })

    // Activity check interval (every 10 mins)
    const interval = setInterval(
      () => {
        if (pb.authStore.isValid) initAuth()
      },
      10 * 60 * 1000,
    )

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [handleSignOut])

  const signIn = async (email: string, password: string) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password)

      try {
        await pb.collection('users').update(authData.record.id, {
          ultimo_login: new Date().toISOString(),
        })

        const sessao = await pb.collection('usuarios_sessoes').create({
          user_id: authData.record.id,
          token: pb.authStore.token,
          ip_address: '0.0.0.0', // Handled by server hooks ideally
          duracao_minutos: 0,
          expirada: false,
        })
        localStorage.setItem('current_session_id', sessao.id)

        await trackAcao('login', 'Login efetuado com sucesso')
      } catch (e) {
        console.error('Falha ao registrar histórico de login', e)
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut: handleSignOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
