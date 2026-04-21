import { memo } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useDigitalClock } from '@/hooks/use-digital-clock'

export const UserGreeting = memo(function UserGreeting() {
  const { user, avatarUrl, loading, error } = useCurrentUser()
  const { hours, minutes, seconds, time } = useDigitalClock()

  if (error) {
    throw error
  }

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 shadow-sm mb-6 border border-border">
        <div className="flex flex-col gap-1 w-full lg:w-auto items-center lg:items-start">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">
          <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full" />
        </div>
      </div>
    )
  }

  const dateStr = format(time, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
  const formattedDate = dateStr
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const currentHour = time.getHours()
  let saudacao = 'Boa noite'
  if (currentHour >= 5 && currentHour < 12) {
    saudacao = 'Bom dia'
  } else if (currentHour >= 12 && currentHour < 18) {
    saudacao = 'Boa tarde'
  }

  const fullName = user?.name || user?.nome || 'Usuário'
  const firstName = fullName.trim().split(' ')[0]

  const greetingString = `${formattedDate} ${hours}:${minutes} ${saudacao} ${firstName}`

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 shadow-sm mb-6 border border-border">
      <div className="flex flex-col gap-1 w-full lg:w-auto items-center lg:items-start text-center lg:text-left">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
          {greetingString}
        </h1>
      </div>

      <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto shrink-0">
        <Avatar className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-primary">
          <AvatarImage src={avatarUrl} className="object-cover" />
          <AvatarFallback className="flex items-center justify-center bg-secondary text-secondary-foreground text-xl font-bold w-full h-full uppercase">
            {firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
})
