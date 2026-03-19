import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth } from '@/hooks/use-auth'

import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import Index from './pages/Index'
import Login from './pages/Login'
import PrestadoresList from './pages/prestadores/List'
import NovoPrestador from './pages/prestadores/Novo'
import EditarPrestador from './pages/prestadores/Editar'
import ProfilePrestador from './pages/prestadores/Profile'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Index />} />
            <Route path="/prestadores" element={<PrestadoresList />} />
            <Route path="/prestadores/novo" element={<NovoPrestador />} />
            <Route path="/prestadores/:id/editar" element={<EditarPrestador />} />
            <Route path="/prestadores/:id" element={<ProfilePrestador />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
