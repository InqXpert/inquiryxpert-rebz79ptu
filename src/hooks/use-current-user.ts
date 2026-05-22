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
      const hasImageChanged = prev.foto_url !== authUser.foto_url
      return {
        ...prev,
        ...authUser,
        computedAvatarUrl: hasImageChanged ? undefined : prev.computedAvatarUrl,
      }
    })

    const fetchUser = async () => {
      try {
        // Fetch specific fields per acceptance criteria (only fields that exist in schema)
        const record = await pb.collection('users').getOne(authUser.id, {
          fields: 'id,collectionId,collectionName,name,email,foto_url,role',
        })

        let finalAvatarUrl: string | undefined = undefined

        if (record.foto_url) {
          finalAvatarUrl = pb.files.getUrl(record, record.foto_url, { token: pb.authStore.token })
        } else if (record.role === 'agente') {
          try {
            const agenteRecord = await pb
              .collection('agentes')
              .getFirstListItem(`user_id="${record.id}"`, {
                fields: 'id,collectionId,collectionName,foto_url',
              })
            if (agenteRecord?.foto_url) {
              finalAvatarUrl = pb.files.getUrl(agenteRecord, agenteRecord.foto_url, {
                token: pb.authStore.token,
              })
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
          if (e.record.foto_url) {
            newAvatarUrl = pb.files.getUrl(e.record, e.record.foto_url, {
              token: pb.authStore.token,
            })
          } else {
            newAvatarUrl = undefined
          }
          return { ...prev, ...e.record, computedAvatarUrl: newAvatarUrl }
        })
      }
    },
    !!authUser,
  )

  let avatarUrl = user?.computedAvatarUrl
  if (!avatarUrl && user) {
    if (user.foto_url) {
      avatarUrl = pb.files.getUrl(user, user.foto_url, { token: pb.authStore.token })
    }
  }

  return { user, avatarUrl, loading, error }
}
