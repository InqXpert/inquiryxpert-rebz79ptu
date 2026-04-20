import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'

export function useCurrentUser() {
  const { user: authUser, loading: authLoading } = useAuth()
  const [user, setUser] = useState<any>(authUser)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!authUser) {
      setUser(null)
      setLoading(false)
      return
    }

    // Set initial user data from auth cache
    setUser(authUser)

    const fetchUser = async () => {
      try {
        setLoading(true)
        // Fetch specific fields per acceptance criteria
        const record = await pb.collection('users').getOne(authUser.id, {
          fields: 'id,name,email,foto_perfil',
        })
        setUser(record)
        setError(null)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [authUser, authLoading])

  const avatarUrl =
    user && user.foto_perfil ? pb.files.getUrl(user as any, user.foto_perfil) : undefined

  return { user, avatarUrl, loading, error }
}
