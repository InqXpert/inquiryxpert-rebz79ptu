import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'

export function useCurrentUser() {
  const { user } = useAuth()

  const avatarUrl =
    user && user.foto_perfil ? pb.files.getUrl(user as any, user.foto_perfil) : undefined

  return { user, avatarUrl }
}
