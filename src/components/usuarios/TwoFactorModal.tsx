import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function TwoFactorModal({
  open,
  onClose,
  onConfirm,
  secret,
  qrUrl,
  email,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  secret: string
  qrUrl: string
  email: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(secret)
    setCopied(true)
    toast.success('Código copiado para a área de transferência')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] text-center border-brand-teal dark:border-brand-cyan/50">
        <DialogHeader className="flex flex-col items-center">
          <div className="w-12 h-12 bg-brand-cyan/20 rounded-full flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6 text-brand-cyan" />
          </div>
          <DialogTitle className="text-xl font-bold text-brand-navy dark:text-white">
            Configurar 2FA
          </DialogTitle>
          <DialogDescription className="text-brand-gray dark:text-brand-light">
            Escaneie o QR Code abaixo usando seu aplicativo autenticador (Google Authenticator,
            Authy, etc) para a conta <b>{email}</b>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center py-4">
          <div className="p-2 bg-white rounded-xl border-2 border-brand-light shadow-sm">
            <img src={qrUrl} alt="QR Code 2FA" className="w-[200px] h-[200px]" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-brand-gray dark:text-brand-light font-medium">
            Ou insira o código manualmente:
          </p>
          <div className="flex items-center justify-center gap-2 bg-brand-light/50 dark:bg-black/20 p-2 rounded-md border border-brand-teal/30">
            <code className="text-lg tracking-widest font-bold text-brand-navy dark:text-brand-cyan">
              {secret}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8 hover:bg-brand-teal/20"
            >
              {copied ? (
                <Check className="w-4 h-4 text-brand-cyan" />
              ) : (
                <Copy className="w-4 h-4 text-brand-gray dark:text-brand-light" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-brand-teal text-brand-navy"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full bg-brand-cyan text-white hover:bg-brand-cyan/90 font-bold"
          >
            Confirmei a configuração
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
