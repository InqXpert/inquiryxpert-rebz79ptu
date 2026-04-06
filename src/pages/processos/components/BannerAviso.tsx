import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function BannerAviso() {
  return (
    <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300">
      <AlertCircle className="h-4 w-4" color="currentColor" />
      <AlertTitle>Atenção</AlertTitle>
      <AlertDescription>
        Certifique-se de que os documentos enviados estão legíveis e em conformidade com as
        diretrizes do processo.
      </AlertDescription>
    </Alert>
  )
}
