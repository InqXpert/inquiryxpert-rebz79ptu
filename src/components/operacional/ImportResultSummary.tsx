import { CheckCircle, AlertTriangle } from 'lucide-react'
import { ParsedData } from '@/hooks/useImportOperacionalData'

interface Props {
  data: ParsedData
}

export function ImportResultSummary({ data }: Props) {
  return (
    <div className="space-y-[16px] mt-[16px] max-h-[300px] overflow-y-auto pr-2 pb-2">
      <div>
        <h4 className="text-[13px] font-semibold text-foreground flex items-center gap-2 mb-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          Campos reconhecidos ({data.matchedFields.length})
        </h4>
        <ul className="grid grid-cols-2 gap-1" role="list" aria-label="Campos reconhecidos">
          {data.matchedFields.map((f) => (
            <li
              key={f}
              className="text-[12px] text-muted-foreground bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      {data.unmatchedFields.length > 0 && (
        <div>
          <h4 className="text-[13px] font-semibold text-foreground flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            Campos não reconhecidos ({data.unmatchedFields.length})
          </h4>
          <ul className="flex flex-wrap gap-1" role="list" aria-label="Campos nao reconhecidos">
            {data.unmatchedFields.map((f) => (
              <li
                key={f}
                className="text-[12px] text-muted-foreground bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-200"
              >
                {f}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-muted-foreground mt-2 italic">
            Os campos não reconhecidos serão ignorados na importação.
          </p>
        </div>
      )}

      <div className="bg-muted p-3 rounded-[6px] border border-border mt-4">
        <p className="text-[13px] font-medium text-foreground">
          Registros a importar: <span className="font-bold">{data.rowsToImport.length}</span>
        </p>
      </div>
    </div>
  )
}
