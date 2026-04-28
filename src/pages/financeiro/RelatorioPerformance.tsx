import { useState, useEffect } from 'react'
import { FinanceiroNav } from './components/FinanceiroNav'
import { PerformanceCards } from './components/PerformanceCards'
import { PerformanceCharts } from './components/PerformanceCharts'
import { PerformanceTable } from './components/PerformanceTable'
import {
  MOCK_SUMMARY,
  MOCK_USERS,
  MOCK_FLOW,
  MOCK_CIAS,
  MOCK_INSIGHTS,
} from './data/performance-mock'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Loader2, Lightbulb, AlertTriangle } from 'lucide-react'

export default function RelatorioPerformance() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState(false)

  // RBAC validation
  useEffect(() => {
    if (!user) return
    const allowedRoles = ['c-level', 'admin', 'supervisor']
    if (!allowedRoles.includes(user.role)) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  useEffect(() => {
    handleGenerate()
  }, [])

  const handleGenerate = () => {
    setLoading(true)
    setError(false)

    // Mock network request
    setTimeout(() => {
      try {
        setData({
          summary: MOCK_SUMMARY,
          users: MOCK_USERS,
          flow: MOCK_FLOW,
          cias: MOCK_CIAS,
          insights: MOCK_INSIGHTS,
        })
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }, 800)
  }

  // Prevent render if navigating away
  if (!user || !['c-level', 'admin', 'supervisor'].includes(user.role)) return null

  return (
    <div className="container mx-auto py-6 space-y-6">
      <FinanceiroNav />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatório de Performance</h1>
          <p className="text-muted-foreground">Análise executiva do mês</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select className="flex h-9 w-full md:w-[120px] items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <option>Março</option>
            <option>Fevereiro</option>
            <option>Janeiro</option>
          </select>
          <select className="flex h-9 w-full md:w-[100px] items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <option>2026</option>
            <option>2025</option>
          </select>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            size="sm"
            className="whitespace-nowrap"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Gerar Relatório
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900">
          <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <p className="text-red-600 font-medium">Erro ao gerar relatório. Tente novamente.</p>
            <Button variant="outline" size="sm" onClick={handleGenerate} className="mt-2">
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      )}

      {loading && !data && !error ? (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[380px] bg-muted rounded-xl"></div>
            <div className="h-[380px] bg-muted rounded-xl"></div>
          </div>
        </div>
      ) : data && !error ? (
        <div className="space-y-6 animate-fade-in-up">
          <PerformanceCards data={data.summary} />

          <PerformanceCharts flowData={data.flow} pieData={data.cias} />

          <div className="grid gap-4 md:grid-cols-3 items-start">
            <div className="md:col-span-2">
              <PerformanceTable users={data.users} />
            </div>

            <div className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Insights Inteligentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {data.insights.map((insight: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm p-3 rounded-lg bg-muted/50"
                      >
                        <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-navy" />
                        <span className="text-foreground leading-relaxed">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : null}

      {data && data.users.length === 0 && !loading && !error && (
        <div className="py-12 text-center border rounded-xl bg-card">
          <p className="text-muted-foreground">Nenhum dado disponível para este período</p>
        </div>
      )}
    </div>
  )
}
