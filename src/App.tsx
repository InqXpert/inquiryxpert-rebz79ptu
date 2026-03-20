import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/hooks/use-auth'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Processos = lazy(() => import('./pages/Processos'))
const AgentesList = lazy(() => import('./pages/agentes/List'))
const NovoAgente = lazy(() => import('./pages/agentes/Novo'))
const ProfileAgente = lazy(() => import('./pages/agentes/Profile'))
const EditarAgente = lazy(() => import('./pages/agentes/Editar'))
const Configuracoes = lazy(() => import('./pages/Configuracoes'))
const Ajuda = lazy(() => import('./pages/Ajuda'))

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <AuthProvider>
          <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/processos" element={<Processos />} />
                <Route path="/agentes" element={<AgentesList />} />
                <Route path="/agentes/novo" element={<NovoAgente />} />
                <Route path="/agentes/:id" element={<ProfileAgente />} />
                <Route path="/agentes/:id/editar" element={<EditarAgente />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/ajuda" element={<Ajuda />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
