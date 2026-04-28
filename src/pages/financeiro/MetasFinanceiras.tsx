import { useAuth } from '@/hooks/use-auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MetasGeraisTab } from './components/MetasGeraisTab'
import { MetasIndividuaisTab } from './components/MetasIndividuaisTab'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ShieldAlert } from 'lucide-react'
import { FinanceiroNav } from './components/FinanceiroNav'

import { useSearchParams } from 'react-router-dom'

export default function MetasFinanceiras() {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'gerais'

  const handleTabChange = (val: string) => {
    setSearchParams({ tab: val })
  }

  if (user?.role === 'analista' || user?.role === 'agente') {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FinanceiroNav />
        <div className="max-w-4xl mx-auto mt-10">
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Acesso Negado</AlertTitle>
            <AlertDescription>
              Você não tem permissão para acessar as metas financeiras.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const canEdit = user?.role === 'c-level' || user?.role === 'admin'

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <FinanceiroNav />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Metas Financeiras</h2>
          <p className="text-muted-foreground">Configure metas gerais e individuais</p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="gerais">Metas Gerais</TabsTrigger>
          <TabsTrigger value="individuais">Metas Individuais</TabsTrigger>
        </TabsList>

        <TabsContent value="gerais" className="space-y-4">
          <MetasGeraisTab canEdit={canEdit} />
        </TabsContent>

        <TabsContent value="individuais" className="space-y-4">
          <MetasIndividuaisTab canEdit={canEdit} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
