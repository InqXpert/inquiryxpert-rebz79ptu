import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'

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

    // Set initial user data from auth cache and clear stale computed url if image changed
    setUser((prev: any) => {
      if (!prev) return authUser
      const hasImageChanged =
        prev.foto_perfil !== authUser.foto_perfil || prev.avatar !== authUser.avatar
      return {
        ...prev,
        ...authUser,
        computedAvatarUrl: hasImageChanged ? undefined : prev.computedAvatarUrl,
      }
    })

    const fetchUser = async () => {
      try {
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

  // Single Source of Truth for Real-time Identity Updates
  useRealtime(
    'users',
    (e) => {
      if (e.action === 'update' && authUser && e.record.id === authUser.id) {
        setUser((prev: any) => {
          if (!prev) return prev
          let newAvatarUrl = prev.computedAvatarUrl
          if (e.record.foto_perfil) {
            newAvatarUrl = pb.files.getUrl(e.record, e.record.foto_perfil)
          } else if (e.record.avatar) {
            newAvatarUrl = pb.files.getUrl(e.record, e.record.avatar)
          }
          return { ...prev, ...e.record, computedAvatarUrl: newAvatarUrl }
        })
      }
    },
    !!authUser,
  )

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
