import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/hooks/use-auth'
import { Toaster } from '@/components/ui/sonner'
import { AuthGuard } from '@/components/AuthGuard'
import { GuestGuard } from '@/components/GuestGuard'
import Login from '@/pages/Login'

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
                <Route element={<Layout />}>
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
