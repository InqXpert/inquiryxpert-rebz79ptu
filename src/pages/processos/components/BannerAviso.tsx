import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function BannerAviso() {
  return (
    <Alert className="bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300">
      <AlertTriangle className="h-5 w-5" color="currentColor" />
      <AlertTitle className="font-bold">ATENÇÃO</AlertTitle>
      <AlertDescription className="mt-1">
        Despesas lançadas na planilha sem apresentação dos respectivos comprovantes serão excluídas
        automaticamente pelo sistema.
      </AlertDescription>
    </Alert>
  )
}
