import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Agente } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { updateAgente } from '@/services/agentes'
import { cn } from '@/lib/utils'

const QUALIDADE_OPTIONS = [
  'NIVEL 1 - Insatisfatorio/Abaixo do Esperado',
  'NIVEL 2 - Basico/Regular',
  'NIVEL 3 - Alto/Esperado',
  'NIVEL 4 - Excede as Expectativas/Excelente',
]

const EXPERIENCIA_OPTIONS = [
  'SENIOR: Atende todos os ramos',
  'PLENO: Atende 1-2 ramos',
  'JUNIOR: Atende 1 ramo com supervisao',
  'EM TREINAMENTO: Executa etapas',
]

const COMPLIANCE_OPTIONS = [
  'COMPLIANCE TOTAL (BAIXO RISCO)',
  'COMPLIANCE PARCIAL (MEDIO RISCO)',
  'COMPLIANCE ZERO (ALTO RISCO)',
]

const getQualityColor = (val?: string) => {
  if (!val) return 'bg-muted/50 text-muted-foreground border-border'
  if (val.includes('NIVEL 1')) return 'bg-red-50 text-red-700 border-red-200'
  if (val.includes('NIVEL 2')) return 'bg-orange-50 text-orange-700 border-orange-200'
  if (val.includes('NIVEL 3')) return 'bg-blue-50 text-blue-700 border-blue-200'
  if (val.includes('NIVEL 4')) return 'bg-green-50 text-green-700 border-green-200'
  return 'bg-muted/50 text-muted-foreground border-border'
}

const getExperienciaColor = (val?: string) => {
  if (!val) return 'bg-muted/50 text-muted-foreground border-border'
  if (val.includes('TREINAMENTO')) return 'bg-red-50 text-red-700 border-red-200'
  if (val.includes('JUNIOR')) return 'bg-orange-50 text-orange-700 border-orange-200'
  if (val.includes('PLENO')) return 'bg-blue-50 text-blue-700 border-blue-200'
  if (val.includes('SENIOR')) return 'bg-green-50 text-green-700 border-green-200'
  return 'bg-muted/50 text-muted-foreground border-border'
}

const getComplianceColor = (val?: string) => {
  if (!val) return 'bg-muted/50 text-muted-foreground border-border'
  if (val.includes('ZERO')) return 'bg-red-50 text-red-700 border-red-200'
  if (val.includes('PARCIAL')) return 'bg-orange-50 text-orange-700 border-orange-200'
  if (val.includes('TOTAL')) return 'bg-green-50 text-green-700 border-green-200'
  return 'bg-muted/50 text-muted-foreground border-border'
}

interface KPICardProps {
  title: string
  value?: string
  options: string[]
  canEdit: boolean
  onUpdate: (val: string) => void
  colorFn: (val?: string) => string
}

function KPICard({ title, value, options, canEdit, onUpdate, colorFn }: KPICardProps) {
  return (
    <Card
      role="region"
      aria-label={title}
      className="border-none shadow-sm rounded-2xl overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col justify-between"
    >
      <CardContent className="p-5 flex flex-col h-full">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
          {title}
        </h4>
        <div className="mt-auto">
          {canEdit ? (
            <Select onValueChange={onUpdate} defaultValue={value || ''}>
              <SelectTrigger
                className={cn(
                  'w-full border-2 h-auto py-2 px-3 text-left font-semibold text-xs transition-colors rounded-xl',
                  colorFn(value),
                )}
              >
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-xs font-medium">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div
              className={cn(
                'w-full border-2 py-2 px-3 text-left font-semibold text-xs rounded-xl',
                colorFn(value),
              )}
            >
              {value || 'Não Avaliado'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function AgentePerformanceKPIs({
  agente,
  onRefresh,
}: {
  agente: Agente
  onRefresh: () => void
}) {
  const { user } = useAuth()
  const { toast } = useToast()

  // Simplified role check for demonstration. Actual implementation uses proper RBAC.
  const canEdit = !user?.email || user.email.includes('admin') || user.email.includes('supervisor')

  const handleUpdate = async (field: keyof Agente, value: string) => {
    try {
      await updateAgente(agente.id, { [field]: value })
      toast({ title: 'KPI Atualizado', description: 'Métrica atualizada com sucesso.' })
      onRefresh()
    } catch (err) {
      toast({
        title: 'Erro ao carregar KPIs.',
        description: 'Falha ao salvar a métrica.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <KPICard
        title="Nível de Qualidade"
        value={agente.qualidade_nivel}
        options={QUALIDADE_OPTIONS}
        canEdit={canEdit}
        colorFn={getQualityColor}
        onUpdate={(v) => handleUpdate('qualidade_nivel', v)}
      />
      <KPICard
        title="Nível de Experiência"
        value={agente.experiencia_nivel}
        options={EXPERIENCIA_OPTIONS}
        canEdit={canEdit}
        colorFn={getExperienciaColor}
        onUpdate={(v) => handleUpdate('experiencia_nivel', v)}
      />
      <KPICard
        title="Nível de Compliance"
        value={agente.compliance_nivel}
        options={COMPLIANCE_OPTIONS}
        canEdit={canEdit}
        colorFn={getComplianceColor}
        onUpdate={(v) => handleUpdate('compliance_nivel', v)}
      />
    </div>
  )
}
