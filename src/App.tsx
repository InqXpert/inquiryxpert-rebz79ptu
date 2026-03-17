import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppProvider } from '@/store/AppContext'

import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import Index from './pages/Index'
import PrestadoresList from './pages/prestadores/List'
import NovoPrestador from './pages/prestadores/Novo'
import EditarPrestador from './pages/prestadores/Editar'
import ProfilePrestador from './pages/prestadores/Profile'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/prestadores" element={<PrestadoresList />} />
            <Route path="/prestadores/novo" element={<NovoPrestador />} />
            <Route path="/prestadores/:id/editar" element={<EditarPrestador />} />
            <Route path="/prestadores/:id" element={<ProfilePrestador />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AppProvider>
  </BrowserRouter>
)

export default App
