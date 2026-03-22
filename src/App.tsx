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
import Login from '@/pages/Login'

// Main App Lazy Loads
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Processos = lazy(() => import('./pages/Processos'))
const AgentesList = lazy(() => import('./pages/agentes/List'))
const NovoAgente = lazy(() => import('./pages/agentes/Novo'))
const ProfileAgente = lazy(() => import('./pages/agentes/Profile'))
const SindicanciaAgente = lazy(() => import('./pages/agentes/Sindicancia'))
const Configuracoes = lazy(() => import('./pages/Configuracoes'))
const Ajuda = lazy(() => import('./pages/Ajuda'))
const GestaoUsuarios = lazy(() => import('./pages/GestaoUsuarios'))
const Perfil = lazy(() => import('./pages/Perfil'))
const PerformanceSupervisores = lazy(() => import('./pages/gestao/PerformanceSupervisores'))

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
                      <Layout />
                    </TrackActivity>
                  }
                >
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/processos" element={<Processos />} />
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

                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
