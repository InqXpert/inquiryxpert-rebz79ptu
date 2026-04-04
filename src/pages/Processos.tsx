import { useNavigate } from 'react-router-dom'
import { Plus, BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useProcessosList } from '@/hooks/useProcessosList'
import { ProcessosListTable } from '@/components/operacional/ProcessosListTable'
import { ProcessosListFilters } from '@/components/operacional/ProcessosListFilters'
import { useAuth } from '@/hooks/use-auth'

export default function Processos() {
  const state = useProcessosList()
  const navigate = useNavigate()
  const { user } = useAuth()

  const canViewAlerts = user?.role && ['c-level', 'admin', 'supervisor'].includes(user.role)

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8 animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-brand-navy dark:text-white mb-1">
            Processos
          </h1>
          <p className="text-[14px] text-brand-gray dark:text-brand-light font-medium">
            Acompanhamento de investigações
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {canViewAlerts && (
            <Button
              onClick={() => navigate('/processos/alertas')}
              variant="outline"
              className="font-bold shadow-sm bg-white dark:bg-transparent"
            >
              <BellRing className="w-4 h-4 mr-2" />
              Central de Alertas
            </Button>
          )}
          <Button
            onClick={() => navigate('/processos/novo