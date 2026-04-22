import { memo } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useDigitalClock } from '@/hooks/use-digital-clock'
import pb from '@/lib/pocketbase/client'

export const UserGreeting = memo(function UserGreeting() {
  const { user, avatarUrl, loading, error } = useCurrentUser()
  const { hours, minutes, time } = useDigitalClock()

  if (error) {
    throw error
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-24" />
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
  let saudacao = 'BOA NOITE'
  if (currentHour >= 5 && currentHour < 12) {
    saudacao = 'BOM DIA'
  } else if (currentHour >= 12 && currentHour < 18) {
    saudacao = 'BOA TARDE'
  }

  const fullName = user?.name || user?.nome || 'Usuário'
  const firstName = fullName.trim().split(' ')[0].toUpperCase()

  const greetingString = `${saudacao} ${firstName}`

  const fotoPerfilUrl = user?.foto_perfil ? pb.files.getUrl(user, user.foto_perfil) : avatarUrl

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
      <h1 className="font-bold text-foreground text-center uppercase tracking-tight text-[1.24rem]">
        {greetingString}
      </h1>

      <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary shadow-sm">
        <AvatarImage src={fotoPerfilUrl} className="object-cover" />
        <AvatarFallback className="flex items-center justify-center bg-secondary text-secondary-foreground text-3xl md:text-4xl font-bold w-full h-full uppercase">
          {firstName.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <p className="text-muted-foreground text-sm md:text-base text-center font-medium">
        {formattedDate}
      </p>

      <div className="font-bold text-foreground tracking-tighter text-[2.33rem]">
        {hours}:{minutes}
      </div>
    </div>
  )
})
