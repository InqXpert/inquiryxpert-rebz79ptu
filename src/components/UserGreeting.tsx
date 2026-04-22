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
      <div className="flex flex-col items-center justify-center gap-3 bg-card rounded-lg p-4 shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-full" />
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

  const fotoPerfilUrl = avatarUrl

  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-card rounded-lg p-4 shadow-sm mb-6 border border-gray-200 dark:border-gray-800">
      <h1 className="font-semibold text-foreground text-center tracking-tight text-lg md:text-xl">
        {saudacao}, <span className="font-bold uppercase">{firstName}</span>
      </h1>

      <Avatar className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary shadow-sm">
        <AvatarImage src={fotoPerfilUrl} className="object-cover" />
        <AvatarFallback className="flex items-center justify-center bg-secondary text-secondary-foreground text-xl md:text-2xl font-bold w-full h-full uppercase">
          {firstName.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <p className="text-muted-foreground text-xs md:text-sm text-center font-medium m-0">
        {formattedDate}
      </p>

      <div className="font-bold text-foreground tracking-tight text-2xl md:text-3xl">
        {hours}:{minutes}
      </div>
    </div>
  )
})
