import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface MetasGeraisTabProps {
  canEdit: boolean
}

// Custom progress bar to support color injection easily
function ColoredProgress({ value, colorClass }: { value: number; colorClass: string }) {
  const safeValue = Math.min(Math.max(value, 0), 100)
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={cn('h-full transition-all duration-500 ease-in-out', colorClass)}
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
    </div>
  )
}

export function MetasGeraisTab({ canEdit }: MetasGeraisTabProps) {
  const [loading, setLoading] = useState(true)
  const [mesAno, setMesAno] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })

  const [form, setForm] = useState({
    receita: 50000,
    custo: 15000,
    margem: 70,
    prazo: 5,
  })

  const [actuals] = useState({
    receita: 42000,
    custo: 16000,
    margem: 65,
    prazo: 6,
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    toast.success('Metas salvas com sucesso')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[200px] w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
      </div>
    )
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  // Progress calculations
  const receitaPct = (actuals.receita / form.receita) * 100
  const receitaColor =
    receitaPct >= 80 ? 'bg-green-500' : receitaPct >= 50 ? 'bg-yellow-500' : 'bg-red-500'

  const custoPct = (actuals.custo / form.custo) * 100
  const custoColor =
    custoPct <= 80 ? 'bg-green-500' : custoPct <= 100 ? 'bg-yellow-500' : 'bg-red-500'

  const margemPct = (actuals.margem / form.margem) * 100
  const margemColor =
    margemPct >= 80 ? 'bg-green-500' : margemPct >= 50 ? 'bg-yellow-500' : 'bg-red-500'

  const prazoPct = (actuals.prazo / form.prazo) * 100
  const prazoColor = actuals.prazo <= form.prazo ? 'bg-green-500' : 'bg-red-500'

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuração de Metas Globais</CardTitle>
          <CardDescription>
            Defina os objetivos financeiros da empresa para o período.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 items-end">
            <div className="space-y-2">
              <Label>Mês/Ano</Label>
              <Input
                type="month"
                value={mesAno}
                onChange={(e) => setMesAno(e.target.value)}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Receita (R$)</Label>
              <Input
                type="number"
                value={form.receita}
                onChange={(e) => setForm({ ...form, receita: Number(e.target.value) })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Custo Operacional (R$)</Label>
              <Input
                type="number"
                value={form.custo}
                onChange={(e) => setForm({ ...form, custo: Number(e.target.value) })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Margem Líquida (%)</Label>
              <Input
                type="number"
                value={form.margem}
                onChange={(e) => setForm({ ...form, margem: Number(e.target.value) })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Prazo Médio (dias)</Label>
              <Input
                type="number"
                value={form.prazo}
                onChange={(e) => setForm({ ...form, prazo: Number(e.target.value) })}
                disabled={!canEdit}
              />
            </div>
          </div>
          {canEdit && (
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => toast('Alterações descartadas')}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar Metas</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mt-8 mb-4">Acompanhamento do Período</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(actuals.receita)}</div>
            <p className="text-xs text-muted-foreground mb-3">
              Meta: {formatCurrency(form.receita)}
            </p>
            <ColoredProgress value={receitaPct} colorClass={receitaColor} />
            <p className="text-xs text-right mt-1 text-muted-foreground">
              {receitaPct.toFixed(1)}% atingido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Custo Operacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(actuals.custo)}</div>
            <p className="text-xs text-muted-foreground mb-3">Teto: {formatCurrency(form.custo)}</p>
            <ColoredProgress value={custoPct} colorClass={custoColor} />
            <p className="text-xs text-right mt-1 text-muted-foreground">
              {custoPct.toFixed(1)}% consumido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Margem Líquida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actuals.margem}%</div>
            <p className="text-xs text-muted-foreground mb-3">Meta: {form.margem}%</p>
            <ColoredProgress value={margemPct} colorClass={margemColor} />
            <p className="text-xs text-right mt-1 text-muted-foreground">
              {actuals.margem >= form.margem
                ? 'No alvo'
                : `${(form.margem - actuals.margem).toFixed(1)}% abaixo`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prazo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actuals.prazo} dias</div>
            <p className="text-xs text-muted-foreground mb-3">Teto: {form.prazo} dias</p>
            <ColoredProgress value={prazoPct > 100 ? 100 : prazoPct} colorClass={prazoColor} />
            <p className="text-xs text-right mt-1 text-muted-foreground">
              {actuals.prazo <= form.prazo
                ? 'No prazo'
                : `${actuals.prazo - form.prazo} dias de atraso`}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
