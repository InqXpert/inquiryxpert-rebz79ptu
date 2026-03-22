import pb from '@/lib/pocketbase/client'

export const getAvatarUrl = (user: any) => {
  if (user?.foto_perfil && user?.collectionId && user?.id) {
    return pb.files.getUrl(user, user.foto_perfil, { thumb: '100x100' })
  }
  return undefined
}
