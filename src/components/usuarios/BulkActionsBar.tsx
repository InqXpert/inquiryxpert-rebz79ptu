import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle, Ban, Key, Users } from 'lucide-react'
import { useState } from 'react'

export function BulkActionsBar({
  selectedCount,
  totalCount,
  onClear,
  onToggleAll,
  onAction,
}: {
  selectedCount: number
  totalCount: number
  onClear: () => void
  onToggleAll: () => void
  onAction: (action: string, val?: string) => void
}) {
  const [role, setRole] = useState('')

  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-brand-navy border-t border-brand-teal dark:border-brand-cyan/50 p-4 shadow-[0_-10px_30px_rgba(40,44,89,0.1)] animate-in slide-in-from-bottom-full duration-200">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Checkbox
            checked={selectedCount === totalCount && totalCount > 0}
            onCheckedChange={onToggleAll}
          />
          <span className="text-[14px] font-bold text-brand-navy dark:text-white">
            {selectedCount} usuário(s) selecionado(s)
          </span>
          <Button variant="link" size="sm" onClick={onClear} className="text-brand-gray">
            Limpar
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Select onValueChange={setRole} value={role}>
              <SelectTrigger className="w-[140px] bg-white dark:bg-brand-navy/50 h-11">
                <SelectValue placeholder="Novo papel..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="c-level">C-Level</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="analista">Analista</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => onAction('role', role)}
              disabled={!role}
              className="bg-brand-navy text-white hover:bg-brand-navy/90 h-11 min-w-[44px]"
            >
              <Users className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={() => onAction('reset')}
            className="bg-brand-orange text-white hover:bg-brand-orange/90 h-11 px-4"
          >
            <Key className="w-4 h-4 mr-2" /> Reset Senha
          </Button>
          <Button
            onClick={() => onAction('bloquear')}
            className="bg-brand-coral text-white hover:bg-brand-coral/90 h-11 px-4"
          >
            <Ban className="w-4 h-4 mr-2" /> Bloquear
          </Button>
          <Button
            onClick={() => onAction('permitir')}
            className="bg-brand-cyan text-white hover:bg-brand-cyan/90 h-11 px-4"
          >
            <CheckCircle className="w-4 h-4 mr-2" /> Permitir
          </Button>
        </div>
      </div>
    </div>
  )
}
