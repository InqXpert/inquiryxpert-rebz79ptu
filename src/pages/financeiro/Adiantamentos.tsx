import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { FinanceiroNav } from './components/FinanceiroNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdiantamentosTable } from './components/AdiantamentosTable'

export default function Adiantamentos() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('pendente')

  if (user?.role === 'analista' || user?.role === 'agente') {
    return <Navigate to="/financeiro" replace />
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-navy dark:text-brand-light">
          Adiantamentos
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as solicitações de adiantamento dos agentes e acompanhe o histórico.
        </p>
      </div>

      <FinanceiroNav />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pendente">Pendentes</TabsTrigger>
          <TabsTrigger value="autorizado">Autorizados</TabsTrigger>
          <TabsTrigger value="negado">Negados</TabsTrigger>
        </TabsList>

        <TabsContent value="pendente">
          <AdiantamentosTable status="pendente" />
        </TabsContent>
        <TabsContent value="autorizado">
          <AdiantamentosTable status="autorizado" />
        </TabsContent>
        <TabsContent value="negado">
          <AdiantamentosTable status="negado" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
