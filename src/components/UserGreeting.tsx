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
    if (!isUploading) {
      setLocalAvatarUrl(avatarUrl || null)
    }
  }, [avatarUrl, isUploading])

  if (error) {
    throw error
  }

  if (loading) {
    return (
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
        <Skeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full shrink-0" />
        <div className="flex flex-col items-center sm:items-start justify-center gap-3 w-full">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-24 mt-2" />
        </div>
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
  const initials = firstName.substring(0, 2)

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
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
      <div
        className="relative group cursor-pointer rounded-full shrink-0 flex items-center justify-center border-0 ring-0 shadow-none w-24 h-24 md:w-28 md:h-28"
        onClick={handleAvatarClick}
        title="Alterar foto de perfil"
      >
        <Avatar className="w-full h-full border-0 ring-0">
          <AvatarImage
            src={localAvatarUrl || undefined}
            alt={fullName}
            className="object-cover border-0 ring-0"
          />
          <AvatarFallback className="bg-muted text-muted-foreground text-2xl font-bold uppercase border-0 ring-0">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full flex flex-col items-center justify-center transition-opacity duration-200 border-0 ring-0">
          <Camera className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium leading-tight">Alterar</span>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
        />
      </div>

      <div className="flex flex-col items-center sm:items-start justify-center gap-1 mt-2 sm:mt-0 flex-1">
        <h1 className="font-semibold text-foreground text-center sm:text-left tracking-tight text-lg md:text-xl">
          {saudacao}, <span className="font-bold uppercase">{firstName}</span>
        </h1>

        <p className="text-muted-foreground text-xs md:text-sm text-center sm:text-left font-medium m-0">
          {formattedDate}
        </p>

        <div className="font-bold text-foreground tracking-tight text-3xl md:text-4xl mt-2 sm:mt-4">
          {hours}:{minutes}
        </div>
      </div>
    </div>
  )
})
