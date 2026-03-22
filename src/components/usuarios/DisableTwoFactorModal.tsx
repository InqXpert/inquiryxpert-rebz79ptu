import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ShieldAlert, AlertTriangle } from 'lucide-react'

export function DisableTwoFactorModal({
  open,
  onClose,
  onConfirm,
  hasActiveSessions,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  hasActiveSessions: boolean
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] text-center border-brand-coral/50">
        <DialogHeader className="flex flex-col items-center">
          <div className="w-12 h-12 bg-brand-coral/20 rounded-full flex items-center justify-center mb-2">
            <ShieldAlert className="w-6 h-6 text-brand-coral" />
          </div>
          <DialogTitle className="text-xl font-bold text-brand-navy dark:text-white">
            Desabilitar 2FA?
          </DialogTitle>
          <DialogDescription className="text-brand-gray dark:text-brand-light">
            A autenticação de dois fatores adiciona uma camada extra de segurança. Remover esta
            proteção deixará a conta mais vulnerável.
          </DialogDescription>
        </DialogHeader>

        {hasActiveSessions && (
          <div className="bg-brand-orange/10 border border-brand-orange/30 p-3 rounded-lg flex items-start gap-3 mt-2 text-left">
            <AlertTriangle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <p className="text-sm text-brand-orange font-medium">
              Este usuário possui sessões ativas no momento. É recomendado forçar o logout após
              desabilitar o 2FA.
            </p>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-brand-teal text-brand-navy"
          >
            Manter 2FA
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="w-full bg-brand-coral hover:bg-brand-coral/90 font-bold"
          >
            Desabilitar Proteção
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
