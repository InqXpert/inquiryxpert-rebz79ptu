import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Key, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

export function TempPasswordsDialog({
  data,
  onClose,
}: {
  data: { email: string; pwd: string }[] | null
  onClose: () => void
}) {
  if (!data || data.length === 0) return null

  const copyAll = () => {
    const text = data.map((d) => `${d.email}: ${d.pwd}`).join('\n')
    navigator.clipboard.writeText(text)
    toast.success('Senhas copiadas para a área de transferência')
  }

  return (
    <Dialog open={!!data} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[460px] rounded-xl p-6 border-brand-teal dark:border-brand-cyan/50 dark:bg-brand-navy">
        <DialogHeader className="text-center mb-2">
          <div className="mx-auto w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center mb-4">
            <Key className="w-6 h-6 text-brand-orange" />
          </div>
          <DialogTitle className="text-[20px] font-bold text-brand-navy dark:text-white">
            Senhas Redefinidas
          </DialogTitle>
          <p className="text-[14px] text-brand-gray dark:text-brand-light/80 mt-2">
            Copie as senhas temporárias abaixo e envie aos usuários com segurança. Elas não serão
            mostradas novamente.
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[250px] border border-brand-teal/50 rounded-lg p-2 my-4">
          <div className="space-y-2">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-brand-light dark:bg-brand-navy/50 p-3 rounded-md"
              >
                <span
                  className="text-[13px] font-medium text-brand-gray dark:text-brand-light truncate w-[180px]"
                  title={item.email}
                >
                  {item.email}
                </span>
                <code className="text-[15px] font-bold tracking-wider text-brand-navy dark:text-brand-cyan">
                  {item.pwd}
                </code>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-3">
          <Button variant="outline" className="w-full h-11 border-brand-teal" onClick={copyAll}>
            <Copy className="w-4 h-4 mr-2" /> Copiar Todas
          </Button>
          <Button
            className="w-full h-11 bg-brand-cyan text-white hover:bg-brand-cyan/90 font-bold"
            onClick={onClose}
          >
            Entendi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
