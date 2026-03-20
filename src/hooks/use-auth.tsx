import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import pb from '@/lib/pocketbase/client'
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

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record as User | null)
    })
    setLoading(false)
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password)

      try {
        await pb.collection('users').update(authData.record.id, {
          ultimo_login: new Date().toISOString(),
        })
        await pb.collection('usuarios_historico').create({
          user_id: authData.record.id,
          acao: 'login',
          descricao: 'Login efetuado com sucesso',
          ip_address: '0.0.0.0',
          user_agent: navigator.userAgent,
        })
      } catch (e) {
        console.error('Falha ao registrar histórico de login', e)
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    if (pb.authStore.record) {
      try {
        await pb.collection('usuarios_historico').create({
          user_id: pb.authStore.record.id,
          acao: 'logout',
          descricao: 'Logout efetuado do sistema',
          ip_address: '0.0.0.0',
          user_agent: navigator.userAgent,
        })
      } catch (e) {
        console.error('Falha ao registrar histórico de logout', e)
      }
    }
    pb.authStore.clear()
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
