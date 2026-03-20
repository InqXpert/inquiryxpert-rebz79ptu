import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export function AuthGuard() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f8fa]">
        <div className="w-12 h-12 rounded-full border-[4px] border-[#00A8B5] border-t-transparent animate-spin mb-4" />
        <span className="text-[#2A3B4C] font-medium tracking-wide">Validando sessão...</span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
