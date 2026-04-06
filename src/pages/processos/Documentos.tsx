import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  ArrowLeft,
  FileText,
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  User,
  FileCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FileUploadZone } from './components/FileUploadZone'
import { DocumentList } from './components/DocumentList'
import { ProcessStatus } from './components/ProcessStatus'
import { BannerAviso } from './components/BannerAviso'

const sidebarLinks = [
  { name: 'Processos', path: '/gestao-agentes/processos', icon: LayoutDashboard },
  { name: 'Relatórios', path: '/gestao-agentes/relatorios', icon: FileText },
  { name: 'Treinamentos', path: '/gestao-agentes/treinamentos', icon: BookOpen },
  { name: 'Mensagens', path: '/gestao-agentes/mensagens', icon: MessageSquare },
  { name: 'Perfil', path: '/gestao-agentes/perfil', icon: User },
  { name: 'Termos', path: '/gestao-agentes/termos', icon: FileCheck },
]

export default function ProcessoDocumentosPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [processoName, setProcessoName] = useState<string>('Carregando...')

  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessoName(`Processo #${id?.substring(0, 6) || '123'}`)
    }, 500)
    return () => clearTimeout(timer)
  }, [id])

  return (
    <div className="flex h-full w-full bg-background relative z-0">
      {/* Sidebar - Matching Agent Portal navigation */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card shrink-0">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-lg text-foreground">Portal do Agente</h2>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              const isActive = link.name === 'Processos'
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header with Breadcrumb and Back Button */}
        <header className="px-6 py-4 border-b border-border bg-card shrink-0 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/processos')}
              className="shrink-0 text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Link to="/processos" className="hover:text-foreground transition-colors">
                  Processos
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="truncate max-w-[120px] sm:max-w-[200px]">{processoName}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">Documentos</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Documentos do Processo</h1>
            </div>
          </div>
        </header>

        {/* Dual-Section Document Management Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <BannerAviso />

          <ProcessStatus />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
            <div className="h-full">
              <FileUploadZone />
            </div>

            <div className="h-full">
              <DocumentList />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
