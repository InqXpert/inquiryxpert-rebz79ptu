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
          fields: 'id,name,email,foto_perfil,avatar,role',
        })

        let finalAvatarUrl: string | undefined = undefined

        if (record.foto_perfil) {
          finalAvatarUrl = pb.files.getUrl(record, record.foto_perfil)
        } else if (record.avatar) {
          finalAvatarUrl = pb.files.getUrl(record, record.avatar)
        } else if (record.role === 'agente') {
          try {
            const agenteRecord = await pb
              .collection('agentes')
              .getFirstListItem(`user_id="${record.id}"`, {
                fields: 'id,foto_perfil',
              })
            if (agenteRecord?.foto_perfil) {
              finalAvatarUrl = pb.files.getUrl(agenteRecord, agenteRecord.foto_perfil)
            }
          } catch (e) {
            // Not found or error
          }
        }

        setUser({ ...record, computedAvatarUrl: finalAvatarUrl })
        setError(null)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [authUser, authLoading])

  let avatarUrl = user?.computedAvatarUrl
  if (!avatarUrl && user) {
    if (user.foto_perfil) {
      avatarUrl = pb.files.getUrl(user, user.foto_perfil)
    } else if (user.avatar) {
      avatarUrl = pb.files.getUrl(user, user.avatar)
    }
  }

  return { user, avatarUrl, loading, error }
}
