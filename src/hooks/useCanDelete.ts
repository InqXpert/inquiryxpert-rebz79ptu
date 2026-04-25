import { useAuth } from '@/hooks/use-auth'

export function useCanDelete() {
  const { user } = useAuth()
  return user?.role === 'c-level'
}
