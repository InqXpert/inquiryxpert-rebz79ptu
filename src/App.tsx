import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/hooks/use-auth'
import { Toaster } from '@/components/ui/sonner'
import { AuthGuard } from '@/components/AuthGuard'
import { GuestGuard } from '@/components/GuestGuard'
import { TrackActivity } from '@/components/TrackActivity'
import { HubPageProvider } from '@/contexts/hub-page-context'
import Login from '@/pages/Login'

// Main App Lazy Loads
const HubPage = lazy(() => import('./pages/HubPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NovoProcessoPage = lazy(() => import('./pages/processos/NovoProcessoPage'))
const Processos = lazy(() => import('./pages/Processos'))
const ProcessoEdit = lazy(() => import('./pages/processos/Editar'))
const ProcessoDetalhesPage = lazy(() => import('./pages/processos/ProcessoDetalhesPage'))
const Alertas = lazy(() => import('./pages/Alertas'))
const Relatorios = lazy(() => import('./pages/Relatorios'))
const AgentesList = lazy(() => import('./pages/agentes/List'))
const NovoAgente = lazy(() => import('./pages/agentes/Novo'))
const ProfileAgente = lazy(() => import('./pages/agentes/Profile'))
const SindicanciaAgente = lazy(() => import('./pages/agentes/Sindicancia'))
const Configuracoes = lazy(() => import('./pages/Configuracoes'))
const NotificacoesPage = lazy(() => import('./pages/Notificacoes'))
const Ajuda = lazy(() => import('./pages/Ajuda'))
const GestaoUsuarios = lazy(() => import('./pages/GestaoUsuarios'))
const Perfil = lazy(() => import('./pages/Perfil'))
const PerformanceSupervisores = lazy(() => import('./pages/gestao/PerformanceSupervisores'))

// Financeiro Module Lazy Loads
const DashboardFinanceiro = lazy(() => import('./pages/financeiro/DashboardFinanceiro'))
const ClientesList = lazy(() => import('./pages/financeiro/ClientesList'))
const NovoCliente = lazy(() => import('./pages/financeiro/NovoCliente'))
const EditarCliente = lazy(() => import('./pages/financeiro/EditarCliente'))
const PeriodosFaturamento = lazy(() => import('./pages/financeiro/PeriodosFaturamento'))
const NotasFiscais = lazy(() => import('./pages/financeiro/NotasFiscais'))

// Gestão de Agentes Module Lazy Loads
const GestaoAgentesLayout = lazy(() => import('./pages/gestao-agentes/Layout'))
const GestaoAgentesDashboard = lazy(() => import('./pages/gestao-agentes/Dashboard'))
const GestaoAgentesProcessos = lazy(() => import('./pages/gestao-agentes/Processos'))
const GestaoAgentesProcessoDetail = lazy(() => import('./pages/gestao-agentes/ProcessoDetail'))
const GestaoAgentesRelatorios = lazy(() => import('./pages/gestao-agentes/Relatorios'))
const GestaoAgentesTreinamentos = lazy(() => import('./pages/gestao-agentes/Treinamentos'))
const GestaoAgentesMensagens = lazy(() => import('./pages/gestao-agentes/Mensagens'))
const GestaoAgentesPerfil = lazy(() => import('./pages/gestao-agentes/Perfil'))
const GestaoAgentesTermos = lazy(() => import('./pages/gestao-agentes/Termos'))
const GestaoAgentesFaturamento = lazy(() => import('./pages/gestao-agentes/Faturamento'))
const ProcessoDocumentosPage = lazy(() => import('./pages/processos/Documentos'))
const SindicanciaDetail = lazy(() => import('./pages/sindicancia/SindicanciaDetail'))
const EncaminharSindicanciaPage = lazy(
  () => import('./pages/sindicancia/EncaminharSindicanciaPage'),
)

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <AuthProvider>
          <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
            <Routes>
              {/* Unauthenticated / Login Route */}
              <Route element={<GuestGuard />}>
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<AuthGuard />}>
                <Route
                  element={
                    <TrackActivity>
                      <HubPageProvider>
                        <Layout />
                      </HubPageProvider>
                    </TrackActivity>
                  }
                >
                  <Route path="/" element={<HubPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard-executivo" element={<Dashboard />} />
                  <Route path="/processos" element={<Processos />} />
                  <Route path="/processos/novo" element={<NovoProcessoPage />} />
                  <Route path="/processos/:id" element={<ProcessoDetalhesPage />} />
                  <Route path="/processos/:id/editar" element={<ProcessoEdit />} />
                  <Route path="/processos/:id/documentos" element={<ProcessoDocumentosPage />} />
                  <Route path="/processos/alertas" element={<Alertas />} />
                  <Route path="/sindicancia/encaminhar" element={<EncaminharSindicanciaPage />} />
                  <Route path="/sindicancia/:id" element={<SindicanciaDetail />} />
                  <Route path="/notificacoes" element={<NotificacoesPage />} />
                  <Route path="/relatorios" element={<Relatorios />} />
                  <Route path="/agentes" element={<AgentesList />} />
                  <Route path="/agentes/novo" element={<NovoAgente />} />
                  <Route path="/agentes/:id" element={<ProfileAgente />} />
                  <Route path="/agentes/:id/sindicancia" element={<SindicanciaAgente />} />
                  <Route path="/gestao-usuarios" element={<GestaoUsuarios />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                  <Route path="/ajuda" element={<Ajuda />} />
                  <Route
                    path="/gestao/performance-supervisores"
                    element={<PerformanceSupervisores />}
                  />

                  {/* Financeiro Module */}
                  <Route path="/financeiro" element={<DashboardFinanceiro />} />
                  <Route path="/financeiro/clientes" element={<ClientesList />} />
                  <Route path="/financeiro/clientes/novo" element={<NovoCliente />} />
                  <Route path="/financeiro/clientes/:id" element={<EditarCliente />} />
                  <Route path="/financeiro/periodos" element={<PeriodosFaturamento />} />
                  <Route path="/financeiro/notas-fiscais" element={<NotasFiscais />} />

                  {/* Gestão de Agentes Module */}
                  <Route path="/gestao-agentes" element={<GestaoAgentesLayout />}>
                    <Route index element={<GestaoAgentesDashboard />} />
                    <Route path="processos" element={<GestaoAgentesProcessos />} />
                    <Route path="processos/:id" element={<GestaoAgentesProcessoDetail />} />
                    <Route path="relatorios" element={<GestaoAgentesRelatorios />} />
                    <Route path="treinamentos" element={<GestaoAgentesTreinamentos />} />
                    <Route path="mensagens" element={<GestaoAgentesMensagens />} />
                    <Route path="perfil" element={<GestaoAgentesPerfil />} />
                    <Route path="termos" element={<GestaoAgentesTermos />} />
                    <Route path="faturamento" element={<GestaoAgentesFaturamento />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
