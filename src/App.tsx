import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/hooks/use-auth'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Processos = lazy(() => import('./pages/Processos'))
const PrestadoresList = lazy(() => import('./pages/prestadores/List'))
const NovoPrestador = lazy(() => import('./pages/prestadores/Novo'))
const ProfilePrestador = lazy(() => import('./pages/prestadores/Profile'))
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
                <Route path="/prestadores" element={<PrestadoresList />} />
                <Route path="/prestadores/novo" element={<NovoPrestador />} />
                <Route path="/prestadores/:id" element={<ProfilePrestador />} />
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
