import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { getMetasGerais, saveMetasGerais, getActualsGerais } from '@/services/metasFinanceiras'
import { useAuth } from '@/hooks/use-auth'
import { getErrorMessage } from '@/lib/pocketbase/errors'

interface MetasGeraisTabProps {
  canEdit: boolean
}

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
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [mesAno, setMesAno] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  })

  const [metaId, setMetaId] = useState<string | undefined>()
  const [form, setForm] = useState({
    receita: 0,
    custo: 0,
    margem: 0,
    prazo: 0,
  })

  const [actuals, setActuals] = useState({
    receita: 0,
    custo: 0,
    margem: 0,
    prazo: 0,
  })

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const [year, month] = mesAno.split('-').map(Number)
      try {
        const [metaData, actualData] = await Promise.all([
          getMetasGerais(month, year),
          getActualsGerais(month, year),
        ])

        if (metaData) {
          setMetaId(metaData.id)
          setForm({
            receita: metaData.meta_receita,
            custo: metaData.meta_custo_operacional,
            margem: metaData.meta_margem_liquida,
            prazo: metaData.meta_prazo_medio,
          })
        } else {
          setMetaId(undefined)
          setForm({ receita: 0, custo: 0, margem: 0, prazo: 0 })
        }
        setActuals(actualData)
      } catch (err) {
        toast.error('Erro ao carregar dados das metas gerais')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [mesAno])

  const handleSave = async () => {
    if (form.receita <= 0 || form.custo <= 0 || form.prazo <= 0) {
      toast.error('Os valores devem ser maiores que zero.')
      return
    }
    if (form.margem < 0 || form.margem > 100) {
      toast.error('A margem deve estar entre 0 e 100.')
      return
    }

    try {
      const [year, month] = mesAno.split('-').map(Number)
      const data = {
        mes: month,
        ano: year,
        meta_receita: form.receita,
        meta_custo_operacional: form.custo,
        meta_margem_liquida: form.margem,
        meta_prazo_medio: form.prazo,
        user_id: user?.id,
      }
      const saved = await saveMetasGerais(data, metaId)
      setMetaId(saved.id)
      toast.success('Metas salvas com sucesso')
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
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

  const hasGoal = form.receita > 0 || form.custo > 0

  const receitaPct = form.receita > 0 ? (actuals.receita / form.receita) * 100 : 0
  const receitaColor =
    receitaPct >= 80 ? 'bg-green-500' : receitaPct >= 50 ? 'bg-yellow-500' : 'bg-red-500'

  const custoPct = form.custo > 0 ? (actuals.custo / form.custo) * 100 : 0
  const custoColor =
    custoPct <= 80 ? 'bg-green-500' : custoPct <= 100 ? 'bg-yellow-500' : 'bg-red-500'

  const margemPct = form.margem > 0 ? (actuals.margem / form.margem) * 100 : 0
  const margemColor =
    margemPct >= 80 ? 'bg-green-500' : margemPct >= 50 ? 'bg-yellow-500' : 'bg-red-500'

  const prazoPct = form.prazo > 0 ? (actuals.prazo / form.prazo) * 100 : 0
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
                value={form.receita || ''}
                onChange={(e) => setForm({ ...form, receita: Number(e.target.value) })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Custo Operacional (R$)</Label>
              <Input
                type="number"
                value={form.custo || ''}
                onChange={(e) => setForm({ ...form, custo: Number(e.target.value) })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Margem Líquida (%)</Label>
              <Input
                type="number"
                value={form.margem || ''}
                onChange={(e) => setForm({ ...form, margem: Number(e.target.value) })}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label>Prazo Médio (dias)</Label>
              <Input
                type="number"
                value={form.prazo || ''}
                onChange={(e) => setForm({ ...form, prazo: Number(e.target.value) })}
                disabled={!canEdit}
              />
            </div>
          </div>
          {canEdit && (
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={handleSave}>Salvar Metas</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mt-8 mb-4">Acompanhamento do Período</h3>
      {!hasGoal && !loading ? (
        <div className="text-center p-12 text-muted-foreground border rounded-lg bg-card/50">
          Nenhuma meta configurada para este período
        </div>
      ) : (
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
              <p className="text-xs text-muted-foreground mb-3">
                Teto: {formatCurrency(form.custo)}
              </p>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Prazo Médio
              </CardTitle>
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
      )}
    </div>
  )
}
