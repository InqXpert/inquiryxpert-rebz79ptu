import { Loader2, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import type { PlateValidationResult, InsuredValidationResult, ProcessoSummary } from '@/types/placa'

interface CardProps {
  item: ProcessoSummary
  highlight: 'cia' | 'placa'
}

const SuggestionCard = ({ item, highlight }: CardProps) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-md border border-brand-teal/20 bg-brand-light/30 dark:bg-black/10 mt-2">
    <div className="space-y-1">
      <p className="text-sm font-medium text-brand-navy dark:text-white">
        Processo: {item.numero_controle || item.id}
      </p>
      <p className="text-xs text-muted-foreground">
        {highlight === 'cia' ? `Seguradora: ${item.cia}` : `Placa: ${item.placas_veiculos}`} • Data:{' '}
        {item.data_entrada || '-'} • Status: {(item.status || '').replace(/_/g, ' ')}
      </p>
    </div>
    <Button
      variant="outline"
      size="sm"
      asChild
      className="mt-2 sm:mt-0 border-brand-teal text-brand-navy dark:text-white"
    >
      <Link to={`/processos/${item.id}`} target="_blank" rel="noopener noreferrer">
        Ver Processo
      </Link>
    </Button>
  </div>
)

export const PlateValidationUI = ({ validation }: { validation: PlateValidationResult }) => {
  if (validation.state === 'IDLE' || validation.state === 'TYPING') return null

  return (
    <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="flex items-center gap-2 text-sm font-medium">
        {validation.state === 'VALIDATING' && (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            <span className="text-muted-foreground">Validando placa...</span>
          </>
        )}
        {validation.state === 'VALID' && (
          <>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-green-600 dark:text-green-400">{validation.message}</span>
          </>
        )}
        {validation.state === 'INVALID' && (
          <>
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-600 dark:text-red-400">{validation.message}</span>
          </>
        )}
        {validation.state === 'WARNING' && (
          <>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-orange-600 dark:text-orange-400">{validation.message}</span>
          </>
        )}
      </div>
      {validation.duplicates.length > 0 && (
        <div className="mt-2 space-y-2">
          {validation.duplicates.map((d) => (
            <SuggestionCard key={d.id} item={d} highlight="cia" />
          ))}
        </div>
      )}
    </div>
  )
}

export const InsuredValidationUI = ({ validation }: { validation: InsuredValidationResult }) => {
  if (
    validation.state === 'IDLE' ||
    validation.state === 'TYPING' ||
    validation.state === 'VALID'
  ) {
    return null
  }

  return (
    <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="flex items-center gap-2 text-sm font-medium">
        {validation.state === 'VALIDATING' && (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            <span className="text-muted-foreground">Buscando histórico...</span>
          </>
        )}
        {validation.state === 'WARNING' && (
          <>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-orange-600 dark:text-orange-400">{validation.message}</span>
          </>
        )}
      </div>
      {validation.related.length > 0 && (
        <div className="mt-2 space-y-2">
          <p className="text-xs font-semibold text-brand-gray dark:text-brand-light uppercase tracking-wider mb-1">
            Processos do mesmo segurado
          </p>
          {validation.related.map((r) => (
            <SuggestionCard key={r.id} item={r} highlight="placa" />
          ))}
        </div>
      )}
    </div>
  )
}
