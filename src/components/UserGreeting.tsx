import { memo, useRef, useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Camera } from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useDigitalClock } from '@/hooks/use-digital-clock'
import { usuariosService } from '@/services/usuariosService'

export const UserGreeting = memo(function UserGreeting() {
  const { user, avatarUrl, loading, error } = useCurrentUser()
  const { hours, minutes, time } = useDigitalClock()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [localAvatarUrl, setLocalAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    setLocalAvatarUrl(avatarUrl || null)
  }, [avatarUrl])

  if (error) {
    throw error
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-20" />
      </div>
    )
  }

  const dateStr = format(time, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
  const formattedDate = dateStr
    .split(' ')
    .map((word) => {
      if (word.toLowerCase() === 'de') return word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')

  const currentHour = time.getHours()
  let saudacao = 'Boa Noite'
  if (currentHour >= 5 && currentHour < 12) {
    saudacao = 'Bom Dia'
  } else if (currentHour >= 12 && currentHour < 18) {
    saudacao = 'Boa Tarde'
  }

  const fullName = user?.name || user?.nome || 'Usuário'
  const firstName = fullName.trim().split(' ')[0].toUpperCase()

  const handleAvatarClick = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida (jpg, png, webp).')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB.')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    const previousAvatarUrl = localAvatarUrl

    // Optimistic UI update
    setLocalAvatarUrl(objectUrl)

    try {
      setIsUploading(true)
      if (user?.id) {
        await usuariosService.updateFotoPerfil(user.id, file)
        toast.success('Foto de perfil atualizada com sucesso!')
      }
    } catch (err: any) {
      toast.error('Erro ao atualizar foto de perfil. Tente novamente.')
      console.error(err)
      // Revert optimistic update
      setLocalAvatarUrl(previousAvatarUrl)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
      <h1 className="font-semibold text-foreground text-center tracking-tight text-lg md:text-xl">
        {saudacao}, <span className="font-bold uppercase">{firstName}</span>
      </h1>

      <div
        className="relative group cursor-pointer rounded-full overflow-hidden"
        onClick={handleAvatarClick}
        title="Alterar foto de perfil"
      >
        <Avatar
          className={`w-24 h-24 md:w-32 md:h-32 shadow-sm transition-opacity duration-200 ${isUploading ? 'opacity-50' : 'group-hover:opacity-90'}`}
        >
          <AvatarImage src={localAvatarUrl || ''} className="object-cover" />
          <AvatarFallback className="flex items-center justify-center bg-secondary text-secondary-foreground text-3xl md:text-4xl font-bold w-full h-full uppercase">
            {firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Camera className="w-8 h-8 text-white" />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
        />
      </div>

      <p className="text-muted-foreground text-xs md:text-sm text-center font-medium m-0 mt-1">
        {formattedDate}
      </p>

      <div className="font-bold text-foreground tracking-tight text-3xl md:text-4xl">
        {hours}:{minutes}
      </div>
    </div>
  )
})
