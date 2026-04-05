import { useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useAuth } from '@/hooks/use-auth'
import { useHubData } from '@/hooks/use-hub-data'
import { toast } from 'sonner'
import { HubEstrategico } from '@/components/hub/HubEstrategico'
import { HubTatico } from '@/components/hub/HubTatico'
import { HubOperacional } from '@/components/hub/HubOperacional'
import { HubSkeleton } from '@/components/hub/HubSkeleton'

export default function HubPage() {
  const { user } = useAuth()
  const { data, loading, error } = useHubData()

  useEffect(() => {
    if (error) {
      toast.error('Erro ao carregar dados do Hub.')
    }
  }, [error])

  const roleName =
    user?.role === 'c-level'
      ? 'C-Level'
      : user?.role === 'admin'
        ? 'Administrador'
        : user?.role === 'supervisor'
          ? 'Supervisor'
          : user?.role === 'analista'
            ? 'Analista'
            : 'Agente'

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-6 animate-fade-in">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[28px] font-bold text-[#1e293b] leading-tight">
              Olá, {user?.name || user?.nome || 'Usuário'}
            </h1>
            <span className="bg-secondary text-white text-xs uppercase font-semibold px-2.5 py-0.5 rounded-full">
              {roleName}
            </span>
          </div>
          <p className="text-sm text-muted-foreground capitalize">
            {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>
      </header>

      {loading ? (
        <HubSkeleton />
      ) : (
        <div className="animate-fade-in-up">
          {(user?.role === 'c-level' || user?.role === 'admin') && <HubEstrategico data={data} />}
          {user?.role === 'supervisor' && <HubTatico data={data} />}
          {(user?.role === 'analista' || user?.role === 'agente' || !user?.role) && (
            <HubOperacional data={data} />
          )}
        </div>
      )}
    </div>
  )
}
